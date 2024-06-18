import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import ReserveCardMobileSkeleton from './ReserveCardMobileSkeleton';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ReserveCardSkeletonProps {
  isGroup?: boolean;
}

const ReserveCardSkeleton: React.FC<ReserveCardSkeletonProps> = ({ isGroup = false }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  if (isMobile) {
    return <ReserveCardMobileSkeleton isGroup={isGroup} />;
  }

  return (
    <Card isLight={isLight}>
      <TitleContainer isGroup={isGroup}>
        {isGroup ? (
          <GroupTitleSkeleton isLight={isLight} />
        ) : (
          <AccountContainer>
            <AccountAvatarSkeleton isLight={isLight} variant="circular" />
            <AccountInfo>
              <AccountNameSkeleton isLight={isLight} />
              <AccountAddressSkeleton isLight={isLight} />
            </AccountInfo>
          </AccountContainer>
        )}
      </TitleContainer>

      <InitialContainer>
        <InitialLabelSkeleton isLight={isLight} />
        <GenericValueContainer>
          <InitialValueSkeleton isLight={isLight} />
          <CurrencySkeleton isLight={isLight} />
        </GenericValueContainer>
      </InitialContainer>

      <InflowContainer>
        <InflowLabelSkeleton isLight={isLight} />
        <GenericValueContainer>
          <InflowSignSkeleton isLight={isLight} />
          <InflowValueSkeleton isLight={isLight} />
          <CurrencySkeleton isLight={isLight} />
        </GenericValueContainer>
      </InflowContainer>

      <OutflowContainer>
        <OutflowLabelSkeleton isLight={isLight} />
        <GenericValueContainer>
          <OutflowSignSkeleton isLight={isLight} />
          <OutflowValueSkeleton isLight={isLight} />
          <CurrencySkeleton isLight={isLight} />
        </GenericValueContainer>
      </OutflowContainer>

      <BalanceContainer>
        <BalanceLabelSkeleton isLight={isLight} />
        <GenericValueContainer>
          <BalanceValueSkeleton isLight={isLight} />
          <CurrencySkeleton isLight={isLight} />
        </GenericValueContainer>
      </BalanceContainer>
    </Card>
  );
};

export default ReserveCardSkeleton;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  borderRadius: 6,
  backgroundColor: isLight ? '#ffffff' : '#10191F',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const TitleContainer = styled.div<{ isGroup: boolean }>(({ isGroup }) => ({
  display: 'flex',
  padding: isGroup ? '24px 16px' : '19px 0px 14px 16px',
  width: '28.57%',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: '26.5487%',
    padding: isGroup ? '24px 16px' : '17.5px 0 18.75px 16px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '25.338%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '22.8658%',
  },
}));

const AccountContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const GroupTitleSkeleton = styled(BaseSkeleton)({
  width: 55,
  height: 10.5,
  marginTop: 3.5,
  marginBottom: 8,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 200,
    height: 14,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 206,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 210,
  },
});

const AccountAvatarSkeleton = styled(BaseSkeleton)({
  width: 32,
  height: 32,
});

const AccountInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 11.5,
  },
});

const AccountNameSkeleton = styled(BaseSkeleton)({
  width: 70,
  height: 12,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 89,
    height: 14,
  },
});

const AccountAddressSkeleton = styled(BaseSkeleton)({
  width: 78,
  height: 12,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 99,
    height: 12.25,
  },
});

const InitialContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 2px 19.75px 2px',
  width: '17.013%',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px 0 21px 16px',
    width: '16.77%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '17.145%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '17.911%',
  },
});

const InitialLabelSkeleton = styled(BaseSkeleton)({
  width: 72,
  height: 9.63,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 79,
    height: 10.5,
  },
});

const GenericValueContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  marginTop: 12.37,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 12.5,
  },
});

const InitialValueSkeleton = styled(BaseSkeleton)({
  width: 59,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 67,
    height: 14,
  },
});

const CurrencySkeleton = styled(BaseSkeleton)({
  width: 23,
  height: 10.5,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 26,
    height: 12.25,
  },
});

const InflowContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 4px 8px 2px',
  padding: '8px 10px 11.5px 8px',
  width: '16.104%',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.30)',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '8px 16px',
    padding: '8px 34.5px 12.75px 8px',
    width: '13.9%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '14.4%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '15.4%',
  },
});

const InflowLabelSkeleton = styled(BaseSkeleton)({
  width: 32,
  height: 9.63,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 35,
    height: 10.5,
  },
});

const InflowSignSkeleton = styled(BaseSkeleton)({
  width: 10,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 11,
    height: 14,
  },
});

const InflowValueSkeleton = styled(BaseSkeleton)({
  width: 61,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 70,
    height: 14,
  },
});

const OutflowContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 2px',
  padding: '8px 13px 11.5px 8px',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.30)',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '8px 16px',
    padding: '8px 34.5px 12.75px 8px',
    width: '13.9%',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: '14.4%',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: '15.4%',
  },
});

const OutflowLabelSkeleton = styled(BaseSkeleton)({
  width: 41,
  height: 9.63,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 45,
    height: 10.5,
  },
});

const OutflowSignSkeleton = styled(BaseSkeleton)({
  width: 7,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 8,
    height: 14,
  },
});

const OutflowValueSkeleton = styled(BaseSkeleton)({
  width: 61,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 70,
    height: 14,
  },
});

const BalanceContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '16px 49px 19.5px 0px',
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px 88.5px 21px 0px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 104px 21px 0px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 136px 21px 0px',
  },
});

const BalanceLabelSkeleton = styled(BaseSkeleton)({
  width: 68,
  height: 9.63,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 75,
    height: 10.5,
  },
});

const BalanceValueSkeleton = styled(BaseSkeleton)({
  width: 59,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 67,
    height: 14,
  },
});
