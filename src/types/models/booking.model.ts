export interface IBookingRequest {
  customerName: string;
  roomNumber: number;
  roomType: string;
  totalCost: number;
  paymentMethod: string;
}

export interface IBookingResponse extends IBookingRequest {
  hotelName?: string;
  bookingDateTime: string;
  bookingStatus: string;
  confirmationNumber?: string;
}
