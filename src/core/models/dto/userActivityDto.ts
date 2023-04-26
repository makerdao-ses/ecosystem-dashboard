export interface UserActivityDto {
  id: string;
  userId: string;
  collection: string;
  data: object | null;
  lastVisit: string;
}

export interface DataAndStamp {
  data: object | null;
  timestamp: string;
}

export interface UserActivityUpdatePayload {
  id: string;
  userId: string;
  collection: string;
  current: DataAndStamp;
  previous: DataAndStamp;
}

export interface UserActivityUpdateInput {
  collection: string;
  userId: string;
  data?: object;
  timestamp?: string;
}

export interface LocalStoredUserActivity {
  data: object | null;
  timestamp: string;
}
