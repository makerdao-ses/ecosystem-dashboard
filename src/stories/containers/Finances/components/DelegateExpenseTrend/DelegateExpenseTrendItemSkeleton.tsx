import { Skeleton, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

const DelegateExpenseTrendItemSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const avatar = (
    <AvatarContainer>
      <Skeleton variant="circular" width={isMobile || isTablet ? 40 : 33} height={isMobile || isTablet ? 40 : 33} />
      <IconSkeleton variant="circular" width={isMobile || isTablet ? 22 : 20} height={isMobile || isTablet ? 22 : 20} />
    </AvatarContainer>
  );
  const footer = (
    <FooterContainer>
      <Skeleton variant="rounded" width={105} height={10.5} />
      <Skeleton variant="rounded" width={84} height={12.25} />
    </FooterContainer>
  );

  return (
    <ItemContainer>
      {isMobile && (
        <ContentContainer>
          <DataContainer>
            {avatar}
            <MobileNameContainer>
              <NameContainer>
                <Skeleton variant="rounded" width={28} height={12.25} />
                <Skeleton variant="rounded" width={130} height={12.25} />
              </NameContainer>

              <Skeleton variant="rounded" width={98} height={26} />
            </MobileNameContainer>
            <ViewButton>
              <Skeleton variant="rounded" width={19} height={14} />
            </ViewButton>
          </DataContainer>

          <ValuesContainer>
            <ValueSet>
              <Skeleton variant="rounded" width={88} height={9.63} />
              <Skeleton variant="rounded" width={82} height={12.25} />
            </ValueSet>
            <ValueSet>
              <Skeleton variant="rounded" width={68} height={9.63} />
              <Skeleton variant="rounded" width={97} height={12.25} />
            </ValueSet>
          </ValuesContainer>

          {footer}
        </ContentContainer>
      )}
      {isTablet && (
        <ContentContainer>
          <DataContainer>
            <ContributorContainer>
              <Skeleton variant="rounded" width={113} height={12.25} />
              <ContributorInfo>
                {avatar}
                <NameContainer>
                  <Skeleton variant="rounded" width={28} height={12.25} />
                  <Skeleton variant="rounded" width={132} height={12.25} />
                </NameContainer>
              </ContributorInfo>
            </ContributorContainer>
            <ValueSet>
              <Skeleton variant="rounded" width={112} height={12.25} />
              <Skeleton variant="rounded" width={82} height={16} />
            </ValueSet>
            <ValueSet>
              <Skeleton variant="rounded" width={86} height={12.25} />
              <Skeleton variant="rounded" width={97} height={16} />
            </ValueSet>
            <StatusContainer>
              <Skeleton variant="rounded" width={43} height={12.25} />
              <Skeleton variant="rounded" width={98} height={26} />
            </StatusContainer>
            <ViewButton>
              <Skeleton variant="rounded" width={32} height={32} style={{ borderRadius: 6 }} />
            </ViewButton>
          </DataContainer>

          {footer}
        </ContentContainer>
      )}
      {!isMobile && !isTablet && (
        <ContentContainer>
          <ContributorInfo>
            {avatar}
            <NameContainer>
              <Skeleton variant="rounded" width={28} height={12.25} />
              <Skeleton variant="rounded" width={132} height={12.25} />
            </NameContainer>
          </ContributorInfo>
          <ReportingMonthContainer>
            <Skeleton variant="rounded" width={82} height={16} />
          </ReportingMonthContainer>
          <ValueContainer>
            <Skeleton variant="rounded" width={97} height={16} />
          </ValueContainer>
          <StatusContainer>
            <Skeleton variant="rounded" width={98} height={26} />
          </StatusContainer>
          <LastUpdateContainer>
            <Skeleton variant="rounded" width={124} height={16} />
          </LastUpdateContainer>
          <ViewButton>
            <Skeleton variant="rounded" width={46} height={16} />
          </ViewButton>
        </ContentContainer>
      )}
    </ItemContainer>
  );
};

export default DelegateExpenseTrendItemSkeleton;

const ItemContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 16px 0',
  borderRadius: 6,
  background: theme.palette.mode === 'light' ? '#fff' : '#10191F',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  border: theme.palette.mode === 'light' ? '1px solid #ECEFF9' : 'none',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 0 16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 32,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
}));

const DataContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'space-between',
  },
}));

const AvatarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 47,
  minWidth: 47,
  height: 47,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 39,
    minWidth: 39,
    height: 38,
  },
}));

const IconSkeleton = styled(Skeleton)(() => ({
  boxShadow: '-1px 1px 3px 0px rgba(135, 135, 135, 0.25)',
  position: 'absolute',
  bottom: 0,
  right: 0,
}));

const MobileNameContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12.75,
  width: '100%',
}));

const NameContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const ViewButton = styled('div')(({ theme }) => ({
  width: 32,
  minWidth: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
      : '0px 2px 3px 0px #040C27',

  [theme.breakpoints.up('tablet_768')]: {
    boxShadow: 'none',
    width: 48,
    height: 63,
    background: theme.palette.mode === 'light' ? '#F9FAFF' : '#262b41',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 82,
    minWidth: 82,
    height: 34,
    borderRadius: 22,
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 1px 3px rgba(190, 190, 190, 0.25), 0px 5px 10px rgba(219, 227, 237, 0.40)'
        : '0px 2px 3px 0px #040C27',
    background: theme.palette.mode === 'light' ? '#FFF' : '#10191F',
  },
}));

const ValuesContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 32px 4.75px',
}));

const ValueSet = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 11.37,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 23.75,
    paddingBottom: 11,
    width: 130,
  },
}));

const FooterContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: 'calc(100% + 32px)',
  borderRadius: 6,
  background: theme.palette.mode === 'light' ? '#F5F6FB' : '#25273D',
  margin: '-8px -16px 0',
  padding: '10px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'calc(100% + 24px)',
    padding: '6px 10px 6.75px',
    margin: '-8px -8px 0 -16px',
  },
}));

const ContributorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12.75,
  width: 250,
}));

const ContributorInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 300,
  },
}));

const StatusContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 18.75,
  paddingBottom: 6,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 120,
    paddingBottom: 0,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    width: 150,
    paddingLeft: 14,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 8,
  },
}));

const ReportingMonthContainer = styled('div')(({ theme }) => ({
  width: 120,

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: -16,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: -36,
    marginRight: 16,
  },
}));

const ValueContainer = styled('div')(() => ({
  width: 130,
}));

const LastUpdateContainer = styled('div')(() => ({
  width: 160,
}));
