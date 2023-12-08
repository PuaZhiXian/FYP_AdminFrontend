import {IApiCollection} from "./i-api-collection";

export interface IApiCategory {
  category_name: string,
  image_url: string,
  short_description: string,
  api_collections: IApiCollection[],
}
