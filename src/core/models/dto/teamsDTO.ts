export type TeamType = 'AlignedDelegates' | 'CoreUnit' | 'Delegates' | 'EcosystemActor' | 'System';

export interface ActorSocialDto {
  [key: string]: string | undefined;
  forumProfile?: string;
  forumPlatform?: string;
  youtube?: string;
  votingPortal?: string;
  twitter?: string;
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
  category: string[];
  scope: Scope[];
  socials: ActorSocialDto;
}
