import type { AuditorDto } from './coreUnitDTO';

export type TeamType = 'AlignedDelegates' | 'CoreUnit' | 'Delegates' | 'EcosystemActor' | 'System';

export interface ActorSocialDto {
  [key: string]: string | undefined;
  forumProfile?: string;
  forumPlatform?: string;
  youtube?: string;
  votingPortal?: string;
  twitter?: string;
  forumTag?: string;
  github?: string;
  discord?: string;
  website?: string;
  linkedIn?: string;
}

export interface Scope {
  id: string;
  code: string;
  name: string;
}

export interface EcosystemActor {
  id: string;
  code: string;
  name: string;
  type: string;
  sentenceDescription: string;
  paragraphDescription: string;
  auditors: AuditorDto[];
  image: string;
  category: string[];
  scopes: Scope[];
  socialMediaChannels: ActorSocialDto[];
}
