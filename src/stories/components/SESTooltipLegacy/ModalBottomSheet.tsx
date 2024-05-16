import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ModalBottomSheetProps extends React.PropsWithChildren {
  open: boolean;
  content: React.ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}

const ModalBottomSheet: React.FC<ModalBottomSheetProps> = ({ children, content, open, handleOpen, handleClose }) => {
  const { isLight } = useThemeContext();

  return (
    <>
      {React.cloneElement(children as React.ReactElement, {
        onClick: handleOpen,
      })}

      {open && (
        <>
          <Overlay isLight={isLight} onClick={handleClose} />
          <ModalSheet>
            <Container isLight={isLight}>{content}</Container>
          </ModalSheet>
        </>
      )}
    </>
  );
};

export default ModalBottomSheet;

const Overlay = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
}));

const ModalSheet = styled.div({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: isLight ? 'white' : '#000A13',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '22px 22px 0px 0px',
  padding: 16,
}));
