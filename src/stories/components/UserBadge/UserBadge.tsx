import { styled } from '@mui/material';
import ArrowSelect from 'public/assets/svg/arrow_select.svg';
import Login from 'public/assets/svg/login.svg';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';

interface Props {
  username?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  isOpen: boolean;
}

const UserBadge: React.FC<Props> = ({ onClick, username, style, isOpen }) => (
  <>
    <Container className="no-select" style={style} onClick={onClick}>
      <ContainerArrow>
        <ContainerIconLogin>
          <LoginContainerIcon>
            <Login />
          </LoginContainerIcon>
          <UserName>{username ?? 'Username'}</UserName>
        </ContainerIconLogin>

        <IconContainer isOpen={isOpen}>
          <ArrowSelect />
        </IconContainer>
      </ContainerArrow>
    </Container>

    <CircleAvatarStyledWithoutName name={username ?? 'Username'} onClick={onClick} />
  </>
);

export default UserBadge;

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  border: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #343442',
  borderRadius: 8,
  padding: '5px 8px 5px 8px',
  position: 'relative',
  display: 'none',

  alignItems: 'center',
  width: 'fit-content',
  height: 32,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[700] : theme.palette.colors.charcoal[100],
    color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  },
  ':disabled': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[900],
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[900],
      color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
    },
  },

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
}));

const UserName = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
}));

const CircleAvatarStyledWithoutName = styled(CircleAvatar)(({ theme }) => ({
  width: 35,
  height: 35,
  minWidth: 35,
  minHeight: 35,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#708390'}`,
  cursor: 'pointer',
  color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  fontSize: 14,
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const ContainerIconLogin = styled('div')({
  display: 'flex',

  gap: 8,
  alignItems: 'center',
});

const IconContainer = styled('div')<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  display: 'flex',
  width: 16,
  height: 6,
  transform: isOpen ? 'scaleY(-1)' : 'scaleY(1)',
  transition: 'transform 0.3s ease-in-out',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  },
}));

const LoginContainerIcon = styled('div')(({ theme }) => ({
  // width: 10.67,
  display: 'flex',
  width: 16,
  height: 16,
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  },
}));

const ContainerArrow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});
