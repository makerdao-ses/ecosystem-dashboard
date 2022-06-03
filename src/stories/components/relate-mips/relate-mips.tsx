import React from 'react';
import styled from '@emotion/styled';
import { Typography, Theme } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuMip } from '../../containers/cu-about/cu-about.api';
import ExternalLinkArrow from '../svg/external-link-arrow';
import { getMipTitle } from '../../../core/utils/string.utils';
import { getMipsStatus } from '../../../core/business-logic/core-unit-about';

export type RelateMipType = {
  status: CuStatusEnum,
  statusModified: Date,
  mipTitle?: string
  href: string
}

interface Props {
  relateMips: CuMip
}

const RelateMips = ({ relateMips }: Props) => {
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
  const pieces = getMipTitle(relateMips.mipTitle);
  return (
    <Content>
      <Row>
        {mipStatus && <StatusChip status={mipStatus as CuStatusEnum} />}
        {newDate && <CustomPopover
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          <SinceDate
            href={relateMips.mipUrl}
            target="_blank"
            onClick={(evt) => evt.stopPropagation()}
          >
            Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
          </SinceDate>
        </CustomPopover>}
      </Row>
      {pieces.length === 2 && <RowUnderLine>
        <Typography color='#231536' fontSize={16} fontWeight={600} sx={{
          lineHeight: '22px',
          minWidth: '125px',
          display: 'inline-block',
          marginRight: '4px',
        }}>{`${pieces[0]}:`}</Typography>
        <ContainerIconTypography>
          <Typography color='#447AFB' fontSize={16} sx={{
            display: 'inline',
            lineHeight: '19px',
          }}>{pieces[1]}</Typography>
          <ArrowLinkContainer>  <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} /></ArrowLinkContainer>
        </ContainerIconTypography>
      </RowUnderLine>}
      {pieces.length === 1 && <RowUnderLine><Typography> {relateMips.mipTitle}</Typography><ArrowLinkContainer>  <ExternalLinkArrow href={`${relateMips.mipUrl}` || '#'} /></ArrowLinkContainer></RowUnderLine>}
    </Content>
  );
};
export default RelateMips;
const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  width: '672px',
  backgroundColor: '#FCFCFC',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
});

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  marginBottom: '18px'
});

const RowUnderLine = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  width: '640px',
});
const SinceDate = styled.a(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#447AFB',
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
});
