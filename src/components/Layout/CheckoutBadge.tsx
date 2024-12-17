import { Badge } from '@mui/material';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { FC } from 'react';
import { ICheckoutBadgeProps } from './Layout.types.ts';

const CheckoutBadge: FC<ICheckoutBadgeProps> = ({ numberOfBookedRooms }) => {
  return (
    <Badge badgeContent={numberOfBookedRooms} color='error'>
      <ShoppingCartCheckout />
    </Badge>
  );
};

export default CheckoutBadge;
