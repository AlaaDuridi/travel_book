import { Box, BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ResponsiveStyleValue } from '@mui/system';

type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

// Define the props for the SearchContainer
interface SearchContainerProps extends BoxProps {
  position?: ResponsiveStyleValue<Position>;
  topXs?: string;
  topLg?: string;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  position = 'absolute',
  topXs = '80px',
  topLg = '80px',
  children,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 'fit-content',
        backgroundColor: 'white',
        border: '3px solid #e5a905', // Yellow border
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderRadius: '10px',
        position: position, // Default is "absolute"
        zIndex: '9',
        width: '90%',
        maxWidth: '1160px',

        // Responsive styles for extra-small screens (xs)
        [theme.breakpoints.up('xs')]: {
          top: topXs, // Custom top position for xs screens
          flexDirection: 'column', // Stack items vertically
          gap: '10px', // Add gap between items
        },

        // Responsive styles for large screens (lg)
        [theme.breakpoints.up('lg')]: {
          top: topLg, // Custom top position for lg screens
          flexDirection: 'row', // Align items horizontally
          gap: 'none', // Remove gap between items
        },
      }}
      {...rest} // Spread any additional props
    >
      {children}
    </Box>
  );
};

export default SearchContainer;
