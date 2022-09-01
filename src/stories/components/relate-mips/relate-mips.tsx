import React from 'react';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuMip } from '../../containers/cu-about/cu-about.api';
import ExternalLinkArrow from '../svg/external-link-arrow';
import { getMipTitle } from '../../../core/utils/string.utils';
import { getMipsStatus } from '../../../core/business-logic/core-unit-about';
import { CuMipDto } from '../../../core/models/dto/core-unit.dto';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomLink } from '../custom-link/custom-link';

export type RelateMipType = {
  status: CuStatusEnum,
  statusModified: Date,
  mipTitle?: string
  href: string
}

interface Props {
  relateMips: CuMip | CuMipDto
}

const RelateMips = ({ relateMips }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const isTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  const pieces = getMipTitle(relateMips.mipTitle);
  return (
    <Content isLight={isLight}>
      <Row>
        {mipStatus && <StatusChip status={mipStatus as CuStatusEnum} />}
        {newDate && <CustomPopover
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          popupStyle={{
            color: isLight ? '#231536' : '#D2D4EF',
          }}
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          <SinceDate
            isLight={isLight}
            href={relateMips.mipUrl}
            target="_blank"
            onClick={(evt) => evt.stopPropagation()}
          >
            Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
          </SinceDate>
        </CustomPopover>}
      </Row>
      {pieces.length === 2 && <RowUnderLine>
        <StyleMipNumber isLight={isLight}>{`${pieces[0]}:`}</StyleMipNumber>
        <ContainerIconTypography>
          <CustomLink href={relateMips.mipUrl} withArrow iconWidth={10} iconHeight={10} marginLeft='7px' style={{
            whiteSpace: 'pre-line',
            fontFamily: 'SF Pro Display, sans-serif',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: isTable ? '14px' : '16px',
            lineHeight: '19px',
            letterSpacing: '0.3px',
            color: '#447AFB'
          }}>
            {pieces[1]}
          </CustomLink>
        </ContainerIconTypography>
      </RowUnderLine>}
      {pieces.length === 1 && <RowUnderLine><Typography color='#447AFB' fontFamily={'SF Pro Display, sans-serif'}> {relateMips.mipTitle}</Typography><ArrowLinkContainer>  <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} /></ArrowLinkContainer></RowUnderLine>}
    </Content >
  );
};
export default RelateMips;
const Content = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  width: '620px',
  backgroundColor: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
  [lightTheme.breakpoints.between('table_375', 445)]: {
    width: '343px',
  },
  [lightTheme.breakpoints.between(446, 832)]: {
    width: 'calc(100vw - 35px)',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    maxWidth: '360px',
  },
}));

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: '32px',
});

const RowUnderLine = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    flexDirection: 'column',
  },
});

const SinceDate = styled.a<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#708390',
  textDecoration: 'none',
  marginLeft: '4px',
}));

const ArrowLinkContainer = styled.span({
  display: 'inline',
  marginLeft: '9px',
});

const ContainerIconTypography = styled.div({
  display: 'inline',
  alignItems: 'center',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: '4px'
  },
});

const StyleMipNumber = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: '14px',
  minWidth: '135px',
  display: 'inline-block',
  marginRight: '4px',
  fontFamily: 'SF Pro Text, sans-serif',
  color: isLight ? '#231536' : '#D2D4EF',
  fontWeight: 600,
  paddingTop: '3px',
  lineHeight: '22px',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
  },
}));
