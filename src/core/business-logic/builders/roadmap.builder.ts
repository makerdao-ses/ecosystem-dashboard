import { RoadMapDto } from '../../models/dto/core-unit.dto';

export class RoadmapBuilder {
  private readonly _roadmap: RoadMapDto;

  constructor() {
    this._roadmap = {
      ownerCuId: '',
      roadmapStatus: '',
    } as RoadMapDto;
  }

  withOwnerCuId(ownerCuId: string): RoadmapBuilder {
    this._roadmap.ownerCuId = ownerCuId;
    return this;
  }

  withRoadmapStatus(roadmapStatus: string): RoadmapBuilder {
    this._roadmap.roadmapStatus = roadmapStatus;
    return this;
  }

  build(): RoadMapDto {
    return this._roadmap;
  }
}
