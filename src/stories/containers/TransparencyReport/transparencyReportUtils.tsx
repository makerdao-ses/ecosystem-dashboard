import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { NumberCell } from '@ses/components/NumberCell/NumberCell';
import Information from '@ses/components/svg/information';
import ArrowPopoverTargetValueComponent from '@ses/containers/TransparencyReport/components/ArrowPopoverTargetValue/ArrowPopoverTargetValueComponent';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { formatAddressForOutput } from '../../../core/utils/string';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { TextCell } from '../../components/TextCell/TextCell';
import { WalletTableCell } from '../../components/WalletTableCell/WalletTableCell';
import PopoverMobile from './components/PopoverMobile/PopoverMobile';
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

export interface WithIsLightAndClick {
  isLight: boolean;
  onClick?: () => void;
}

export const RenderNumberWithIcon = (data: TargetBalanceTooltipInformation) => {
  const [isOpen, setIsOpen] = useState(false);
  const hrefPopoverElement = useRef<HTMLDivElement>(null);
  const [marginTopPopoverPosition, setMarginTopPopoverPosition] = useState<boolean>(false);
  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    setMarginTopPopoverPosition(value);
  };
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
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

  const handleOnClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <BiggerContainer>
      <PopoverContainer>
        {!isMobileResolution && (
          <Container>
            {showIconToolTip && (
              <ExtendedCustomPopover
                handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
                refElementShowPopover={hrefPopoverElement}
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',
                    marginTop: marginTopPopoverPosition ? 3 : -3,
                  },
                }}
                widthArrow
                hasSpacePositionArrow={marginTopPopoverPosition}
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
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon>
                  <IconPosition />
                </ContainerInfoIcon>
              </ExtendedCustomPopover>
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
              <ExtendedCustomPopover
                widthArrow
                handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
                refElementShowPopover={hrefPopoverElement}
                hasSpacePositionArrow={marginTopPopoverPosition}
                alignArrow="center"
                sxProps={{
                  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
                    overflowX: 'unset',
                    overflowY: 'unset',
                    left: '0px!important',
                    marginLeft: '36px',
                    marginTop: marginTopPopoverPosition ? 1.5 : -3,
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
                    name={data.name}
                  />
                }
                leaveOnChildrenMouseOut
              >
                <ContainerInfoIcon>
                  <IconPosition />
                </ContainerInfoIcon>
              </ExtendedCustomPopover>
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
                  <IconPosition />
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
      <PopoverMobile isOpen={isOpen} handleOnClick={handleOnClick}>
        <ModalSheetValueContent
          toolTipData={{
            description: data.description,
            link: data.link,
            mipNumber: data.mipNumber,
          }}
          name={data.name}
        />
      </PopoverMobile>
    </BiggerContainer>
  );
};

const PopoverContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
});
const Container = styled.div({
  width: '100%',
  display: 'flex',
  flex: 1,
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
  position: 'relative',
});

const IconPosition = styled(Information)({
  position: 'absolute',
  top: -14,
  left: -14,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    top: -8,
    left: -10,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'center',

    top: -8,
    left: 4,
  },
});

const ContainerInformation = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    alignItems: 'flex-end',
    marginRight: 14,
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
    marginRight: 16,
  },
});

const BiggerContainer = styled.div({
  width: '100%',
});

const ExtendedCustomPopover = styled(CustomPopover)<{ hasSpacePositionArrow?: boolean }>(
  ({ hasSpacePositionArrow }) => ({
    '& > div': {
      [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
        marginLeft: -45,
        marginTop: 16,
      },
      [lightTheme.breakpoints.up('desktop_1194')]: {
        marginLeft: -32,
        marginTop: hasSpacePositionArrow ? -18 : 18,
      },
    },
  })
);
