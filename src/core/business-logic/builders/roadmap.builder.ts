import { RoadMapDao } from '../../../stories/containers/cu-table/cu-table.api';

export class RoadmapBuilder {
  private readonly _roadmap: RoadMapDao;

  constructor() {
    this._roadmap = {
      ownerCuId: '',
      roadmapStatus: '',
    } as RoadMapDao;
  }

  withOwnerCuId(ownerCuId: string): RoadmapBuilder {
    this._roadmap.ownerCuId = ownerCuId;
    return this;
  }

  withRoadmapStatus(roadmapStatus: string): RoadmapBuilder {
    this._roadmap.roadmapStatus = roadmapStatus;
    return this;
  }

  build(): RoadMapDao {
    return this._roadmap;
  }
}
