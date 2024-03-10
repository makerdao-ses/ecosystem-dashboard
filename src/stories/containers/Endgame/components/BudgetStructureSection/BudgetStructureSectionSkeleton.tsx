import { Skeleton, styled, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';

const BudgetStructureSectionSkeleton: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('tablet_768', 'desktop_1024'));

  return (
    <Card>
      <Content>
        <TotalContainer>
          <TotalNumber>
            <Skeleton variant="rounded" width={196} height={30} />
            <Skeleton variant="rounded" width={42} height={24} />
          </TotalNumber>
          <Skeleton variant="rounded" width={200} height={12} />
        </TotalContainer>

        <Divider />

        <LegendContainer>
          <LegendItem>
            <Skeleton variant="circular" width={8} height={8} />
            <Skeleton variant="rounded" width={79} height={12.5} />
          </LegendItem>
          <LegendItem>
            <Skeleton variant="circular" width={8} height={8} />
            <Skeleton variant="rounded" width={50} height={12.5} />
          </LegendItem>
        </LegendContainer>
        <Skeleton variant="rounded" width={'100%'} height={16} />
        <NumbersContainer>
          <Skeleton variant="rounded" width={50} height={12.5} />
          <Skeleton variant="rounded" width={79} height={12.5} />
        </NumbersContainer>

        <Skeleton variant="rounded" width={'100%'} height={33} style={{ marginTop: 32 }} />
      </Content>
      <BudgetCompositionContainer>
        <Skeleton variant="rounded" width={180} height={12.5} />

        <ChartContainer>
          <SVG
            width={isMobile || isTablet ? 129 : 192}
            height={isMobile || isTablet ? 129 : 192}
            viewBox="0 0 129 129"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_29432_144440" fill="white">
              <path d="M128.489 64.4307C128.489 99.7769 99.8357 128.431 64.4895 128.431C29.1432 128.431 0.489471 99.7769 0.489471 64.4307C0.489471 29.0844 29.1432 0.430664 64.4895 0.430664C99.8357 0.430664 128.489 29.0844 128.489 64.4307ZM32.4895 64.4307C32.4895 82.1038 46.8164 96.4307 64.4895 96.4307C82.1626 96.4307 96.4895 82.1038 96.4895 64.4307C96.4895 46.7576 82.1626 32.4307 64.4895 32.4307C46.8164 32.4307 32.4895 46.7576 32.4895 64.4307Z" />
            </mask>
            <path
              d="M128.489 64.4307C128.489 99.7769 99.8357 128.431 64.4895 128.431C29.1432 128.431 0.489471 99.7769 0.489471 64.4307C0.489471 29.0844 29.1432 0.430664 64.4895 0.430664C99.8357 0.430664 128.489 29.0844 128.489 64.4307ZM32.4895 64.4307C32.4895 82.1038 46.8164 96.4307 64.4895 96.4307C82.1626 96.4307 96.4895 82.1038 96.4895 64.4307C96.4895 46.7576 82.1626 32.4307 64.4895 32.4307C46.8164 32.4307 32.4895 46.7576 32.4895 64.4307Z"
              fill="#ECF1F3"
              stroke="#ECF1F3"
              strokeWidth="1.33333"
              mask="url(#path-1-inside-1_29432_144440)"
            />
            <mask id="path-2-inside-2_29432_144440" fill="white">
              <path d="M128.489 64.4307C128.489 49.8987 123.544 35.7993 114.466 24.4515L89.4778 44.4411C94.0167 50.115 96.4895 57.1647 96.4895 64.4307H128.489Z" />
            </mask>
            <path
              d="M128.489 64.4307C128.489 49.8987 123.544 35.7993 114.466 24.4515L89.4778 44.4411C94.0167 50.115 96.4895 57.1647 96.4895 64.4307H128.489Z"
              fill="#B6BCC2"
              stroke="#B6BCC2"
              strokeWidth="1.33333"
              mask="url(#path-2-inside-2_29432_144440)"
            />
            <mask id="path-3-inside-3_29432_144440" fill="white">
              <path d="M114.658 24.7431C104.742 12.2134 90.4971 3.84635 74.7244 1.28696C58.9517 -1.27244 42.7921 2.16095 29.4226 10.9121C16.053 19.6633 6.44069 33.0992 2.47534 48.5784C-1.49001 64.0575 0.47847 80.4601 7.99379 94.5615L36.2336 79.511C32.4759 72.4604 31.4917 64.2591 33.4743 56.5195C35.457 48.7799 40.2632 42.062 46.9479 37.6864C53.6327 33.3108 61.7125 31.5941 69.5989 32.8738C77.4852 34.1535 84.6076 38.337 89.5657 44.6019L114.658 24.7431Z" />
            </mask>
            <path
              d="M114.658 24.7431C104.742 12.2134 90.4971 3.84635 74.7244 1.28696C58.9517 -1.27244 42.7921 2.16095 29.4226 10.9121C16.053 19.6633 6.44069 33.0992 2.47534 48.5784C-1.49001 64.0575 0.47847 80.4601 7.99379 94.5615L36.2336 79.511C32.4759 72.4604 31.4917 64.2591 33.4743 56.5195C35.457 48.7799 40.2632 42.062 46.9479 37.6864C53.6327 33.3108 61.7125 31.5941 69.5989 32.8738C77.4852 34.1535 84.6076 38.337 89.5657 44.6019L114.658 24.7431Z"
              fill="#D1DEE6"
              stroke="#D1DEE6"
              strokeWidth="1.33333"
              mask="url(#path-3-inside-3_29432_144440)"
            />
          </SVG>

          <ChartLegendContainer>
            <ChartLegendItem>
              <ChartLegendLabel>
                <Skeleton variant="circular" width={8} height={8} />
                <Skeleton variant="rounded" width={135} height={12} />
              </ChartLegendLabel>
              <Skeleton variant="rounded" width={106} height={7} style={{ marginLeft: 12 }} />
            </ChartLegendItem>
            <ChartLegendItem>
              <ChartLegendLabel>
                <Skeleton variant="circular" width={8} height={8} />
                <Skeleton variant="rounded" width={143} height={12} />
              </ChartLegendLabel>
              <Skeleton variant="rounded" width={115} height={7} style={{ marginLeft: 12 }} />
            </ChartLegendItem>
            <ChartLegendItem>
              <ChartLegendLabel>
                <Skeleton variant="circular" width={8} height={8} />
                <Skeleton variant="rounded" width={156} height={12} />
              </ChartLegendLabel>
              <Skeleton variant="rounded" width={104} height={7} style={{ marginLeft: 12 }} />
            </ChartLegendItem>
          </ChartLegendContainer>
        </ChartContainer>
      </BudgetCompositionContainer>
    </Card>
  );
};

