import { IRoomAmenity, IRoomType, ISortBy } from '../../types/models/room.model.ts';

export interface ISearchProps {
  priceRange: [number, number];
  starRating?: string;
  amenities: IRoomAmenity[];
  roomType: IRoomType;
  sort: ISortBy;
}

export const STAR_RATING_OPTIONS = [1, 2, 3, 4, 5];
