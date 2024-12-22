export interface IRoom {
  id: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType:
    | 'Suite'
    | 'Standard'
    | 'Deluxe'
    | 'Economy'
    | 'Family Suite'
    | 'Executive Suite'
    | string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  price: number;
  availability: boolean;
  roomAmenities: IRoomAmenity[];

  hotelId: number;
}

export interface IRoomAmenity {
  name: string;
  description: string;
}
