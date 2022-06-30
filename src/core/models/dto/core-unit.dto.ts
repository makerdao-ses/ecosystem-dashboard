export interface Mip40BudgetPeriodDto {
  budgetPeriodStart: string;
  budgetPeriodEnd: string
}

export interface Mip40BudgetLineItemDto {
  budgetCap: number;
}

export interface Mip40WalletDto {
  mip40BudgetLineItem: Mip40BudgetLineItemDto[]
}

export interface Mip40Dto {
  mip40BudgetPeriod: Mip40BudgetPeriodDto[]
  mip40Wallet: Mip40WalletDto[]
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

export interface CuMipDto {
  mipStatus: string;
  mipUrl: string;
  accepted: string;
  formalSubmission: string;
  rfc: string;
  rejected: string;
  obsolete: string;
  mip40: Mip40Dto[]
  mip41: Mip41Dto[]
}

export interface BudgetStatementFteDto {
  month: string;
  ftes: number
}

export interface BudgetStatementLineItemDto {
  actual: number;
  forecast?: number;
  budgetCategory?: string;
  headcountExpense?: boolean;
  comments?: string;
}

export interface BudgetStatementWalletDto {
  name: string;
  budgetStatementLineItem: BudgetStatementLineItemDto[];
}

export interface BudgetStatementDto {
  month: string;
  budgetStatus: string;
  budgetStatementFTEs: BudgetStatementFteDto[];
  budgetStatementWallet: BudgetStatementWalletDto[]
}

export interface SocialMediaChannelDto {
  forumTag: string;
  twitter: string;
  youtube: string;
  discord: string;
  linkedIn: string;
  website: string;
}

export interface RoadMapDto {
  ownerCuId: string
  roadmapStatus: string;
}

export interface CoreUnitDto {
  id: string;
  code: string;
  name: string;
  image: string;
  sentenceDescription: string;
  category: string[];
  cuMip: CuMipDto[]
  roadMap: RoadMapDto[];
  socialMediaChannels: SocialMediaChannelDto[];
  budgetStatements: BudgetStatementDto[]
}
