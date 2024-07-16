import { styled, useMediaQuery } from '@mui/material';
import Card from '@/components/Card/Card';
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
    <CardReserves>
      <TitleContainer>
        {isGroup ? (
          <GroupTitleSkeleton />
        ) : (
          <AccountContainer>
            <AccountAvatarSkeleton />
            <AccountInfo>
              <AccountNameWrapper>
                <AccountNameSkeleton />
                <AccountNameIconSkeleton />
              </AccountNameWrapper>
              <AccountAddressWrapper>
                <AccountAddressSkeleton />
                <AccountAddressCopySkeleton />
              </AccountAddressWrapper>
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
          <InflowValueSkeleton />
        </GenericValueContainer>
      </InflowContainer>

      <OutflowContainer>
        <OutflowLabelSkeleton />
        <GenericValueContainer>
          <OutflowValueSkeleton />
        </GenericValueContainer>
      </OutflowContainer>

      <BalanceContainer>
        <BalanceLabelSkeleton />
        <GenericValueContainer>
          <BalanceValueSkeleton />
          <CurrencySkeleton />
        </GenericValueContainer>
      </BalanceContainer>

      <ArrowContainer>
        <Arrow
          isGroup={isGroup}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.69339 5.86308C4.85404 6.04564 5.14598 6.04564 5.30664 5.86308L9.90358 0.639524C10.1255 0.38735 9.93978 0 9.59696 0H0.403059C0.0602253 0 -0.125491 0.38735 0.0964331 0.639525L4.69339 5.86308Z" />
        </Arrow>
      </ArrowContainer>
    </CardReserves>
  );
};

export default ReserveCardSkeleton;

const CardReserves = styled(Card)(() => ({
  flexDirection: 'row',
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  width: 168,

  [theme.breakpoints.up('desktop_1024')]: {
    width: '200px',
    paddingLeft: 16,
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

const GroupTitleSkeleton = styled(BaseSkeleton)(() => ({
  width: 68,
  height: 24,
}));

const AccountAvatarSkeleton = styled(BaseSkeleton)({
  borderRadius: 8,
  height: 32,
  width: 32,
});

const AccountInfo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

const AccountNameWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));

const AccountAddressWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}));

const AccountNameSkeleton = styled(BaseSkeleton)(() => ({
  width: 45,
  height: 24,
}));

const AccountNameIconSkeleton = styled(BaseSkeleton)(() => ({
  width: 16,
  height: 16,
}));

const AccountAddressSkeleton = styled(BaseSkeleton)(() => ({
  width: 75,
  height: 22,
}));

const AccountAddressCopySkeleton = styled(BaseSkeleton)(() => ({
  width: 16,
  height: 16,
}));

const InitialContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '13px 2px',
  width: '14%',

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

const InitialLabelSkeleton = styled(BaseSkeleton)(() => ({
  width: 80,
  height: 18,
}));

const GenericValueContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
  marginTop: 2,
}));

const InitialValueSkeleton = styled(BaseSkeleton)(() => ({
  width: 65,
  height: 24,
}));

const CurrencySkeleton = styled(BaseSkeleton)(() => ({
  width: 24,
  height: 22,
}));

const InflowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 8,
  padding: '3px 7px 7px',
  minWidth: 'calc(16.7% - 4px)',
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,

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

const InflowLabelSkeleton = styled(BaseSkeleton)(() => ({
  width: 35,
  height: 18,
}));

const InflowValueSkeleton = styled(BaseSkeleton)(() => ({
  width: 88,
  height: 24,
}));

const OutflowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 8,
  padding: '3px 7px 7px',
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  minWidth: 'calc(16.7% - 4px)',

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

const OutflowLabelSkeleton = styled(BaseSkeleton)(() => ({
  width: 48,
  height: 18,
}));

const OutflowValueSkeleton = styled(BaseSkeleton)(() => ({
  width: 88,
  height: 24,
}));

const BalanceContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '13px 2px',
  marginLeft: 'auto',

  [theme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'center',
    padding: '8px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px 13px 16px',
    width: 'auto',
  },
}));

const BalanceLabelSkeleton = styled(BaseSkeleton)(() => ({
  width: 75,
  height: 18,
  marginLeft: 'auto',
}));

const BalanceValueSkeleton = styled(BaseSkeleton)(() => ({
  width: 65,
  height: 24,
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  width: 47,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 18.5px',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 48,
    minWidth: 48,
    padding: '8px 19px 8px 19px',
    justifyContent: 'center',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 106,
    minWidth: 106,
  },
}));

const Arrow = styled('svg')<{ isGroup: boolean }>(({ theme, isGroup }) => ({
  display: isGroup ? 'none' : 'block',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  },
}));
