import { DeliverableStatus, OwnerType } from '@ses/core/models/interfaces/projects';
import type { Owner, Deliverable, KeyResult, Progress } from '@ses/core/models/interfaces/projects';

export class DeliverableBuilder {
  private readonly _deliverable: Deliverable;

  constructor() {
    this._deliverable = {
      id: '',
      title: '',
      status: DeliverableStatus.TODO,
      progress: {},
      owner: {} as Owner,
      keyResults: [] as KeyResult[],
    } as Deliverable;
  }

  withId(id: string): DeliverableBuilder {
    this._deliverable.id = id;
    return this;
  }

  withTitle(title: string): DeliverableBuilder {
    this._deliverable.title = title;
    return this;
  }

  withStatus(status: DeliverableStatus): DeliverableBuilder {
    this._deliverable.status = status;
    return this;
  }

  withProgress(progress: Progress): DeliverableBuilder {
    this._deliverable.progress = progress;
    return this;
  }

  withOwner(owner: Owner): DeliverableBuilder {
    this._deliverable.owner = owner;
    return this;
  }

  withOwnerData(id: string, imgUrl: string, name: string, code?: string): DeliverableBuilder {
    this._deliverable.owner = {
      ref: OwnerType.EcosystemActor,
      id,
      imgUrl,
      name,
      code,
    } as Owner;
    return this;
  }

  addKeyResult(id: string, title: string, link: string): DeliverableBuilder {
    this._deliverable.keyResults.push({
      id,
      title,
      link,
    });
    return this;
  }

  build(): Deliverable {
    return this._deliverable;
  }
}
