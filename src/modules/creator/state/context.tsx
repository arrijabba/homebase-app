import React, { createContext, useReducer, Dispatch, useMemo } from "react";

import { MigrationParams } from "services/contracts/baseDAO/types";
import useLocalStorage from "modules/common/hooks/useLocalStorage";
import {
  CreatorAction,
  CreatorState,
  StepperIndex,
  ActionTypes,
} from "modules/creator/state/types";

const deploymentStatus = {
  deploying: false,
  successful: false,
};

const LOCAL_STORAGE_KEY = "creatorParams";

export const INITIAL_MIGRATION_STATE: MigrationParams = {
  orgSettings: {
    name: "",
    symbol: "",
    description: "",
  },
  votingSettings: {
    votingDays: 0,
    votingHours: 0,
    votingMinutes: 0,
    proposeStakeRequired: 0,
    proposeStakePercentage: 0,
    frozenScaleValue: 0,
    frozenDivisionValue: 1,
    minXtzAmount: 0,
    maxXtzAmount: 0,
    maxProposalSize: 0,
    quorumTreshold: 0,
  },
  memberSettings: {
    tokenHolders: [],
    administrator: "",
  },
};

export const INITIAL_STATE: CreatorState = {
  activeStep: StepperIndex.SELECT_TEMPLATE,
  governanceStep: StepperIndex.SELECT_TEMPLATE,
  data: INITIAL_MIGRATION_STATE,
  deploymentStatus,
};

const CreatorContext = createContext<{
  state: CreatorState;
  dispatch: Dispatch<CreatorAction>;
  updateCache: (value: MigrationParams) => void;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
  updateCache: () => null,
});

export const reducer = (
  state: CreatorState,
  action: CreatorAction
): CreatorState => {
  switch (action.type) {
    case ActionTypes.UPDATE_DEPLOYMENT_STATUS:
      const { contract, deploying } = action.status;
      state = {
        ...state,
        deploymentStatus: {
          contract,
          deploying,
          successful: false,
        },
      };
      return state;
    case ActionTypes.UPDATE_NAVIGATION_BAR:
      state = {
        ...state,
        next: action.next,
        back: action.back,
      };
      return state;
    case ActionTypes.UPDATE_ORGANIZATION_SETTINGS:
      state = {
        ...state,
        data: {
          ...state.data,
          orgSettings: action.org,
        },
      };
      return state;
    case ActionTypes.UPDATE_VOTING_SETTINGS:
      state = {
        ...state,
        data: {
          ...state.data,
          votingSettings: action.voting,
        },
      };
      return state;
    case ActionTypes.UPDATE_MEMBERS_SETTINGS:
      state = {
        ...state,
        data: {
          ...state.data,
          memberSettings: action.members,
        },
      };
      return state;
    case ActionTypes.CLEAR_CACHE:
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      state = {
        ...INITIAL_STATE,
        deploymentStatus: {
          ...INITIAL_STATE.deploymentStatus,
          successful: true,
        },
      };
      return state;
    default:
      return state;
  }
};

const CreatorProvider: React.FC = ({ children }) => {
  const [data, updateCache] = useLocalStorage<MigrationParams>(
    LOCAL_STORAGE_KEY,
    INITIAL_STATE.data
  );

  const stateWithCache = {
    ...INITIAL_STATE,
    data,
  };

  const [state, dispatch] = useReducer(reducer, stateWithCache);
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <CreatorContext.Provider value={{ ...contextValue, updateCache }}>
      {children}
    </CreatorContext.Provider>
  );
};

export { CreatorProvider, CreatorContext };
