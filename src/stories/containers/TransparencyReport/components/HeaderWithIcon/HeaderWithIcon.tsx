import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import Information from '@ses/components/svg/information';
import lightTheme from '@ses/styles/theme/light';
import React, { useRef, useState } from 'react';
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

  const [marginTopPopoverPosition, setMarginTopPopoverPosition] = useState<boolean>(false);
  const handleShowPopoverWhenNotSpace = (value: boolean) => {
    setMarginTopPopoverPosition(value);
  };

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
        <ContainerInfoIcon className="advance-table--transparency-card_icon_hidden">
          <IconPosition />
        </ContainerInfoIcon>
      </ExtendedCustomPopover>
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
  width: 85,
  [lightTheme.breakpoints.up('table_834')]: {
    justifyContent: 'flex-end',
    width: '100%',
  },
});

const Title = styled.div({});
