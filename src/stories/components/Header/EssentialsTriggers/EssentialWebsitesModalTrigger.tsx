import styled from '@emotion/styled';
import { Modal, useMediaQuery } from '@mui/material';
import { ThreeDots } from '@ses/components/svg/three-dots';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useCallback, useEffect, useState } from 'react';
import EssentialWebsites from '../EssentialWebsites/EssentialWebsites';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const EssentialWebsitesModalTrigger: React.FC = () => {
  const { isLight } = useThemeContext();
  const [open, setOpen] = useState<boolean>(false);
  const isUpTablet = useMediaQuery(lightTheme.breakpoints.up('table_834'));

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (isUpTablet && open) {
      handleClose();
    }
  }, [isUpTablet, open, handleClose]);

  return (
    <div>
      <ThreeDotsButton isLight={isLight} onClick={handleOpen}>
        {<ThreeDots fill="#231536" fillDark="#EDEFFF" />}
      </ThreeDotsButton>
      <Modal open={open} onClose={handleClose}>
        <Container isLight={isLight}>
          <Wrapper>
            <EssentialWebsites showButtons={true} handleClose={handleClose} />
          </Wrapper>
        </Container>
      </Modal>
    </div>
  );
};

export default EssentialWebsitesModalTrigger;

const ThreeDotsButton = styled.button<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #31424E;',
  borderRadius: '50%',
  cursor: 'pointer',
}));

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? 'white' : '#000a13',
  padding: '22px 22px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  overflowY: 'auto',
}));

const Wrapper = styled.div({
  maxWidth: 534,
});
