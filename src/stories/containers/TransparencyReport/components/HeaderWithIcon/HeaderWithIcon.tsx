import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import { useScrollLock } from '@ses/core/hooks/useScrollLock';
import { getPageWrapper } from '@ses/core/utils/dom';
import lightTheme from '@ses/styles/theme/light';
import MobileDetect from 'mobile-detect';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PopoverMobile from '../PopoverMobile/PopoverMobile';
import ModalSheetValueContent from '../TransparencyTransferRequest/components/ModalSheet/ModalSheetValueContent';
import HeaderToolTip from './TooltipHeader';

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
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const { lockScroll, unlockScroll } = useScrollLock();

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
      {!isMobileResolution && (
        <>
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
        </>
      )}
      {isMobileResolution && !isMobileDevice && (
        <>
          <Title style={{ marginRight: 8 }}>{title}</Title>
          <ExtendedCustomPopoverMobile
            hasNotDownRight={hasNotDownRight}
            marginTopPopoverPosition={marginTopPopoverPosition}
            onClose={handleClose}
            alignArrow={'center'}
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
          </ExtendedCustomPopoverMobile>
        </>
      )}
      {isMobileResolution && isMobileDevice && (
        <>
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
        </>
      )}
      <PopoverMobile isOpen={isOpen} handleOnClick={handleOnClick}>
        <ModalSheetValueContent
          toolTipData={{
            description,
            link,
            mipNumber,
          }}
          name={name}
        />
      </PopoverMobile>
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

const ExtendedCustomPopoverMobile = styled(ExtendedCustomPopover)({
  '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
    [lightTheme.breakpoints.down('table_834')]: {
      left: '0px!important',
      marginLeft: -4,
    },
  },
});

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
