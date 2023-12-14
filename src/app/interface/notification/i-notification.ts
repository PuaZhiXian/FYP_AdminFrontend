export interface INotification {
  id: number,
  title: string,
  description: string,
  announcement_text?: string,
  startDate: Date,
  endDate: Date,
}
