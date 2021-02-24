import { DAOTemplate } from "./../../../modules/creator/state/types";
import {
  BigMapAbstraction,
  ContractAbstraction,
  TezosToolkit,
  Wallet,
} from "@taquito/taquito";

import { Ledger } from "services/bakingBad/ledger/types";
import { Storage } from "services/bakingBad/storage/types";
import {
  DAOListMetadata,
  MetadataCarrierParameters,
} from "services/contracts/baseDAO/metadataCarrier/types";

export type Contract = ContractAbstraction<Wallet> | undefined;

export interface MigrationParams {
  template: DAOTemplate;
  orgSettings: OrgSettings;
  votingSettings: VotingSettings;
  memberSettings: MemberSettings;
}

export interface TokenHolder {
  address: string;
  balance: number;
}

export type OrgSettings = {
  name: string;
  symbol: string;
  description: string;
};

export type VotingSettings = {
  votingDays: number;
  votingHours: number;
  votingMinutes: number;
  proposeStakeRequired: number;
  proposeStakePercentage: number;
  frozenScaleValue: number;
  frozenDivisionValue: number;
  minXtzAmount: number;
  maxXtzAmount: number;
  maxProposalSize: number;
  quorumTreshold: number;
};

export type MemberSettings = {
  tokenHolders: TokenHolder[];
  administrator: string;
};

export type Settings = OrgSettings | VotingSettings | MemberSettings;

export type ErrorValues<T> = Partial<Record<keyof T, string>>;

export type DAOItem = {
  address: string;
  ledger: Ledger;
  cycle: number;
  originationTime: string;
} & DAOListMetadata &
  Storage;

export interface DAOStorageDTO {
  //TODO

  ledger: BigMapAbstraction;
}

export interface Transfer {
  amount: number;
  recipient: string;
}

export interface ProposeParams {
  contractAddress: string;
  tezos: TezosToolkit;
  contractParams: {
    tokensToFreeze: number;
    agoraPostId: number;
    transfers: Transfer[];
  };
}

export interface OriginateParams {
  metadataParams: MetadataCarrierParameters;
  params: MigrationParams;
}

export interface VoteParams {
  proposalKey: string;
  amount: number;
  tezos: TezosToolkit;
  contractAddress: string;
  support: boolean;
}

export interface FlushParams {
  tezos: TezosToolkit;
  contractAddress: string;
  numerOfProposalsToFlush: number;
}

export interface MemberTokenAllocation {
  address: string;
  tokenId: string;
  amount: string;
}

export interface BaseExtraState {
  frozenScaleValue: number;
  frozenExtraValue: number;
  slashScaleValue: number;
  slashDivisionValue: number;
  maxXtzAmount: number;
  minXtzAmount: number;
  maxProposalSize: number;
}

export interface BaseStorageParams {
  membersTokenAllocation: MemberTokenAllocation[];
  adminAddress: string;
  quorumTreshold: number;
  votingPeriod: number;
  extra: BaseExtraState;
}

export type Token = {
  name: string;
  symbol: string;
  decimals: number;
};

export interface MetadataStorageState {
  keyName: string;
  metadata: {
    frozenToken: Token;
    unfrozenToken: Token;
  };
}
