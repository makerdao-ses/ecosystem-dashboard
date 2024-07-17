import { styled, type Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileDetect from 'mobile-detect';
import Info from 'public/assets/svg/info_outlined.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { NumberCell } from '@/components/AdvancedInnerTable/NumberCell/NumberCell';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import Information from '@/components/icons/information';
import { zIndexEnum } from '@/core/enums/zIndexEnum';
import { useScrollLock } from '@/core/hooks/useScrollLock';
import { getPageWrapper } from '@/core/utils/dom';
import type { TargetBalanceTooltipInformation } from '@/core/utils/typesHelpers';
import ArrowPopoverTargetValueComponent from '@/views/CoreUnitBudgetStatement/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import ModalSheetValueContent from '../ModalSheet/ModalSheetValueContent';

export interface WithClick {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TargetValueThreeMoths = (data: TargetBalanceTooltipInformation) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobileResolution = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const { lockScroll, unlockScroll } = useScrollLock();
  const showIconToolTip = !!(data.description && data.link);

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

  const handleOnclose = () => {
    setIsOpen(false);
  };
  return (
    <BiggerContainer>
      <PopoverContainer>
        {!isMobileResolution && (
          <Container>
            {showIconToolTip && (
              <SESTooltipStyled
                content={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    name={data.name}
                  />
                }
              >
                <IconContainer>
                  <Info />
                </IconContainer>
              </SESTooltipStyled>
            )}
            <ContainerInformation hasIcon={!!data.months}>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
        {isMobileResolution && !isMobileDevice && (
          <Container>
            {showIconToolTip && (
              <SESTooltipStyled
                content={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    name={data.name}
                  />
                }
              >
                <IconContainer>
                  <Info />
                </IconContainer>
              </SESTooltipStyled>
            )}
            <ContainerInformation onClick={handleOnClick} hasIcon={!!data.months}>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
      </PopoverContainer>
      {isMobileResolution && (
        <PopoverContainer>
          {isMobileResolution && isMobileDevice && (
            <Container>
              {showIconToolTip && (
                <ContainerInfoIcon onClick={handleOnClick}>
                  <IconPosition />
                </ContainerInfoIcon>
              )}

              <ContainerInformation onClick={handleOnClick} hasIcon={!!data.months}>
                <ContainerNumberCell value={data.balance} />
                <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
              </ContainerInformation>
            </Container>
          )}
        </PopoverContainer>
      )}
      {isMobileResolution && isOpen && isMobileDevice && (
        <ModalSheet>
          <ModalSheetValueContent
            toolTipData={{
              description: data.description,
              link: data.link,
              mipNumber: data.mipNumber,
            }}
            name={data.name}
          />
        </ModalSheet>
      )}
      {isMobileResolution && isOpen && isMobileDevice && <ContainerOverlay onClick={handleOnclose} />}
    </BiggerContainer>
  );
};

const ContainerOverlay = styled('div')<WithClick>(({ onClick, theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: theme.palette.isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: theme.palette.isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  cursor: onClick ? 'default' : undefined,
}));

const ModalSheet = styled('div')({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const PopoverContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
}));
const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: -8,
  marginRight: 0,
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: -12,
    width: '100%',
    flexDirection: 'row-reverse',
    marginLeft: 0,
    marginTop: 0,
  },
}));

export const ContainerInfoIcon = styled('div')({
  position: 'relative',
});

const IconPosition = styled(Information)(({ theme }) => ({
  position: 'absolute',
  top: -14,
  left: -14,
  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    top: -8,
    left: -10,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'center',

    top: -8,
    left: 4,
  },
}));

const ContainerInformation = styled('div')<{ hasIcon?: boolean }>(({ theme, hasIcon }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginRight: 0,
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: hasIcon ? 12.5 : 30,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: hasIcon ? 12.5 : 30,
  },
}));

const ContainerNumberCell = styled(NumberCell)(({ theme }) => ({
  paddingBottom: 2,
  paddingTop: 0,

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
}));

const ContainerStyleMonths = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('tablet_768')]: {
    whiteSpace: 'nowrap',
  },
}));

export const TotalTargetBalance = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'flex-end',
  textAlign: 'center',
  fontWeight: 700,
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: 16,
  },
}));

const BiggerContainer = styled('div')({
  width: '100%',
});

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
  cursor: 'pointer',
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },
}));
