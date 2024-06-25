import { OwnerType } from '@ses/core/models/interfaces/projects';
import type { Deliverable, KeyResult } from '@/core/models/interfaces/deliverables';
import { DeliverableStatus } from '@/core/models/interfaces/deliverables';
import type { OwnerRef, Progress } from '@/core/models/interfaces/roadmaps';

export class DeliverableBuilder {
  private readonly _deliverable: Deliverable;

  constructor() {
    this._deliverable = {
      id: '',
      title: '',
      description: '',
      status: DeliverableStatus.TODO,
      workProgress: {},
      owner: {},
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

  withDescription(description: string): DeliverableBuilder {
    this._deliverable.description = description;
    return this;
  }

  withStatus(status: DeliverableStatus): DeliverableBuilder {
    this._deliverable.status = status;
    return this;
  }

  withProgress(progress: Progress): DeliverableBuilder {
    this._deliverable.workProgress = progress;
    return this;
  }

  withOwner(owner: OwnerRef): DeliverableBuilder {
    this._deliverable.owner = owner;
    return this;
  }

  withOwnerData(id: string, imageUrl: string, name: string, code?: string): DeliverableBuilder {
    this._deliverable.owner = {
      ref: OwnerType.EcosystemActor,
      id,
      imageUrl,
      name,
      code,
    } as OwnerRef;
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
