import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import ArrowLink from '../svg/ArrowLink';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';
import { CuMip } from '../../containers/cu-about/cu-about.api';

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
  const getMipsStatus = (mip: CuMip) => {
    switch (mip.mipStatus) {
      case CuStatusEnum.Accepted:
        return relateMips.accepted;
      case CuStatusEnum.Obsolete:
        return relateMips.obsolete;
      case CuStatusEnum.FormalSubmission:
        return relateMips.formalSubmission;
      case CuStatusEnum.Rejected:
        return relateMips.rejected;
      case CuStatusEnum.RFC:
        return relateMips.rfc;
      default:
        return relateMips.rejected;
    }
  };
  const mips = getMipsStatus(relateMips || '');
  const mipStatus = relateMips.mipStatus;
  const newDate = mips ? DateTime.fromFormat(mips || '', 'yyyy-MM-dd').toJSDate() : null;
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
          >
            Since {DateTime.fromJSDate(newDate).toFormat('d-MMM-y')}
          </SinceDate>
        </CustomPopover>}
      </Row>
      <RowUnderLine>
        <Typography color='#000000' fontSize={12} fontWeight={600} sx={{ marginRight: '19px' }}>{relateMips.mipTitle}
          <ArrowLinkContainer><ArrowLink href={`${relateMips.mipUrl}` || '#'} target="_blank" /></ArrowLinkContainer>
        </Typography>
      </RowUnderLine>
    </Content>
  );
};
export default RelateMips;
const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px 17px 8px',
  width: '500px',
  backgroundColor: '#FCFCFC',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginBottom: '18px'
});

const RowUnderLine = styled.div({
  display: 'inline-block',
  alignItems: 'center',
  verticalAlign: 'middle',
  textDecoration: 'underline',
  whiteSpace: 'pre-wrap',
});

const SinceDate = styled.a({
  color: '#898989',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px',
  fontWeight: 500,
  marginRight: '8px',
});

const ArrowLinkContainer = styled.span({
  marginLeft: '9px',
  alignItems: 'center',
  verticalAlign: 'middle',
});
