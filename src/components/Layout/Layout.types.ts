import { SxProps } from '@mui/material';

export interface INavbarLinkProps {
  href?: string;
  sx?: SxProps;
  scrollTo?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface INavbarListProps {
  sx?: SxProps;
  links: INavbarLinkProps[];
}

export interface INavbarProps {
  topLinks: INavbarLinkProps[];
  bottomLinks: INavbarLinkProps[];
}

export interface ICheckoutBadgeProps {
  numberOfBookedRooms: number;
}
