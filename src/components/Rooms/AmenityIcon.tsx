import { AMENITY } from '../../constants/room.constants.ts';
import { FC } from 'react';
import {
  AcUnit,
  AttachMoney,
  BeachAccess,
  BusinessCenter,
  FreeBreakfast,
  Hotel,
  KingBed,
  Kitchen,
  LocalBar,
  MeetingRoom,
  RoomService,
  SingleBed,
  Spa,
  SportsHandball,
  Tv,
  ViewComfy,
  Wifi,
  HelpOutline,
} from '@mui/icons-material';

interface IAmenityIconProps {
  amenity: AMENITY;
}

const AmenityIcon: FC<IAmenityIconProps> = ({ amenity }) => {
  const amenityIcon = (amenity: AMENITY) => {
    switch (amenity) {
      case AMENITY.FREE_WIFI:
        return <Wifi />;
      case AMENITY.TV:
        return <Tv />;
      case AMENITY.AIR_CONDITIONING:
        return <AcUnit />;
      case AMENITY.JACUZZI:
        return <Spa />;
      case AMENITY.MINI_BAR:
        return <LocalBar />;
      case AMENITY.OCEAN_VIEW:
        return <BeachAccess />;
      case AMENITY.KING_SIZE_BED:
        return <KingBed />;
      case AMENITY.CITY_VIEW:
        return <ViewComfy />;
      case AMENITY.ROOM_SERVICE:
        return <RoomService />;
      case AMENITY.BUDGET_FRIENDLY:
        return <AttachMoney />;
      case AMENITY.SINGLE_BED:
        return <SingleBed />;
      case AMENITY.ADJOINING_ROOMS:
        return <Hotel />;
      case AMENITY.COMPLIMENTARY_BREAKFAST:
        return <FreeBreakfast />;
      case AMENITY.KITCHENETTE:
        return <Kitchen />;
      case AMENITY.PLAY_AREA:
        return <SportsHandball />;
      case AMENITY.BUSINESS_CENTER_ACCESS:
        return <BusinessCenter />;
      case AMENITY.MEETING_ROOM:
        return <MeetingRoom />;
      default:
        return <HelpOutline />;
    }
  };

  return <>{amenityIcon(amenity)}</>;
};
export default AmenityIcon;
