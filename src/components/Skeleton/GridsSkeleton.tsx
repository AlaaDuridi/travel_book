import { Grid, Skeleton } from '@mui/material';

import { FC } from 'react';

interface GridsSkeletonProps {
  variant?: 'rectangular' | 'circular' | 'text';
  length?: number;
}

const GridsSkeleton: FC<GridsSkeletonProps> = ({ length, variant }) => {
  return (
    <>
      {Array.from({ length: length ?? 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton
            variant={variant ?? 'rectangular'}
            width={250}
            height={250}
            sx={{ marginLeft: 1 }}
          />
        </Grid>
      ))}
    </>
  );
};
export default GridsSkeleton;
