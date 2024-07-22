import { styled, type Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileDetect from 'mobile-detect';
import Info from 'public/assets/svg/info_outlined.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { NumberCell } from '@/components/AdvancedInnerTable/NumberCell/NumberCell';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import { useScrollLock } from '@/core/hooks/useScrollLock';
import { getPageWrapper } from '@/core/utils/dom';
import type { TargetBalanceTooltipInformation } from '@/core/utils/typesHelpers';
import ArrowPopoverTargetValueComponent from '@/views/CoreUnitBudgetStatement/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';

export interface WithClick {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TargetValueThreeMonths = (data: TargetBalanceTooltipInformation) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSmallSpace = !!(data.description && data.link);
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
            <ContainerInformation hasSmallSpace={hasSmallSpace}>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
        {isMobileResolution && !isMobileDevice && (
          <Container>
            {showIconToolTip && (
              <SESTooltipStyled
                showAsModalBottomSheet
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
            <ContainerInformation onClick={handleOnClick} hasSmallSpace={hasSmallSpace}>
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

              <ContainerInformation onClick={handleOnClick} hasSmallSpace={hasSmallSpace}>
                <ContainerNumberCell value={data.balance} />
                <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
              </ContainerInformation>
            </Container>
          )}
        </PopoverContainer>
      )}
    </BiggerContainer>
  );
};

const PopoverContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginLeft: -32,
  [theme.breakpoints.up('tablet_768')]: {
    marginLeft: 0,
  },
}));
const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 0,
  marginRight: 0,
  [theme.breakpoints.up('tablet_768')]: {
    marginRight: -12,
    width: '100%',
    flexDirection: 'row-reverse',
    marginLeft: 0,
  },
}));

export const ContainerInfoIcon = styled('div')({
  position: 'relative',
});

const ContainerInformation = styled('div')<{ hasSmallSpace?: boolean }>(({ theme, hasSmallSpace }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginRight: 0,
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: hasSmallSpace ? 12.5 : 30,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    alignItems: 'flex-end',
    marginRight: hasSmallSpace ? 12.5 : 30,
  },
}));

const ContainerNumberCell = styled(NumberCell)(({ theme }) => ({
  paddingBottom: 2,
  paddingTop: 0,
  fontWeight: 600,

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
