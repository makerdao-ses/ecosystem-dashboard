import React from 'react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import ArrowLink from '../svg/ArrowLink';
import { CuMipStatus } from '../title-navigation-cu-about/title-navigation-cu-about';
import { RelateMipsCuAbout } from '../../containers/cu-about/cu-about.api';
interface Props {
  relateMips: RelateMipsCuAbout
}

const RelateMips = ({ relateMips }: Props) => {
  const getMipsStatus = (mip: RelateMipsCuAbout) => {
    switch (mip.mipStatus) {
      case CuMipStatus.Accepted:
        return relateMips.accepted;
      case CuMipStatus.Obsolete:
        return relateMips.obsolete;
      case CuMipStatus.FORMAL:
        return relateMips.formalSubmission;
      case CuMipStatus.Rejected:
        return relateMips.rejected;
      case CuMipStatus.RFC:
        return relateMips.rfc;
      default:
        return relateMips.rejected;
    }
  };
  return (
    <Content>
      <Row>
        {relateMips.mipStatus && <Chip size={'small'} sx={{ borderRadius: '8px', borderColor: '#25273D' }} label={relateMips.mipStatus} variant={'outlined'} />}
        {relateMips.mipStatus && <CustomPopover
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
