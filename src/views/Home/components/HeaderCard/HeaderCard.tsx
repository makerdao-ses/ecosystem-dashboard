import { Button, IconButton, styled, useMediaQuery } from '@mui/material';

import BarChartLineIcon from 'public/assets/svg/bar_chart_line.svg';
import ArrowCollapseIcon from 'public/assets/svg/fusion_arrow_collapse.svg';
import ArrowExpandIcon from 'public/assets/svg/fusion_arrow_expand.svg';
import MapIcon from 'public/assets/svg/map.svg';
import MegaphoneIcon from 'public/assets/svg/megaphone.svg';
import PersonSquareIcon from 'public/assets/svg/person_square.svg';

import React from 'react';

import { headerCardData } from '@/views/Home/staticData';
import useHeaderCard from './useHeaderCard';

import type { Theme, ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface StyledButtonsContainerProps {
  isExpanded: boolean;
}
interface StyledButtonProps extends ButtonProps {
  boxShadow: string;
}

const HeaderCard: FC = () => {
  const { isExpanded, handleIsExpanded, handleActiveButtonIndex } = useHeaderCard();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <Container>
      <ToggleButton
        aria-label={isExpanded ? 'Collapse' : 'Expand'}
        disableRipple
        onClick={() => {
          handleIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? <ArrowCollapseIcon /> : <ArrowExpandIcon />}
      </ToggleButton>
      {isExpanded && <Title>{headerCardData.title}</Title>}
      {isExpanded && <Description>{headerCardData.description}</Description>}
      {isMobile ? (
        <MobileButtons isExpanded={isExpanded} />
      ) : (
        <Buttons isExpanded={isExpanded}>
          <HeaderButton
            endIcon={<BarChartLineIcon />}
            boxShadow="1px 4px 15px 0px #135324"
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(0);
            }}
          >
            {headerCardData.buttonTexts[0]}
          </HeaderButton>
          <HeaderButton
            endIcon={<MegaphoneIcon />}
            boxShadow="1px 4px 15px 0px rgba(188, 153, 242, 0.50)"
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(1);
            }}
          >
            {headerCardData.buttonTexts[1]}
          </HeaderButton>
          <HeaderButton
            endIcon={<PersonSquareIcon />}
            boxShadow="1px 4px 15px 0px rgba(25, 144, 255, 0.50)"
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(2);
            }}
          >
            {headerCardData.buttonTexts[2]}
          </HeaderButton>
          <HeaderButton
            endIcon={<MapIcon />}
            boxShadow="1px 4px 15px 0px rgba(234, 67, 53, 0.50)"
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(3);
            }}
          >
            {headerCardData.buttonTexts[3]}
          </HeaderButton>
        </Buttons>
      )}
    </Container>
  );
};

export default HeaderCard;

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px 24px',
  borderRadius: 12,
  backgroundOrigin: 'padding-box',
  backgroundPosition: '68% 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage: theme.palette.isLight
    ? 'url(/assets/img/home/header-card-background-light.jpg)'
    : 'url(/assets/img/home/header-card-background-dark.jpg)',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '32px 24px',
    backgroundPosition: '28% 50%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: 32,
    backgroundPosition: '50% 68%',
  },
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  width: 24,
  height: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 4,
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? 'rgba(197, 199, 199, 0.20)' : 'rgba(243, 245, 247, 0.20)',

  '&:hover, &:active, &:focus': {
    backgroundColor: theme.palette.isLight ? 'rgba(197, 199, 199, 0.20)' : 'rgba(243, 245, 247, 0.20)',
  },

  '& > svg path': {
    fill: theme.palette.isLight ? '#9EA0A1' : '#F3F5F7',
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

const MobileButtons = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<StyledButtonsContainerProps>(({ theme, isExpanded }) => ({
  height: 40,
  display: 'flex',
  flexDirection: 'column',
  marginTop: isExpanded ? 24 : 0,
  border: `1px solid ${theme.palette.colors.slate[50]}`,
  borderRadius: 12,
  backgroundColor: '#1E1D21',
  boxShadow: '1px 4px 15px 0px #135324',
}));

const Buttons = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<StyledButtonsContainerProps>(({ theme, isExpanded }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: isExpanded ? 40 : 0,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: isExpanded ? 32 : 0,
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
