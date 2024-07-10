import { styled, useMediaQuery } from '@mui/material';

import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import MobileDetect from 'mobile-detect';
import Info from 'public/assets/svg/info_outlined.svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import Information from '@/components/icons/information';
import HeaderToolTip from './TooltipHeader';
import type { Theme } from '@mui/material';

interface Props {
  description: string;
  mipNumber: string;
  link: string;
  name: string;
  title: string;
}

const HeaderWithIcon: React.FC<Props> = ({ title, description, mipNumber, link, name }) => {
  const showPopover = !!(name && mipNumber && link);

  const leaveTimeoutRef = useRef<NodeJS.Timeout>();
  const [isOpen, setIsOpen] = useState(false);
  const isMobileResolution = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    clearTimeout(leaveTimeoutRef.current);
  }, []);

  let md;
  if (typeof window !== 'undefined') {
    md = new MobileDetect(window.navigator?.userAgent);
  }

  const isMobileDevice = !!md?.mobile();

  useEffect(() => {
    if (isMobileDevice) {
      if (isOpen) {
        const pageWrapper = getPageWrapper();
        if (pageWrapper) {
          pageWrapper.style.overflow = 'hidden';
        }

        lockScroll();
      }
    }
    return () => {
      unlockScroll();
    };
  }, [isMobileDevice, isOpen, lockScroll, unlockScroll]);

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen]
  );

  return (
    <Container>
      {!isMobileResolution && (
        <ContainerTitleIcon>
          <Title style={{ marginRight: 8 }}>{title}</Title>

          {showPopover && (
            <SESTooltipStyled content={<HeaderToolTip description={description} link={link} name={name} />}>
              <IconContainer className="advance-table--transparency-card_icon_hidden">
                <Info />
              </IconContainer>
            </SESTooltipStyled>
          )}
        </ContainerTitleIcon>
      )}
      {isMobileResolution && !isMobileDevice && (
        <ContainerTitleIcon>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          {showPopover && (
            <SESTooltipStyled content={<HeaderToolTip description={description} link={link} name={name} />}>
              <IconContainer className="advance-table--transparency-card_icon_hidden">
                <Info />
              </IconContainer>
            </SESTooltipStyled>
          )}
        </ContainerTitleIcon>
      )}
      {isMobileResolution && isMobileDevice && (
        <>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          {showPopover && (
            <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden" onClick={handleOnClick}>
              <IconPosition />
            </ContainerInfoIcon>
          )}
        </>
      )}
    </Container>
  );
};

export default HeaderWithIcon;

export const ContainerInfoIcon = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const IconPosition = styled(Information)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'center',
  },
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 106,
  [theme.breakpoints.up('tablet_768')]: {
    justifyContent: 'flex-end',
    width: '100%',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  fontWeight: 600,
  lineHeight: '24px',
}));

const SESTooltipStyled = styled(SESTooltip)(({ theme }) => ({
  padding: 0,
  marginTop: 0,
  width: '100%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  minWidth: 327,
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
}));

const IconContainer = styled('div')(({ theme }) => ({
  width: 15,
  height: 15,
  display: 'flex',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
}));

const ContainerTitleIcon = styled('div')({
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
});
