import { styled, useMediaQuery } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import ReserveCardMobileSkeleton from './ReserveCardMobileSkeleton';
import type { Theme } from '@mui/material';

interface ReserveCardSkeletonProps {
  isGroup?: boolean;
}

const ReserveCardSkeleton: React.FC<ReserveCardSkeletonProps> = ({ isGroup = false }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  if (isMobile) {
    return <ReserveCardMobileSkeleton isGroup={isGroup} />;
  }

  return (
    <Card>
      <TitleContainer isGroup={isGroup}>
        {isGroup ? (
          <GroupTitleSkeleton />
        ) : (
          <AccountContainer>
            <AccountAvatarSkeleton variant="circular" />
            <AccountInfo>
              <AccountNameSkeleton />
              <AccountAddressSkeleton />
            </AccountInfo>
          </AccountContainer>
        )}
      </TitleContainer>

      <InitialContainer>
        <InitialLabelSkeleton />
        <GenericValueContainer>
          <InitialValueSkeleton />
          <CurrencySkeleton />
        </GenericValueContainer>
      </InitialContainer>

      <InflowContainer>
        <InflowLabelSkeleton />
        <GenericValueContainer>
          <InflowSignSkeleton />
          <InflowValueSkeleton />
          <CurrencySkeleton />
        </GenericValueContainer>
      </InflowContainer>

      <OutflowContainer>
        <OutflowLabelSkeleton />
        <GenericValueContainer>
          <OutflowSignSkeleton />
          <OutflowValueSkeleton />
          <CurrencySkeleton />
        </GenericValueContainer>
      </OutflowContainer>

      <BalanceContainer>
        <BalanceLabelSkeleton />
        <GenericValueContainer>
          <BalanceValueSkeleton />
          <CurrencySkeleton />
        </GenericValueContainer>
      </BalanceContainer>
    </Card>
  );
};

export default ReserveCardSkeleton;

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? '#ffffff' : '#10191F',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const TitleContainer = styled('div')<{ isGroup: boolean }>(({ theme, isGroup }) => ({
  display: 'flex',
  padding: isGroup ? '24px 16px' : '19px 0px 14px 16px',
  width: '28.57%',

  [theme.breakpoints.up('desktop_1024')]: {
    width: '26.5487%',
    padding: isGroup ? '24px 16px' : '17.5px 0 18.75px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '25.338%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '22.8658%',
  },
}));

const AccountContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const GroupTitleSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 55,
  height: 10.5,
  marginTop: 3.5,
  marginBottom: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 200,
    height: 14,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 206,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 210,
  },
}));

const AccountAvatarSkeleton = styled(BaseSkeleton)({
  width: 32,
  height: 32,
});

const AccountInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 11.5,
  },
}));

const AccountNameSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 70,
  height: 12,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 89,
    height: 14,
  },
}));

const AccountAddressSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 78,
  height: 12,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 99,
    height: 12.25,
  },
}));

const InitialContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 2px 19.75px 2px',
  width: '17.013%',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 0 21px 16px',
    width: '16.77%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '17.145%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '17.911%',
  },
}));

const InitialLabelSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 72,
  height: 9.63,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 79,
    height: 10.5,
  },
}));

const GenericValueContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  marginTop: 12.37,

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 12.5,
  },
}));

const InitialValueSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 59,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 67,
    height: 14,
  },
}));

const CurrencySkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 23,
  height: 10.5,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 26,
    height: 12.25,
  },
}));

const InflowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 4px 8px 2px',
  padding: '8px 10px 11.5px 8px',
  width: '16.104%',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.30)',

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '8px 16px',
    padding: '8px 34.5px 12.75px 8px',
    width: '13.9%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '14.4%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '15.4%',
  },
}));

const InflowLabelSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 32,
  height: 9.63,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 35,
    height: 10.5,
  },
}));

const InflowSignSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 10,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 11,
    height: 14,
  },
}));

const InflowValueSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 61,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 70,
    height: 14,
  },
}));

const OutflowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '8px 2px',
  padding: '8px 13px 11.5px 8px',
  borderRadius: 6,
  background: 'rgba(236, 239, 249, 0.30)',

  [theme.breakpoints.up('desktop_1024')]: {
    margin: '8px 16px',
    padding: '8px 34.5px 12.75px 8px',
    width: '13.9%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: '14.4%',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '15.4%',
  },
}));

const OutflowLabelSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 41,
  height: 9.63,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 45,
    height: 10.5,
  },
}));

const OutflowSignSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 7,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 8,
    height: 14,
  },
}));

const OutflowValueSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 61,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 70,
    height: 14,
  },
}));

const BalanceContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '16px 49px 19.5px 0px',
  marginLeft: 'auto',

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 88.5px 21px 0px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 104px 21px 0px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 136px 21px 0px',
  },
}));

const BalanceLabelSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 68,
  height: 9.63,
  marginLeft: 'auto',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 75,
    height: 10.5,
  },
}));

const BalanceValueSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 59,
  height: 12.25,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 67,
    height: 14,
  },
}));
