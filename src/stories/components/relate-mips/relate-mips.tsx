import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import ArrowLink from '../svg/ArrowLink';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';
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
  return (
    <Content>
      <Row>
        {relateMips.mipStatus && <StatusChip status={relateMips.mipStatus}/>}
        {relateMips && <CustomPopover
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          <SinceDate
            href={relateMips.mipUrl}
          >
            Since {DateTime.fromJSDate(new Date(getMipsStatus(relateMips) || '')).toFormat('d-MMM-y')}
          </SinceDate>
        </CustomPopover>}
      </Row>
      <RowUnderLine>
        <Typography color='#000000' fontSize={12} fontWeight={600}>{relateMips.mipTitle}</Typography>
        {!!relateMips.mipUrl && <ArrowLink href={`${relateMips.mipUrl}` || '#'} />}
      </RowUnderLine>
    </Content>
  );
};
export default RelateMips;
const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 4px 16px 8px',
  width: '500px',
  height: '75px',
  backgroundColor: '#FCFCFC',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
});

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  whiteSpace: 'break-spaces',
});
const RowUnderLine = styled(Row)`
   text-decoration: underline;
   margin-right:8px;
`;

const SinceDate = styled.a({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
