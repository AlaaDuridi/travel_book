import { IHotel } from '../../types/models/hotel.model.ts';
import { ACTION_TYPES } from '../../constants/common.constants.ts';

export interface IHotelActionDialogProps {
  open: boolean;
  onClose: () => void;
  hotel: IHotel;
  actionType: ACTION_TYPES;
}
