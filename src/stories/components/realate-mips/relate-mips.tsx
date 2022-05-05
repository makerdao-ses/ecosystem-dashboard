import React from 'react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CuStatusEnum } from '../cutable-column-summary/cutable-column-summary';
import ArrowLink from '../svg/ArrowLink';
import { getMipTitle } from '../../../core/utils/string-utils';

interface Props {
  status: CuStatusEnum,
  statusModified: Date,
  mipTitle?: string
}

const RelateMips = ({ status, statusModified, mipTitle = '' }: Props) => {
  const pieces = getMipTitle(mipTitle) || [];
  console.log('firts', (pieces[0]));
  console.log('firts', (pieces[1]));
  return (
    <Content>
      <Row>
        {status && <Chip size={'small'} sx={{ borderRadius: '8px', borderColor: '#25273D' }} label={status} variant={'outlined'} />}
        {statusModified && <CustomPopover
          id={'mouse-over-popover-goto'}
          title={'Go to MIPs Portal'}
        >
          <SinceDate
            href={'#'}
          >
            Since {DateTime.fromJSDate(statusModified).toFormat('d-MMM-y').toUpperCase()}
          </SinceDate>
        </CustomPopover>}
      </Row>
      <RowUnderLine>
        <Typography color='#000000' fontFamily={'Inter, sans-serif'} fontSize={14} fontWeight={600}>{`${pieces[0]}: ${''}`}</Typography>
        <Typography color='#000000' fontFamily={'Inter, sans-serif'} fontSize={14} sx={{ marginRight: '8px' }}>{`${pieces[1]}`} </Typography>
        <ArrowLink />
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
});
const RowUnderLine = styled(Row)`
   text-decoration: underline;
`;

const SinceDate = styled.a({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});
