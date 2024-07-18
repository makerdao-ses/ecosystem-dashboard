import { ClickAwayListener } from '@mui/base';
import { Button, IconButton, styled, useMediaQuery } from '@mui/material';

import BarChartLineIcon from 'public/assets/svg/bar_chart_line.svg';
import ArrowCollapseIcon from 'public/assets/svg/fusion_arrow_collapse.svg';
import ArrowExpandIcon from 'public/assets/svg/fusion_arrow_expand.svg';
import FusionArrowSelectDown from 'public/assets/svg/fusion_arrow_select_down.svg';
import FusionArrowSelectUp from 'public/assets/svg/fusion_arrow_select_up.svg';
import MapIcon from 'public/assets/svg/map.svg';
import MegaphoneIcon from 'public/assets/svg/megaphone.svg';
import PersonSquareIcon from 'public/assets/svg/person_square.svg';

import { headerCardData } from '@/views/Home/staticData';
import useHeaderCard from './useHeaderCard';

import type { Theme, ButtonProps } from '@mui/material';
import type { FC } from 'react';

interface StyledContainerProps {
  isExpanded: boolean | undefined;
  isMobileMenuExpanded?: boolean;
}
interface StyledButtonProps extends ButtonProps {
  index: number;
}

const HeaderCard: FC = () => {
  const { isExpanded, handleIsExpanded, isMobileMenuExpanded, handleIsMobileMenuExpanded } = useHeaderCard();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <Container isExpanded={isExpanded}>
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
        <ClickAwayListener
          onClickAway={() => {
            handleIsMobileMenuExpanded(false);
          }}
        >
          <MobileMenu
            isExpanded={isExpanded}
            isMobileMenuExpanded={isMobileMenuExpanded}
            onClick={() => {
              if (!isMobileMenuExpanded) {
                handleIsMobileMenuExpanded(true);
              }
            }}
          >
            <MobileHeaderButtonContainer
              onClick={() => {
                if (isMobileMenuExpanded) {
                  handleIsMobileMenuExpanded(false);
                }
              }}
            >
              <MobileHeaderButton disableRipple>{headerCardData.buttonTexts[0]}</MobileHeaderButton>
              {isMobileMenuExpanded ? <FusionArrowSelectUp /> : <FusionArrowSelectDown />}
            </MobileHeaderButtonContainer>
            {isMobileMenuExpanded && (
              <>
                <MobileHeaderButtonContainer>
                  <MobileHeaderButton
                    disableRipple
                    href={headerCardData.buttonLinks[1]}
                    onClick={() => {
                      handleIsMobileMenuExpanded(false);
                    }}
                  >
                    {headerCardData.buttonTexts[1]}
                  </MobileHeaderButton>
                </MobileHeaderButtonContainer>
                <MobileHeaderButtonContainer>
                  <MobileHeaderButton
                    disableRipple
                    href={headerCardData.buttonLinks[2]}
                    onClick={() => {
                      handleIsMobileMenuExpanded(false);
                    }}
                  >
                    {headerCardData.buttonTexts[2]}
                  </MobileHeaderButton>
                </MobileHeaderButtonContainer>
                <MobileHeaderButtonContainer>
                  <MobileHeaderButton
                    disableRipple
                    href={headerCardData.buttonLinks[3]}
                    onClick={() => {
                      handleIsMobileMenuExpanded(false);
                    }}
                  >
                    {headerCardData.buttonTexts[3]}
                  </MobileHeaderButton>
                </MobileHeaderButtonContainer>
              </>
            )}
          </MobileMenu>
        </ClickAwayListener>
      ) : (
        <Buttons isExpanded={isExpanded}>
          <HeaderButton index={0} endIcon={<BarChartLineIcon />} disableRipple>
            {headerCardData.buttonTexts[0]}
          </HeaderButton>
          <HeaderButton index={1} href={headerCardData.buttonLinks[1]} endIcon={<MegaphoneIcon />} disableRipple>
            {headerCardData.buttonTexts[1]}
          </HeaderButton>
          <HeaderButton index={2} href={headerCardData.buttonLinks[2]} endIcon={<PersonSquareIcon />} disableRipple>
            {headerCardData.buttonTexts[2]}
          </HeaderButton>
          <HeaderButton index={3} href={headerCardData.buttonLinks[3]} endIcon={<MapIcon />} disableRipple>
            {headerCardData.buttonTexts[3]}
          </HeaderButton>
        </Buttons>
      )}
    </Container>
  );
};

export default HeaderCard;

const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<StyledContainerProps>(({ theme, isExpanded }) => ({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: `${isExpanded ? 32 : 48}px 24px 88px`,
  borderRadius: 12,
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

const MobileMenu = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isMobileMenuExpanded',
})<StyledContainerProps>(({ theme, isExpanded, isMobileMenuExpanded }) => ({
  position: 'absolute',
  top: `calc(100% - ${isExpanded ? 64 : 88}px)`,
  width: 295,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: isMobileMenuExpanded ? '8px 16px 16px' : '8px 16px',
  border: `1px solid ${theme.palette.colors.slate[50]}`,
  borderRadius: 12,
  backgroundColor: '#1E1D21',
  boxShadow: headerCardData.buttonShadows[0],
}));

const MobileHeaderButtonContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const MobileHeaderButton = styled(Button)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  textTransform: 'none',
  borderRadius: 0,
  color: theme.palette.colors.slate[50],
  backgroundColor: '#1E1D21',
  cursor: 'default',

  '&:hover, &:active, &:focus': {
    backgroundColor: '#1E1D21',
  },
}));

const Buttons = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<StyledContainerProps>(({ theme, isExpanded }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: isExpanded ? 40 : 0,

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: isExpanded ? 32 : 0,
  },
}));

const HeaderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'index',
})<StyledButtonProps>(({ theme, index }) => ({
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
  border: `1px solid ${theme.palette.colors.slate[index === 0 ? 50 : 200]}`,
  borderRadius: 12,
  color: theme.palette.colors.slate[index === 0 ? 50 : 200],
  backgroundColor: '#1E1D21',
  boxShadow: headerCardData.buttonShadows[index * 2],

  '& .MuiButton-endIcon': {
    width: 24,
    height: 24,
    marginLeft: 'auto',
    marginRight: 0,

    '& > svg path': {
      fill: theme.palette.colors.slate[index === 0 ? 50 : 200],
    },
  },

  '&:hover': {
    color: theme.palette.colors.slate[50],
    backgroundColor: '#1E1D21',
    boxShadow: headerCardData.buttonShadows[index * 2 + 1],

    '& .MuiButton-endIcon > svg path': {
      fill: theme.palette.colors.slate[50],
    },
  },

  '&:active, &:focus': {
    backgroundColor: '#1E1D21',
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
