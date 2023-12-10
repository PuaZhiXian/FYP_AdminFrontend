import {IApiCollection} from "./i-api-collection";

export interface IApiCategory {
  id: number,
  isActive: boolean,
  category_name: string,
  image_url: string,
  api_collections: IApiCollection[],
  active: boolean,
}
