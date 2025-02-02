import { IRoomAmenity, IRoomType, ISortBy } from '../../types/models/room.model.ts';
import { IHomeSearchRequestParams } from '../../types/models/home.model.ts';

export interface ISearchProps {
  priceRange: [number, number];
  starRating?: string;
  amenities: IRoomAmenity[];
  roomType: IRoomType;
  sort: ISortBy;
}

export const STAR_RATING_OPTIONS = [1, 2, 3, 4, 5];

export interface IOption {
  name: keyof IHomeSearchRequestParams;
  label: string;
  min: number;
}

export const OPTIONS: IOption[] = [
  {
    name: 'adults',
    label: 'Adults',
    min: 1,
  },
  {
    name: 'children',
    label: 'Children',
    min: 0,
  },
  {
    name: 'numberOfRooms',
    label: 'Rooms',
    min: 1,
  },
];

export const INITIAL_FILTERS: ISearchProps = {
  priceRange: [0, 1000],
  starRating: undefined,
  amenities: [],
  roomType: '',
  sort: ISortBy.PRICE,
};
