import { styled } from '@mui/material';
import { Sheet } from 'react-modal-sheet';
import type { ReactNode } from 'react';

interface CustomSheetProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  initialSnap?: number;
  snapPoints?: number[];
  className?: string;
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  children,
  isOpen,
  handleClose,
  initialSnap = 1,
  snapPoints = [600, 400, 200, 0],
  className,
}) => (
  <SheetWrapper
    className={className}
    isOpen={isOpen}
    onClose={handleClose}
    snapPoints={snapPoints}
    initialSnap={initialSnap}
  >
    <SheetContainer>
      <Sheet.Header />
      <Sheet.Content>{children}</Sheet.Content>
    </SheetContainer>
    <Sheet.Backdrop onTap={handleClose} />
  </SheetWrapper>
);

export default CustomSheet;

const SheetWrapper = styled(Sheet)(({ theme, isOpen }) => ({
  backgroundColor: isOpen ? 'rgba(37, 42, 52, 0.10)' : 'none',
  backdropFilter: isOpen ? 'blur(2.5px)' : 'none',

  '& .react-modal-sheet-header': {
    alignItems: 'flex-start !important',
    marginTop: 6,
    height: '32px !important',
  },
  '& .react-modal-sheet-drag-indicator': {
    backgroundColor: `${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800]
    } !important`,
    width: '20px !important',
  },
}));

const SheetContainer = styled(Sheet.Container)(({ theme }) => ({
  borderTopRightRadius: '12px !important',
  borderTopLeftRadius: '12px !important',
  backgroundColor: `${theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900]} !important`,
  boxShadow: theme.palette.isLight
    ? '0px -4px 15px 0px rgba(74, 88, 115, 0.25)  !important'
    : '0px -4px 15px 0px rgba(10, 12, 15, 0.25) !important',
}));
