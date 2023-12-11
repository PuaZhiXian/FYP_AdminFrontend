export interface IApiCollection {
  id: number,
  api_collection_name: string,
  createdAt: Date,
  count: number,
  api_category_name: string,
  api_category_id: number
  short_description: string,
  long_description: string,
  active: boolean
}
