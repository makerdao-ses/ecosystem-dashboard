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
  const leaveTimeoutRef = useRef<NodeJS.Timeout>();

  const [isOpen, setIsOpen] = useState(false);
  const { isLight } = useThemeContext();

  const [marginTopPopoverPosition, setMarginTopPopoverPosition] = useState<boolean>(false);
  const [hasNotSpaceRight, setHasNotSpaceRight] = useState<boolean>(false);
  const [hasNotDownRight, setHasNotDownRight] = useState<boolean>(false);
  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    setMarginTopPopoverPosition(value);
  };
  const handleNotSpaceRight = (value: string) => {
    if (value === 'arrowUp') {
      setHasNotSpaceRight(!hasNotSpaceRight);
    }
    if (value === 'arrowDown') {
      setHasNotDownRight(!hasNotDownRight);
    }
  };
  const handleClose = () => {
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setHasNotSpaceRight(false);
      setHasNotDownRight(false);
    }, 400);
  };
  useEffect(() => {
    clearTimeout(leaveTimeoutRef.current);
  }, []);

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
  return (
    <Container>
      <Title style={{ marginRight: 8 }}>{title}</Title>
      <ExtendedCustomPopover
        hasNotDownRight={hasNotDownRight}
        marginTopPopoverPosition={marginTopPopoverPosition}
        onClose={handleClose}
        alignArrow={hasNotSpaceRight || hasNotDownRight ? 'right' : undefined}
        handleNotSpaceRight={handleNotSpaceRight}
        hasNotSpaceRight={hasNotSpaceRight}
        handleShowPopoverWhenNotSpace={handleShowPopoverWhenNotSpace}
        refElementShowPopover={refElementShowPopover}
        widthArrow
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

const ExtendedCustomPopover = styled(CustomPopover)<{
  hasNotDownRight: boolean;
  hasNotSpaceRight?: boolean;
  marginTopPopoverPosition?: boolean;
}>(({ hasNotSpaceRight, marginTopPopoverPosition, hasNotDownRight }) => ({
  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
    overflowX: 'unset',
    overflowY: 'unset',
    marginLeft: -45,
    marginTop: marginTopPopoverPosition ? 16 : -25,
    ...(hasNotSpaceRight && {
      marginLeft: 63,
      marginTop: 15,
    }),
    ...(hasNotDownRight && {
      marginLeft: 63,
      marginTop: -20,
    }),
  },
}));

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
