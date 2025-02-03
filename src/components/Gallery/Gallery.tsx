import { FC } from 'react';
import { useHotelGallery } from '../../hooks/useHotelData.tsx';
import { Chip, styled, Skeleton, useMediaQuery, useTheme, Grid } from '@mui/material';
import { IHotelGallery } from '../../types/models/hotel.model.ts';
import styles from './style.module.css';

//light gallery imports
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoPlay from 'lightgallery/plugins/autoplay';

interface IHotelGalleryProps {
  hotelId: number;
}

const StyledChip = styled(Chip)(() => ({
  position: 'absolute',
  bottom: 10,
  right: 10,
  borderColor: 'white',
  backgroundColor: '#ffc604',
  color: 'black',
  fontWeight: 600,
  fontSize: '1.2rem',
  padding: '20px 5px',
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top',
});

const HotelGallery: FC<IHotelGalleryProps> = ({ hotelId }) => {
  const { data: galleryImages, isLoading, isError } = useHotelGallery(hotelId);
  const onInit = () => {
    console.log('lightGallery has been initialized');
  };
  const theme = useTheme();
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const NUMBER_OF_PHOTOS_TO_BE_SHOWN = isXSmallScreen ? 2 : 4;

  return (
    <>
      {isLoading ? (
        <Skeleton height={363} />
      ) : (
        <LightGallery
          elementClassNames={styles.grid}
          animateThumb={false}
          zoomFromOrigin={false}
          allowMediaOverlap={true}
          toggleThumb={true}
          onInit={onInit}
          speed={500}
          getCaptionFromTitleOrAlt={true}
          plugins={[lgThumbnail, lgZoom, lgAutoPlay]}
        >
          {galleryImages?.map((item, index) => (
            <a
              key={index}
              className={index === NUMBER_OF_PHOTOS_TO_BE_SHOWN ? styles.positionRelative : ''}
              hidden={index > NUMBER_OF_PHOTOS_TO_BE_SHOWN}
              href={item.url}
            >
              <StyledImage
                className={index === NUMBER_OF_PHOTOS_TO_BE_SHOWN ? styles.blur : ''}
                src={item.url}
                alt={'Hotel Image'}
              />
              {index === NUMBER_OF_PHOTOS_TO_BE_SHOWN && (
                <StyledChip label={`Show +${galleryImages?.length - index} photos`} />
              )}
            </a>
          ))}
        </LightGallery>
      )}
    </>
  );
};
export default HotelGallery;
