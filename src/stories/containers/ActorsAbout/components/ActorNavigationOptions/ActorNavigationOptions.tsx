import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { ThreeDots } from '@ses/components/svg/three-dots';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import React, { useEffect, useId } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ActorNavigationOptionsProps {
  shortCode: string;
  budgetPath: string;
}

const ActorNavigationOptions: React.FC<ActorNavigationOptionsProps> = ({ shortCode, budgetPath }) => {
  const { isLight } = useThemeContext();
  const id = useId();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // close the popover when the user scrolls
    const handleScroll = () => handleClose();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <ThreeDotsButton isLight={isLight} onClick={handleClick}>
        {<ThreeDots fill="#231536" fillDark="#EDEFFF" />}
      </ThreeDotsButton>
      <OptionsPopover
        isLight={isLight}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <BtnContainer>
          <OptionLink
            href={siteRoutes.ecosystemActorProjects(shortCode)}
            isLight={isLight}
            buttonType={ButtonType.Default}
            widthText="100%"
            label="Projects"
          />
          <OptionLink
            href={siteRoutes.ecosystemActorReports(shortCode)}
            isLight={isLight}
            buttonType={ButtonType.Default}
            widthText="100%"
            label="Budget Statements"
          />
          <OptionLink
            href={`/finances/${budgetPath}`}
            isLight={isLight}
            buttonType={ButtonType.Default}
            widthText="100%"
            label="Finances"
          />
        </BtnContainer>
      </OptionsPopover>
    </React.Fragment>
  );
};

export default ActorNavigationOptions;

const ThreeDotsButton = styled.button<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  borderRadius: '50%',
  cursor: 'pointer',
}));

const OptionsPopover = styled(Popover)<WithIsLight>(({ isLight }) => ({
  '.MuiPaper-root': {
    backgroundColor: isLight ? '#fff' : '#10191F',
    boxShadow: isLight
      ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
    padding: 16,
  },

  '.MuiPaper-rounded': {
    borderRadius: '6px!important', // override paper rounded default
  },
}));

const BtnContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
});

const OptionLink = styled(LinkButton)<WithIsLight>(({ isLight }) => ({
  padding: '7px 23px',
  display: 'flex',
  width: '100%',
  textAlign: 'center',
  border: `1px solid ${isLight ? '#25273D' : '#00585E'}`,

  '& > div': {
    color: isLight ? '#231536' : '#68FEE3',
  },
}));
