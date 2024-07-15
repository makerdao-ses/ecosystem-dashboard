import { Button, styled, useMediaQuery } from '@mui/material';
import BarChartLineIcon from 'public/assets/svg/bar_chart_line.svg';
import MapIcon from 'public/assets/svg/map.svg';
import MegaphoneIcon from 'public/assets/svg/megaphone.svg';
import PersonSquareIcon from 'public/assets/svg/person_square.svg';
import React from 'react';
import { headerCardData } from '@/views/Home/staticData';
import type { Theme, ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface StyledButtonProps extends ButtonProps {
  boxShadow: string;
}

const HeaderCard: FC = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <Container>
      <Title>{headerCardData.title}</Title>
      <Description>{headerCardData.description}</Description>
      {isMobile ? (
        <MobileButtons>Mobile</MobileButtons>
      ) : (
        <Buttons>
          <HeaderButton endIcon={<BarChartLineIcon />} boxShadow="1px 4px 15px 0px #135324" disableRipple>
            {headerCardData.buttonTexts[0]}
          </HeaderButton>
          <HeaderButton
            endIcon={<MegaphoneIcon />}
            boxShadow="1px 4px 15px 0px rgba(188, 153, 242, 0.50)"
            disableRipple
          >
            {headerCardData.buttonTexts[1]}
          </HeaderButton>
          <HeaderButton
            endIcon={<PersonSquareIcon />}
            boxShadow="1px 4px 15px 0px rgba(25, 144, 255, 0.50)"
            disableRipple
          >
            {headerCardData.buttonTexts[2]}
          </HeaderButton>
          <HeaderButton endIcon={<MapIcon />} boxShadow="1px 4px 15px 0px rgba(234, 67, 53, 0.50)" disableRipple>
            {headerCardData.buttonTexts[3]}
          </HeaderButton>
        </Buttons>
      )}
    </Container>
  );
};

export default HeaderCard;

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px 24px',
  borderRadius: 12,
  backgroundOrigin: 'padding-box',
  backgroundPosition: '68% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage: 'url(/assets/img/home/header-card-background.jpg)',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '32px 24px',
    backgroundPosition: '28% 50%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 32,
    backgroundPosition: '50% 68%',
  },
}));

const Title = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '24px',
  color: theme.palette.colors.gray[50],

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    lineHeight: '28.8px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));

const Description = styled('p')(({ theme }) => ({
  margin: '16px 0 0',
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    width: 675,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const MobileButtons = styled('div')(({ theme }) => ({
  height: 40,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  border: `1px solid ${theme.palette.colors.slate[50]}`,
  borderRadius: 12,
  backgroundColor: '#1E1D21',
  boxShadow: '1px 4px 15px 0px #135324',

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const Buttons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 40,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const HeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'boxShadow',
})<StyledButtonProps>(({ theme, boxShadow }) => ({
  minWidth: 123,
  height: 40,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 8,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  textTransform: 'none',
  border: `1px solid ${theme.palette.colors.slate[50]}`,
  borderRadius: 12,
  color: theme.palette.colors.slate[50],
  backgroundColor: '#1E1D21',
  boxShadow,

  '& .MuiButton-endIcon': {
    width: 24,
    height: 24,
    marginLeft: 13,
    marginRight: 0,
  },

  '&:hover, &:active, &:focus': {
    backgroundColor: '#1E1D21',
    boxShadow,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 199.33,
    height: 56,
    padding: 16,

    '& .MuiButton-endIcon': {
      marginLeft: 24,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 260,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',

    '& .MuiButton-endIcon': {
      marginLeft: 'auto',
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 288,
    height: 54,
    padding: '16px 24px',
  },
}));
