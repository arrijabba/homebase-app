import { MetadataCarrierDeploymentData } from "../metadataCarrier/types";
import { TokenHolder } from "../types";

export interface MemberTokenAllocation {
  address: string;
  tokenId: string;
  amount: string;
}

export interface TreasuryParams {
  storage: {
    membersTokenAllocation: MemberTokenAllocation[];
    adminAddress: string;
    frozenScaleValue: number;
    frozenExtraValue: number;
    slashScaleValue: number;
    slashDivisionValue: number;
    minXtzAmount: number;
    maxXtzAmount: number;
    maxProposalSize: number;
    quorumTreshold: number;
    votingPeriod: number;
  };
  metadataCarrierDeploymentData: MetadataCarrierDeploymentData;
}

type ExtraState = {
  extra: {
    frozenScaleValue: number;
    frozenExtraValue: number;
    slashScaleValue: number;
    slashDivisionValue: number;
    maxXtzAmount: number;
    minXtzAmount: number;
    maxProposalSize: number;
  };
};

type MigrationStatus = {
  notInMigration?: string;
  migratingTo?: string;
  migratedTo?: string;
};

export interface TreasuryDAOState {
  ledger: TokenHolder[];
  operators: any;
  tokenAddress: string;
  adminAddress: string;
  pendingOwner: string;
  migrationStatus: MigrationStatus;
  quorumThreshold: number;
  extra: ExtraState;
  proposals: any;
  proposalKeyListSortByDate: any;
  permitsCounter: number;
  metadata: any;
}