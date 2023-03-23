import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { NumberCell } from '@ses/components/NumberCell/NumberCell';
import Information from '@ses/components/svg/information';
import ArrowPopoverTargetValueComponent from '@ses/containers/TransparencyReport/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useEffect, useState } from 'react';
import { formatAddressForOutput } from '../../../core/utils/string';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { TextCell } from '../../components/TextCell/TextCell';
import { WalletTableCell } from '../../components/WalletTableCell/WalletTableCell';
import ModalSheetValueContent from './components/TransparencyTransferRequest/components/ModalSheet/ModalSheetValueContent';
import type { BudgetStatementWalletDto } from '../../../core/models/dto/coreUnitDTO';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';

export const renderWallet = (wallet: BudgetStatementWalletDto) => (
  <WalletTableCell
    key={wallet.address}
    name={wallet.name}
    wallet={formatAddressForOutput(wallet.address)}
    address={wallet.address}
  />
);

export const renderLinks = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://gnosis-safe.io/app/eth:${address}`}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Gnosis
    </CustomLink>
  </TextCell>
);

export const renderLinksWithToken = (address: string) => (
  <TextCell key={6} responsivePadding="0">
    <CustomLink
      fontFamily={'Inter, sans-serif'}
      href={`https://etherscan.io/address/${address}#tokentxns`}
      style={{ marginRight: '16px' }}
      fontSize={16}
      fontSizeMobile={14}
      fontWeight={500}
    >
      Etherscan
    </CustomLink>
  </TextCell>
);

interface WithIsLightAndClick {
  isLight: boolean;
  onClick?: () => void;
}
export const RenderNumberWithIcon = (data: TargetBalanceTooltipInformation) => {
  const { isLight } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const showIconToolTip = !!(data.description && data.link);

  const md = new MobileDetect(window.navigator.userAgent);
  const isMobileDevice = !!md.mobile();
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  const { lockScroll, unlockScroll } = useScrollLock();

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

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <PopoverContainer>
        {!isMobileResolution && (
          <Container>
            {showIconToolTip && (
              <CustomPopover
                widthArrow
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',
                  },
                  marginLeft: -4.7,
                  marginTop: 2.5,
                }}
                id="information"
                popupStyle={{
                  padding: 10,
                }}
                title={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    longCode={data.longCode}
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon>
                  <Information />
                </ContainerInfoIcon>
              </CustomPopover>
            )}
            <ContainerInformation>
              <ContainerNumberCell value={data.balance} />
              <ContainerStyleMonths>{data.months}</ContainerStyleMonths>
            </ContainerInformation>
          </Container>
        )}
        {isMobileResolution && !isMobileDevice && (
          <Container>
            {showIconToolTip && (
              <CustomPopover
                widthArrow
                alignArrow="center"
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',

                    left: '0px!important',
                    marginLeft: '36px',
                    marginTop: 1.5,
                  },
                }}
                id="information"
                popupStyle={{
                  padding: 10,
                }}
                title={
                  <ArrowPopoverTargetValueComponent
                    toolTipData={{
                      link: data.link,
                      description: data.description,
                      mipNumber: data.mipNumber,
                    }}
                    longCode={data.longCode}
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon>
                  <Information />
                </ContainerInfoIcon>
              </CustomPopover>
            )}
            <ContainerInformation>
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
                  <Information />
                </ContainerInfoIcon>
              )}

              <ContainerInformation>
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
            longCode={data.longCode}
            name={data.name}
          />
        </ModalSheet>
      )}
      {isMobileResolution && isOpen && isMobileDevice && <ContainerOverlay isLight={isLight} onClick={handleOnClick} />}
    </div>
  );
};

const ContainerOverlay = styled.div<WithIsLightAndClick>(({ isLight, onClick }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: isLight ? 'rgba(52, 52, 66, 0.1)' : 'rgba(0, 22, 78, 0.1);',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: zIndexEnum.OVERLAY_MOBILE_TOOLTIP,
  cursor: onClick ? 'default' : undefined,
}));

const ModalSheet = styled.div({
  width: '100%',
  zIndex: 5,
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

const PopoverContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
});
const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: -8,
  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
    flexDirection: 'row-reverse',
    marginLeft: 0,

    marginTop: 0,
  },
});

export const ContainerInfoIcon = styled.div({
  position: 'absolute',
  marginTop: -18,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    marginTop: -8,
  },
});

const ContainerInformation = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    alignItems: 'flex-end',
    marginRight: 4.5,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'flex-end',
    marginRight: 14,
  },
});

const ContainerNumberCell = styled(NumberCell)({
  paddingBottom: 2,
  paddingTop: 0,
  '@media (min-width: 834px)': {
    paddingBottom: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
});

const ContainerStyleMonths = styled.div({
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#546978',
  [lightTheme.breakpoints.up('table_834')]: {
    whiteSpace: 'nowrap',
  },
});

export const TotalTargetBalance = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'flex-end',
  textAlign: 'center',
  fontWeight: 700,
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 4,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginRight: 16,
  },
});
