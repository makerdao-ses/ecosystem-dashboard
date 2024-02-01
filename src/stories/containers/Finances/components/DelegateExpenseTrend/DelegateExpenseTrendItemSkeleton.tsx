import { Skeleton, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

const DelegateExpenseTrendItemSkeleton = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  const avatar = (
    <AvatarContainer>
      <Skeleton variant="circular" width={40} height={40} />
      <IconSkeleton variant="circular" width={22} height={22} />
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
          </DataContainer>

          {footer}
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
  background: theme.palette.mode === 'light' ? '#fff' : 'red',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px red, 0px 20px 40px 0px red',
  border: `1px solid ${theme.palette.mode === 'light' ? '#ECEFF9' : 'red'}`,
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
}));

const DataContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
}));

const AvatarContainer = styled('div')(() => ({
  position: 'relative',
  width: 47,
  minWidth: 47,
  height: 47,
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
      : '0px 1px 3px 0px red, 0px 5px 10px 0px red',
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
  background: theme.palette.mode === 'light' ? '#F5F6FB' : 'red',
  margin: '-8px -16px 0',
  padding: '10px 16px',
}));

const ContributorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 12.75,
  width: 250,
}));

const ContributorInfo = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));
