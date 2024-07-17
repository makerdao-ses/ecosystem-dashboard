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
  isExpanded: boolean | undefined;
}
interface StyledButtonProps extends ButtonProps {
  active: boolean;
  boxShadow: string;
}

const HeaderCard: FC = () => {
  const { isExpanded, handleIsExpanded, activeButtonIndex, handleActiveButtonIndex } = useHeaderCard();

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
            active={activeButtonIndex === 0}
            boxShadow={`1px 4px 15px 0px rgba(19, 83, 36, ${activeButtonIndex === 0 ? 1 : 0.5})`}
            endIcon={<BarChartLineIcon />}
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(0);
            }}
          >
            {headerCardData.buttonTexts[0]}
          </HeaderButton>
          <HeaderButton
            active={activeButtonIndex === 1}
            boxShadow={`1px 4px 15px 0px rgba(188, 153, 242, ${activeButtonIndex === 1 ? 0.5 : 0.2})`}
            endIcon={<MegaphoneIcon />}
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(1);
            }}
          >
            {headerCardData.buttonTexts[1]}
          </HeaderButton>
          <HeaderButton
            active={activeButtonIndex === 2}
            boxShadow={`1px 4px 15px 0px rgba(25, 144, 255, ${activeButtonIndex === 2 ? 0.5 : 0.2})`}
            endIcon={<PersonSquareIcon />}
            disableRipple
            onClick={() => {
              handleActiveButtonIndex(2);
            }}
          >
            {headerCardData.buttonTexts[2]}
          </HeaderButton>
          <HeaderButton
            active={activeButtonIndex === 3}
            boxShadow={`1px 4px 15px 0px rgba(234, 67, 53, ${activeButtonIndex === 3 ? 0.5 : 0.2})`}
            endIcon={<MapIcon />}
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
  backgroundImage: 'url(/assets/img/home/header-card-background-dark.jpg)',

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
  backgroundColor: 'rgba(243, 245, 247, 0.20)',

  '&:hover, &:active, &:focus': {
    backgroundColor: 'rgba(243, 245, 247, 0.20)',
  },

  '& > svg path': {
    fill: theme.palette.colors.slate[50],
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
  padding: '8px 16px',
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
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'boxShadow',
})<StyledButtonProps>(({ theme, active, boxShadow }) => ({
  minWidth: 146,
  height: 40,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 8,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  textTransform: 'none',
  border: `1px solid ${theme.palette.colors.slate[active ? 50 : 200]}`,
  borderRadius: 12,
  color: theme.palette.colors.slate[active ? 50 : 200],
  backgroundColor: '#1E1D21',
  boxShadow,

  '& .MuiButton-endIcon': {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    marginRight: 0,

    '& > svg path': {
      fill: theme.palette.colors.slate[active ? 50 : 200],
    },
  },

  '&:hover, &:active, &:focus': {
    backgroundColor: '#1E1D21',
    boxShadow,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 210,
    height: 54,
    padding: '15px 16px 15px 24px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 260,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '21.6px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    minWidth: 288,
    padding: '16px 24px',
  },
}));
