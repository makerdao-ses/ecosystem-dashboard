import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';

export class ActivityBuilder {
  private readonly _activity: ChangeTrackingEvent;
  private static idCounter = 0;

  constructor() {
    this._activity = {
      id: (ActivityBuilder.idCounter++).toString(),
      created_at: new Date().toISOString(),
      event: '',
      params: {},
      description: '',
    } as ChangeTrackingEvent;
  }

  withId(id: string): ActivityBuilder {
    this._activity.id = id;
    return this;
  }

  withCreatedAt(createdAt: string): ActivityBuilder {
    this._activity.created_at = createdAt;
    return this;
  }

  withEvent(event: string): ActivityBuilder {
    this._activity.event = event;
    return this;
  }

  withParams(params: object): ActivityBuilder {
    this._activity.params = params as never;
    return this;
  }

  withDescription(description: string): ActivityBuilder {
    this._activity.description = description;
    return this;
  }

  build(): ChangeTrackingEvent {
    return this._activity;
  }
}
