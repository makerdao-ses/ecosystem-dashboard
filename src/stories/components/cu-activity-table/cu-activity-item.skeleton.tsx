import { Skeleton } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { ActivityItem, ButtonContainer, CoreUnit, Details, FlexWrapper, Timestamp } from './cu-activity-item2';

export type CUActivityItemSkeletonProps = {
  isGlobal?: boolean;
};

const CUActivityItemSkeleton: React.FC<CUActivityItemSkeletonProps> = ({ isGlobal = false }) => {
  const { isLight } = useThemeContext();
  const background = isLight ? '#ECF1F3' : '#1E2C37';
  return (
    <ActivityItem isGlobal={isGlobal} isLight={isLight} noHover={true}>
      <FlexWrapper isGlobal={isGlobal}>
        <CoreUnit isGlobal={isGlobal}>
          <Skeleton variant="circular" width={32} height={32} style={{ background }} />
          <Skeleton
            variant="text"
            width={40}
            height={28}
            style={{
              marginLeft: 16,
              background,
            }}
          />
          <Skeleton
            variant="text"
            width={100}
            height={28}
            style={{
              marginLeft: 4,
              background,
            }}
          />
        </CoreUnit>
        <Timestamp isGlobal={isGlobal}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={16}
            style={{
              background,
              borderRadius: '4px/6.7px',
              marginBottom: 2,
            }}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={18}
            style={{
              background,
              borderRadius: '4px/6.7px',
            }}
          />
        </Timestamp>
      </FlexWrapper>
      <Details isLight={isLight} isGlobal={isGlobal}>
        <Skeleton
          variant="text"
          width={300}
          height={30}
          style={{
            maxWidth: '100%',
            background,
          }}
        />
      </Details>
      <ButtonContainer isGlobal={isGlobal}>
        <Skeleton
          variant="rectangular"
          width={132.3}
          height={35.6}
          style={{
            display: 'inline-block',
            borderRadius: 22,
            background,
          }}
        />
      </ButtonContainer>
    </ActivityItem>
  );
};

export default CUActivityItemSkeleton;
