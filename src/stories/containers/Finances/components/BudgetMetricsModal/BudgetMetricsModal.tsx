import { styled } from '@mui/material';
import BasicModal from '@ses/components/BasicModal/BasicModal';
import { Close } from '@ses/components/svg/close';
import { useBudgetMetricsModalContext } from '@ses/core/context/BudgetMetricsModalContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import SimpleBar from 'simplebar-react';

const BudgetMetricsModal: React.FC = () => {
  const { isLight } = useThemeContext();
  const { openModal, handleOpenModal } = useBudgetMetricsModalContext();

  return (
    <BasicModalExtended
      open={openModal}
      handleClose={handleOpenModal}
      slotProps={{
        backdrop: {
          sx: {
            background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1)',
            backdropFilter: isLight ? 'blur(4px);' : 'blur(4px)',
          },
        },
      }}
    >
      <Container>
        <Header>
          <ContainerTitle>
            <Title>Budget</Title>
            <ContainerClose>
              <StyledClose onClick={handleOpenModal} />
            </ContainerClose>
          </ContainerTitle>
          <ContainerDescription>
            <Description>An estimate of income and expenditure for a set period.</Description>
          </ContainerDescription>
        </Header>
        <ContainerScroll>
          <SimpleBarStyled scrollbarMaxSize={64}>
            <InsideModal>
              <MetricItem>
                <MetricTitle>Budget Cap</MetricTitle>
                <MetricDescription>
                  The maximum amount allocated for a specific budget category or project.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Forecast</MetricTitle>
                <MetricDescription>
                  Predicted financial outcomes based on current data and trends for a future period.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Actuals</MetricTitle>
                <MetricDescription>
                  The actual amount spent or received, compared against budgeted figures.
                </MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Payments On-Chain</MetricTitle>
                <MetricDescription>Transactions (expenses) made directly on the blockchain.</MetricDescription>
              </MetricItem>

              <MetricItem>
                <MetricTitle>Payments Off-Chain Incl</MetricTitle>
                <MetricDescription>
                  Transactions (expenses) processed outside the blockchain network. similar to the way we do the expense
                  categories on the home page.
                </MetricDescription>
              </MetricItem>
            </InsideModal>
          </SimpleBarStyled>
        </ContainerScroll>
      </Container>
    </BasicModalExtended>
  );
};

export default BudgetMetricsModal;

const BasicModalExtended = styled(BasicModal)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  height: 'calc(100% - 64px)',
  maxHeight: '100%',
  marginTop: 64,
  marginBottom: 0,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translateX(-50%)',
  width: 'max(100%, 375px)',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'max(90%, 770px)',
    height: 'calc(100% - 128px)',
    marginBottom: 64,
    maxHeight: 558,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 729,
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  height: '100%',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#10191F',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  paddingBottom: 16,

  '::-webkit-scrollbar': {
    width: '1px',
  },

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: '16px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 729,
    paddingBottom: 32,
  },
}));

const Header = styled('div')(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 19,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#10191F',
  boxShadow:
    theme.palette.mode === 'light'
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : ' 10px 15px 20px 6px rgba(20, 0, 141, 0.1)',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 19,

  [theme.breakpoints.up('tablet_768')]: {
    height: 29,
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '19px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
  },
}));

const Description = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 435,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
    alignItems: 'baseline',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 625,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 725,
  },
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 19,
  alignItems: 'flex-end',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
  },
}));

const ContainerClose = styled('div')(({ theme }) => ({
  paddingRight: 3,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 6,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 3,
  },
}));

const StyledClose = styled(Close)(({ theme }) => ({
  width: 14,
  height: 14,

  [theme.breakpoints.up('tablet_768')]: {
    width: 20,
    height: 20,
  },
}));

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  height: '100%',

  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 4,
    background: '#1aab9b',
    borderRadius: 20,
  },

  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: 813,

    '.simplebar-scrollbar::before': {
      width: 6,
    },
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: 847,
  },
}));

const InsideModal = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  padding: '16px 16px 0',

  [theme.breakpoints.up('tablet_768')]: {
    padding: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '32px 40px 0',
  },
}));

const ContainerScroll = styled('div')(() => ({
  height: '100%',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    width: '1px',
  },
}));

const MetricItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

const MetricTitle = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
  fontStyle: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));

const MetricDescription = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  fontStyle: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
