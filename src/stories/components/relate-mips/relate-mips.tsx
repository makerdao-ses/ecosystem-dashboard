import React from 'react';
import styled from '@emotion/styled';
import { Chip, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import ArrowLink from '../svg/ArrowLink';
import { getMipTitle } from '../../../core/utils/string-utils';
import { CuStatusEnum } from '../../../core/enums/cu-status-enum';

export type RelateMipType = {
  status: CuStatusEnum,
  statusModified: Date,
  mipTitle?: string
  href: string
}

interface Props {
  relateMips: RelateMipType
}

const RelateMips = ({ relateMips: { status, statusModified, href, mipTitle } }: Props) => {
  const pieces = getMipTitle(mipTitle || '') || [];
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
        {pieces[0] ? <Typography color='#000000' fontFamily={'Inter, sans-serif'} fontSize={12} fontWeight={600}>{`${pieces[0]} `}</Typography> : null}
        {pieces[1] ? <Typography color='#000000' fontFamily={'Inter, sans-serif'} fontSize={12} sx={{ marginRight: '8px' }}>{`${pieces[1]}`} </Typography> : null}
        {!!href && <ArrowLink href={`${href}` || '#'} />}
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
