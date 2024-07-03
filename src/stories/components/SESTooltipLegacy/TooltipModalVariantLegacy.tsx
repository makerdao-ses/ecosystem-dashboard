import { styled } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import BasicModal from '@/components/AdvancedInnerTable/BasicModal/BasicModal';
import { Close } from '../svg/close';

interface TooltipModalVariantProps extends React.PropsWithChildren {
  openModal: boolean;
  handleCloseModal: () => void;
}

const TooltipModalVariantLegacy: React.FC<TooltipModalVariantProps> = ({ children, openModal, handleCloseModal }) => {
  const { isLight } = useThemeContext();

  return (
    <BasicModalExtended
      open={openModal}
      handleClose={handleCloseModal}
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
        <ContainerClose>
          <StyledClose onClick={handleCloseModal} />
        </ContainerClose>
        {children}
      </Container>
    </BasicModalExtended>
  );
};

export default TooltipModalVariantLegacy;

export const BasicModalExtended = styled(BasicModal)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  maxHeight: 748,
  // This to hidden border in safari
  outline: 'none',
  transform: 'translate(-50%, calc(-50% - 64px))',
  width: '100%',
});

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: 'auto',
  maxWidth: 'calc(100% - 32px)',
  background: theme.palette.mode === 'light' ? '#FFFFFF' : '#10191F',
  borderRadius: 6,
  margin: '0 auto',
  padding: '16px 24px 16px 16px',

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

const ContainerClose = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,

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
