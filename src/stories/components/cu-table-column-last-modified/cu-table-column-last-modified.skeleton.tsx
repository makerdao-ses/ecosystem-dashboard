import { Skeleton } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

export const CuTableColumnLastModifiedSkeleton = () => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <Skeleton
        variant="rectangular"
        width={70}
        height={13}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1E2C37',
          marginBottom: '8px',
        }}
      />
      <Skeleton
        variant="rectangular"
        width={96}
        height={16}
        style={{
          borderRadius: '8px',
          background: isLight ? '#ECF1F3' : '#1E2C37',
        }}
      />
    </div>
  );
};
