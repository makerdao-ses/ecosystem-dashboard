export interface ChangeTrackingEvent {
  id: string;
  created_at: string;
  event: string;
  params: JSON;
  description: string;
}
