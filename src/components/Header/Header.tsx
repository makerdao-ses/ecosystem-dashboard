/* eslint-disable */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';

import Toggle from '../Svg/Toggle';
import './Header.scss';
import FeedBack from '../Svg/FeedBack';
import Language from '../Svg/Language';
import ThemeMode from '../Svg/ThemeMode';
import { Typography } from '@mui/material';
import Logo from '../../stories/components/svg/Logo';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
}));

type Props = {
  open: boolean;
  setOpen: (o: boolean) => void;
};

const Header = ({ open, setOpen }: Props) => {
  const classes = useStyles();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar
      style={{ background: '#E5E5E5' }}
      elevation={0}
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <ContainerHeader>
        <LogoToggleContainer>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <ToggleContainer>
            <Toggle onClick={handleToggleDrawer} />
          </ToggleContainer>
        </LogoToggleContainer>
        <ContainerRight>
          <Links>
            <Typography fontSize={16} color='#000000'>Lorem Ipsum link</Typography>
          </Links>
          <Links>
            <Typography fontSize={16} color='#000000'>Lorem Ipsum link</Typography>
          </Links>
          <IconContainer>
            <div>
              <FeedBack />
            </div>
            <div>
              <Language />
            </div>
            <div>
              <ThemeMode />
            </div>
          </IconContainer>
        </ContainerRight>
      </ContainerHeader>
    </AppBar>
  );
};

const ContainerHeader = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '64px',
  backgroundColor: '#c4c4c4;'
})

const LogoToggleContainer = styled.div({
  height: '64px',
  width: '260px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#b6b6b6'
})

const LogoContainer = styled.div({
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#b6b6b6',
  marginLeft: '32px',
})

const ToggleContainer = styled.div({
  marginRight: '32px',
})

const ContainerRight = styled.div({
  display: 'flex',
  alignItems: 'center',
})

const Links = styled.div({
  width: '151px',
  height: '27px',
  backgroundColor: '#ededed',
  borderRadius: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '16px',
})


const IconContainer = styled.div({
  minWidth: '160px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginRight: '34px',
  padding: '5px'
})

export default Header;
