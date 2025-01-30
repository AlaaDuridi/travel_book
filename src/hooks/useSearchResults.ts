import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IHomeSearchRequestParams, IHomeResult } from '../types/models/home.model.ts';
import { getSearchResultAsync } from '../store/search/searchSlice'; // Import the Redux thunk
import { setSearchParams } from '../store/search/searchParamsSlice'; // Import the Redux action
const useSearchResults = () => {
  // Use Redux to get search parameters
  const searchParams = useAppSelector((state) => state.searchParams).params;
  const dispatch = useAppDispatch();

  // Use React Query to fetch search results
  const {
    data: results,
    isLoading,
    isError,
    error,
  } = useQuery<IHomeResult[], Error>({
    queryKey: ['searchResults', searchParams], // Unique key for caching
    queryFn: async () => {
      const response = await dispatch(getSearchResultAsync(searchParams)); // Dispatch the Redux thunk
      return response.payload as IHomeResult[]; // Return the results
    },
  });

  // Function to update search parameters in Redux
  const updateSearchParams = (params: IHomeSearchRequestParams) => {
    dispatch(setSearchParams(params)); // Dispatch the Redux action
  };

  return {
    results,
    isLoading,
    isError,
    error,
    searchParams,
    updateSearchParams,
  };
};

export default useSearchResults;
