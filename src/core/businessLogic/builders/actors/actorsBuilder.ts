import { ResourceType } from '@ses/core/models/interfaces/types';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Scope } from '@ses/core/models/interfaces/scopes';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Team } from '@ses/core/models/interfaces/team';
import type { Auditor } from '@ses/core/models/interfaces/users';

export class EcosystemActorBuilder {
  private readonly _ecosystemActor: Team;

  constructor() {
    this._ecosystemActor = {
      id: '',
      code: '',
      status: '',
      shortCode: '',
      budgetPath: '',
      paragraphDescription: '',
      sentenceDescription: '',
      lastActivity: {} as ChangeTrackingEvent,
      auditors: [] as Auditor[],
      name: '',
      type: ResourceType.EcosystemActor,
      image: '',
      category: [] as string[],
      scopes: [] as Scope[],
      socialMediaChannels: [] as SocialMediaChannels[],
    } as Team;
  }

  withId(id: string): EcosystemActorBuilder {
    this._ecosystemActor.id = id;
    return this;
  }

  withShortCode(shortCode: string): EcosystemActorBuilder {
    this._ecosystemActor.shortCode = shortCode;
    return this;
  }

  withCode(code: string): EcosystemActorBuilder {
    this._ecosystemActor.code = code;
    return this;
  }

  withParagraphDescription(description: string): EcosystemActorBuilder {
    this._ecosystemActor.paragraphDescription = description;
    return this;
  }

  withSentenceDescription(sentenceDescription: string): EcosystemActorBuilder {
    this._ecosystemActor.sentenceDescription = sentenceDescription;
    return this;
  }

  withLastActivity(lastActivity: ChangeTrackingEvent): EcosystemActorBuilder {
    this._ecosystemActor.lastActivity = lastActivity;
    return this;
  }

  withStatus(status: string): EcosystemActorBuilder {
    this._ecosystemActor.status = status;
    return this;
  }

  addAuditor(auditor: Auditor): EcosystemActorBuilder {
    this._ecosystemActor.auditors.push(auditor);
    return this;
  }

  withName(name: string): EcosystemActorBuilder {
    this._ecosystemActor.name = name;
    return this;
  }

  withType(type: ResourceType): EcosystemActorBuilder {
    this._ecosystemActor.type = type;
    return this;
  }

  withImage(image: string): EcosystemActorBuilder {
    this._ecosystemActor.image = image;
    return this;
  }

  addCategory(category: string): EcosystemActorBuilder {
    this._ecosystemActor.category.push(category);
    return this;
  }

  addScope(scope: Scope): EcosystemActorBuilder {
    this._ecosystemActor.scopes.push(scope);
    return this;
  }

  withSocials(socialMediaChannels: SocialMediaChannels): EcosystemActorBuilder {
    this._ecosystemActor.socialMediaChannels.push(socialMediaChannels);
    return this;
  }

  withBudgetPath(budgetPath: string): EcosystemActorBuilder {
    this._ecosystemActor.budgetPath = budgetPath;
    return this;
  }

  build(): Team {
    return this._ecosystemActor;
  }
}
