import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import { ISearchProps } from './Search.types.ts';
import { toast } from 'react-toastify';
import useSearchResults from '../../hooks/useSearchResults.ts';
import { IHomeResult } from '../../types/models/home.model.ts';

interface ISearchGridProps {
  props: ISearchProps;
}

const SearchGrid: FC<ISearchGridProps> = ({ props }) => {
  const [searchParams] = useSearchParams();
  const [finalResults, setFinalResults] = useState<IHomeResult[]>([]);
  const {
    results,
    isLoading,
    isError,
    error,
    searchParams: params,
    updateSearchParams,
  } = useSearchResults();

  const objSearchParams = Object.fromEntries([...searchParams]);
  useEffect(() => {
    if (searchParams) {
      updateSearchParams({
        ...params,
        ...objSearchParams,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const applyFilters = () => {
      const filteredResults = results?.filter((result) => {
        if (props.starRating && result.starRating !== parseInt(props.starRating)) {
          return false;
        }

        if (props.roomType && result.roomType !== props.roomType) {
          return false;
        }

        if (
          props.priceRange &&
          (result.roomPrice < props.priceRange[0] || result.roomPrice > props.priceRange[1])
        ) {
          return false;
        }

        return !(
          props.amenities && !props.amenities.every((amenity) => result.amenities.includes(amenity))
        );
      });

      if (props.sort) {
        filteredResults?.sort((a, b) =>
          props.sort === 'Price' ? a.roomPrice - b.roomPrice : b.starRating - a.starRating,
        );
      }
      if (filteredResults) setFinalResults(filteredResults);
    };

    if (results) void applyFilters();
  }, [props, results]);

  console.log('finalResults', finalResults);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
  console.log('error', error);
  console.log('results', results);
  console.log('searchParams', searchParams);
  console.log('params', params);

  return (
    <>
      <div>is Loading ? {isLoading}</div>
      <div>is Error ? {isError}</div>
    </>
  );
};

export default SearchGrid;
