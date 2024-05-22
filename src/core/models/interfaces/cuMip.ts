import type { Contributor } from './contributor';
import type { TeamStatus } from './types';

export interface Mip39 {
  id: string;
  mipId: string;
  mip39Spn: number;
  mipCode: string;
  cuName: string;
  sentenceSummary: string;
  paragraphSummary: string;
}

export interface Mip40BudgetPeriod {
  id: string;
  mip40Id: string;
  budgetPeriodStart: string;
  budgetPeriodEnd: string;
  ftes: number;
}

export interface Mip40BudgetLineItem {
  id: string;
  mip40WalletId: string;
  position: number;
  budgetCategory: string;
  budgetCap: number;
  canonicalBudgetCategory: string;
  group: string;
  headcountExpense: boolean;
}

export interface Mip40Wallet {
  id: string;
  mip40Id: string;
  address: string;
  name: string;
  signersTotal: number;
  signersRequired: number;
  clawbackLimit: number;
  mip40BudgetLineItem: Mip40BudgetLineItem[];
}

export interface Mip40 {
  id: string;
  cuMipId: string;
  mip40Spn: number;
  mkrOnly: boolean;
  mkrProgramLength: string;
  mip40BudgetPeriod: Mip40BudgetPeriod[];
  mip40Wallet: Mip40Wallet[];
}

export interface Mip41 {
  id: string;
  cuMipId: string;
  contributorId: string;
  contributor: Contributor;
}

export interface MipReplaces {
  id: string;
  newMip: string;
  replacedMip: string;
}

export interface CuMip {
  id?: string;
  mipCode: string;
  cuId: string;
  rfc: string;
  formalSubmission: string;
  accepted: string;
  rejected: string;
  obsolete: string;
  mipStatus: TeamStatus;
  mipUrl: string;
  mipTitle: string;
  forumUrl?: string;
  mip39: Mip39[];
  mip40: Mip40[];
  mip41: Mip41[];
  mipReplaces?: MipReplaces[];
}
