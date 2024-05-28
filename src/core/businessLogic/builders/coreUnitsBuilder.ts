import type { CuCategoryEnum } from '../../enums/cuCategoryEnum';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ContributorCommitment } from '@ses/core/models/interfaces/contributor';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Auditor } from '@ses/core/models/interfaces/users';

export class CoreUnitsBuilder {
  private readonly _coreUnit: CoreUnit;

  constructor() {
    this._coreUnit = {
      name: '',
      status: '',
      code: '',
      shortCode: '',
      image: '',
      id: '',
      budgetPath: '',
      legacyBudgetStatementUrl: '',
      sentenceDescription: '',
      paragraphDescription: '',
      paragraphImage: '',
      category: [] as string[],
      auditors: [] as Auditor[],
      budgetStatements: [] as BudgetStatement[],
      socialMediaChannels: [] as SocialMediaChannels[],
      cuMip: [] as CuMip[],
      contributorCommitment: [] as ContributorCommitment[],
      activityFeed: [] as ChangeTrackingEvent[],
    } as CoreUnit;
  }

  withId(id: string): CoreUnitsBuilder {
    this._coreUnit.id = id;
    return this;
  }

  withName(name: string): CoreUnitsBuilder {
    this._coreUnit.name = name;
    return this;
  }

  withImage(image: string): CoreUnitsBuilder {
    this._coreUnit.image = image;
    return this;
  }

  withCode(code: string): CoreUnitsBuilder {
    this._coreUnit.code = code;
    return this;
  }

  withShortCode(code: string): CoreUnitsBuilder {
    this._coreUnit.shortCode = code;
    return this;
  }

  withLegacyBudgetStatementUrl(url: string): CoreUnitsBuilder {
    this._coreUnit.legacyBudgetStatementUrl = url;
    return this;
  }

  withDescription(description: string): CoreUnitsBuilder {
    this._coreUnit.sentenceDescription = description;
    return this;
  }

  withParagraphDescription(description: string): CoreUnitsBuilder {
    this._coreUnit.paragraphDescription = description;
    return this;
  }

  withParagraphImage(image: string): CoreUnitsBuilder {
    this._coreUnit.paragraphImage = image;
    return this;
  }

  withStatus(status: string): CoreUnitsBuilder {
    this._coreUnit.status = status;
    return this;
  }

  addCategory(category: CuCategoryEnum) {
    this._coreUnit.category.push(category);
    return this;
  }

  addAuditors(auditors: Auditor | Auditor[]): CoreUnitsBuilder {
    if (Array.isArray(auditors)) {
      this._coreUnit.auditors = this._coreUnit.auditors.concat(auditors);
    } else {
      this._coreUnit.auditors.push(auditors);
    }
    return this;
  }

  addBudgetStatement(budgetStatement: BudgetStatement): CoreUnitsBuilder {
    this._coreUnit.budgetStatements.push(budgetStatement);
    return this;
  }

  addSocialMediaChannel(socialMediaChannel: SocialMediaChannels): CoreUnitsBuilder {
    this._coreUnit.socialMediaChannels.push(socialMediaChannel);
    return this;
  }

  addCuMip(cuMip: CuMip): CoreUnitsBuilder {
    this._coreUnit.cuMip.push(cuMip);
    return this;
  }

  addContributorCommitment(contributorCommitment: ContributorCommitment): CoreUnitsBuilder {
    this._coreUnit.contributorCommitment.push(contributorCommitment);
    return this;
  }

  addActivity(activity: ChangeTrackingEvent): CoreUnitsBuilder {
    this._coreUnit.activityFeed.push(activity);
    return this;
  }

  addBudgetPath(budgetPath: string): CoreUnitsBuilder {
    this._coreUnit.budgetPath = budgetPath;
    return this;
  }

  build(): CoreUnit {
    return this._coreUnit;
  }
}
