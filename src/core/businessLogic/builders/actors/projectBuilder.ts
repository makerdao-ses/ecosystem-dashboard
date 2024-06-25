import { BudgetType, ProjectStatus } from '@ses/core/models/interfaces/projects';
import type { Deliverable } from '@/core/models/interfaces/deliverables';
import type { Owner, Project } from '@ses/core/models/interfaces/projects';

export class ProjectBuilder {
  private readonly _project: Project;

  constructor() {
    this._project = {
      id: '',
      code: '',
      owner: {} as Owner,
      title: '',
      abstract: '',
      status: ProjectStatus.TODO,
      progress: {
        __typename: 'Percentage',
        value: 0,
      },
      imgUrl: '',
      budgetType: BudgetType.CAPEX,
      deliverables: [],
    } as Project;
  }

  withId(id: string): ProjectBuilder {
    this._project.id = id;
    return this;
  }

  withCode(code: string): ProjectBuilder {
    this._project.code = code;
    return this;
  }

  withOwner(owner: Owner): ProjectBuilder {
    this._project.owner = owner;
    return this;
  }

  withTitle(title: string): ProjectBuilder {
    this._project.title = title;
    return this;
  }

  withAbstract(abstract: string): ProjectBuilder {
    this._project.abstract = abstract;
    return this;
  }

  withStatus(status: ProjectStatus): ProjectBuilder {
    this._project.status = status;
    return this;
  }

  withProgress(progress: number): ProjectBuilder {
    this._project.progress = {
      __typename: 'Percentage',
      value: progress,
    };
    return this;
  }

  withImgUrl(imgUrl: string): ProjectBuilder {
    this._project.imgUrl = imgUrl;
    return this;
  }

  withBudgetType(budgetType: BudgetType): ProjectBuilder {
    this._project.budgetType = budgetType;
    return this;
  }

  addDeliverable(deliverable: Deliverable): ProjectBuilder {
    this._project.deliverables.push(deliverable);
    return this;
  }

  build(): Project {
    return this._project;
  }
}
