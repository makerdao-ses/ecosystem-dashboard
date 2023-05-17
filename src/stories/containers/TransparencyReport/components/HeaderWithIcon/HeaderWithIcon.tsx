import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { zIndexEnum } from '@ses/core/enums/zIndexEnum';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ModalSheetValueContent from '../TransparencyTransferRequest/components/ModalSheet/ModalSheetValueContent';
import HeaderToolTip from './TooltipHeader';
import type { WithIsLightAndClick } from '../../transparencyReportUtils';

interface Props {
  description: string;
  mipNumber: string;
  link: string;
  name: string;
  title: string;
}

const HeaderWithIcon: React.FC<Props> = ({ title, description, mipNumber, link, name }) => {
  const refElementShowPopover = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { isLight } = useThemeContext();

  const [marginTopPopoverPosition, setMarginTopPopoverPosition] = useState<boolean>(false);
  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    setMarginTopPopoverPosition(value);
  };

  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const { lockScroll, unlockScroll } = useScrollLock();

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
  console.log('isMobileResolution && isOpen && isMobileDevice', isMobileResolution, isOpen, isMobileDevice);
  return (
    <Container>
      <Title style={{ marginRight: 8 }}>{title}</Title>
      <ExtendedCustomPopover
        hasNotSpaceRight={true}
        handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
        refElementShowPopover={refElementShowPopover}
        sxProps={{
          '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
            overflowX: 'unset',
            overflowY: 'unset',
            marginTop: marginTopPopoverPosition ? 2 : -3,
          },
        }}
        widthArrow
        hasSpacePositionArrow={marginTopPopoverPosition}
        id="information"
        popupStyle={{
          padding: 10,
        }}
        title={<HeaderToolTip description={description} link={link} mipNumber={mipNumber} name={name} />}
        leaveOnChildrenMouseOut
      >
        <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden" onClick={handleOnClick}>
          <IconPosition />
        </ContainerInfoIcon>
      </ExtendedCustomPopover>
      {isMobileResolution && isOpen && isMobileDevice && (
        <ModalSheet>
          <ModalSheetValueContent
            toolTipData={{
              description,
              link,
              mipNumber,
            }}
            name={name}
          />
        </ModalSheet>
      )}
      {isMobileResolution && isOpen && isMobileDevice && <ContainerOverlay isLight={isLight} onClick={handleOnClick} />}
    </Container>
  );
};

export default HeaderWithIcon;

const ExtendedCustomPopover = styled(CustomPopover)<{ hasSpacePositionArrow?: boolean; hasNotSpaceRight?: boolean }>(
  ({ hasSpacePositionArrow, hasNotSpaceRight }) => ({
    '& > div': {
      [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
        marginLeft: -45,
        marginTop: 16,
      },
      [lightTheme.breakpoints.up('desktop_1194')]: {
        marginLeft: -42,
        ...(hasNotSpaceRight && {
          marginRight: -348,
          marginTop: 40,
        }),
        marginTop: hasSpacePositionArrow ? -18 : 18,
      },
    },
  })
);

export const ContainerInfoIcon = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const IconPosition = styled(Information)({
  display: 'flex',
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'center',
  },
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: 106,
  [lightTheme.breakpoints.up('table_834')]: {
    justifyContent: 'flex-end',
    width: '100%',
  },
});

const Title = styled.div({});

const ModalSheet = styled.div({
  width: '100%',
  zIndex: 5,
  textAlign: 'left',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
});

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
