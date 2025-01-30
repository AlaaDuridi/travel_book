import { IHomeSearchRequestParams, IHomeResult } from '../../types/models/home.model.ts';
import SearchService from '../../services/search.service.ts';

export const searchHotelsAPI = async (params: IHomeSearchRequestParams): Promise<IHomeResult[]> => {
  return await SearchService.list(params);
};