export default BudgetStructureSectionSkeleton;

const Card = styled('div')(({ theme }) => ({
  padding: '31px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  gap: 32,
  borderRadius: 6,
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(212, 217, 225, 0.25)' : '#31424E'}`,
  background: theme.palette.mode === 'light' ? '#FFF' : '#1E2C37',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px 0px rgba(7, 22, 40, 0.40)',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    padding: '23px 15px',
    gap: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 31,
    gap: 32,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '31px 0 31px 63px',
    gap: 64,
  },
}));

const Content = styled('div')(({ theme }) => ({
  padding: '0px 15px',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
    width: 272,
    minWidth: 272,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 350,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 387,
  },
}));

const TotalContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
}));

const TotalNumber = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 6,
}));

const Divider = styled('div')(({ theme }) => ({
  height: 1,
  width: 'calc(100% - 17px)',
  background: theme.palette.mode === 'light' ? '#ECF1F3' : '#31424E',
  margin: '24px 8.5px',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'calc(100% - 10px)',
    margin: '23px 5px 24px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'calc(100% - 94px)',
    margin: '23px 47px 24px',
  },
}));

const LegendContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 14,
}));

const LegendItem = styled('div')(() => ({
  display: 'flex',
  gap: 4,
  alignItems: 'center',
}));

const NumbersContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8,
}));

const BudgetCompositionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: 353,
  padding: '24px 16px 0px',
  backgroundColor: theme.palette.mode === 'light' ? 'rgba(236, 239, 249, 0.25)' : '#1E2C37',

  [theme.breakpoints.up('tablet_768')]: {
    alignSelf: 'center',
    height: 189,
    padding: 0,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1E2C37',
    borderLeft: `1px solid ${theme.palette.mode === 'light' ? '#D4D9E1' : '#31424E'}`,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    height: 241,
    paddingRight: 45,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 120,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 140,
  },
}));

const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
  marginTop: 24,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 48,
  },
}));

const SVG = styled('svg')({
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.4,
    },
    '100%': {
      opacity: 1,
    },
  },

  animation: 'pulse 2s ease-in-out 0.5s infinite',
});

const ChartLegendContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

const ChartLegendItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6.5,
}));

const ChartLegendLabel = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: 4,
}));
