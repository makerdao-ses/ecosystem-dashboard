import type { UserDTO } from './authDTO';
import type { CuJobEnum } from '../../enums/cuJobEnum';
import type { CuStatusEnum } from '../../enums/cuStatusEnum';
import type { Mip40BudgetPeriod, Mip40Wallet } from '../interfaces/cuMip';

export interface Mip40BudgetPeriodDto {
  budgetPeriodStart: string;
  budgetPeriodEnd: string;
}

export interface Mip40BudgetLineItemDto {
  budgetCap: number;
}

export interface Mip40WalletDto {
  mip40BudgetLineItem: Mip40BudgetLineItemDto[];
}

export interface Mip40Dto {
  mkrOnly: boolean;
  mip40BudgetPeriod: Mip40BudgetPeriod[];
  mip40Wallet: Mip40Wallet[];
  id: string;
  cuMipId: string;
  mip40Spn: number;
  mkrProgramLength: string;
}

export interface ContributorDto {
  id: string;
  name: string;
  forumHandle: string;
  discordHandle: string;
  twitterHandle: string;
  email: string;
  facilitatorImage: string;
}

export interface Mip41Dto {
  contributor: ContributorDto[];
}

export interface ContributorCommitmentDto {
  id: string;
  commitment: string;
  startDate: string;
  jobTitle: CuJobEnum;
  contributor: ContributorDto[];
}

export interface CuMipDto {
  mipTitle: string;
  mipCode: string;
  dateMip: Date;
  mipStatus: CuStatusEnum;
  mipUrl: string;
  accepted: string;
  formalSubmission: string;
  rfc: string;
  rejected: string;
  obsolete: string;
  mip40: Mip40Dto[];
  mip41: Mip41Dto[];
}

export interface BudgetStatementFteDto {
  month: string;
  ftes: number;
}

export interface BudgetStatementLineItemDto {
  actual: number;
  forecast?: number;
  payment?: number;
  budgetCategory?: string;
  headcountExpense?: boolean;
  comments?: string;
  month?: string;
  budgetCap?: number;
  group?: string;
}

export interface SourceDto {
  code: string;
  url: string;
  title: string;
}
export interface TargetDto {
  amount: number;
  calculation: string;
  description: string;
  source: SourceDto;
}

export interface BudgetStatementWalletTransferRequestDto {
  requestAmount: number;
  walletBalance: number;
  target: TargetDto;
  walletBalanceTimeStamp: string;
}

export interface BudgetStatementWalletDto {
  id?: number;
  name: string;
  address?: string;
  currentBalance?: number;
  budgetStatementLineItem: BudgetStatementLineItemDto[];
  budgetStatementTransferRequest?: BudgetStatementWalletTransferRequestDto[];
}

export interface BudgetStatementMKRVestDto {
  mkrAmount: number;
  mkrAmountOld: number;
  vestingDate: string;
  comments: string;
}

export interface AuditReportDto {
  auditStatus: string;
  reportUrl: string;
  timestamp: string;
}

export enum BudgetStatus {
  Draft = 'Draft',
  Review = 'Review',
  Escalated = 'Escalated',
  Final = 'Final',
}
export interface CommentsBudgetStatementDto {
  id: string;
  budgetStatementId: string;
  timestamp: string;
  comment: string;
  author: UserDTO;
  status: BudgetStatus;
}

interface CoreUnitParam {
  coreUnit: {
    code: string;
    shortCode: string;
  };
  month: string;
  budgetStatementId: number;
}

interface OwnerParam {
  owner: {
    code: string;
    shortCode: string;
    type: string;
  };
  month: string;
  budgetStatementId: number;
}

export type ActivityFeedParams = CoreUnitParam | OwnerParam;

export interface ActivityFeedDto {
  id: string;
  created_at: string;
  event: string;
  params: ActivityFeedParams;
  description: string;
}

export interface BudgetStatementDto {
  id: string;
  month: string;
  status: BudgetStatus;
  publicationUrl: string;
  activityFeed: ActivityFeedDto[];
  comments: CommentsBudgetStatementDto[];
  budgetStatementFTEs: BudgetStatementFteDto[];
  budgetStatementWallet: BudgetStatementWalletDto[];
  budgetStatementMKRVest?: BudgetStatementMKRVestDto[];
  auditReport: AuditReportDto[];
}

export interface SocialMediaChannelDto {
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
  github: string;
}

export interface LastActivityDto {
  id: string;
  created_at: string;
  event: string;
  description: string;
}

export interface AuditorDto {
  id: string;
  username: string;
}

export interface CoreUnitDto {
  id: string;
  shortCode: string;
  code: string;
  name: string;
  image: string;
  sentenceDescription: string;
  paragraphDescription: string;
  paragraphImage: string;
  category: string[];
  legacyBudgetStatementUrl?: string;
  auditors: AuditorDto[];
  cuMip: CuMipDto[];
  activityFeed: ActivityFeedDto[];
  lastActivity?: LastActivityDto;
  socialMediaChannels: SocialMediaChannelDto[];
  budgetStatements: BudgetStatementDto[];
  contributorCommitment: ContributorCommitmentDto[];
}
