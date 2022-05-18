import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CutableColumnLinks, LinkModel } from '../cutable-column-links/cutable-column-links';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { StatusChip } from '../status-chip/status-chip';

interface Props {
  title: string
  status: CuStatusEnum,
  statusModified: Date,
  links?: LinkModel[]
}

export const TitleNavigationCuAbout = ({ title, status, statusModified, links = [] }: Props) => {
  return (
    <Container>
      <ContainerTitle>
        <TypographySES>SES</TypographySES>
        <div style={{ width: '4px', height: '4px', backgroundColor: '#D8E0E3', display: 'flex', marginRight: '8px', marginLeft: '8px' }} />
        <TypographyTitle>{title}</TypographyTitle>

        <Row>
          {status && <StatusChip status={status}/>}
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
      </ContainerTitle>
      <ContainerLinks>
        <CutableColumnLinks links={links} dark/>
      </ContainerLinks>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  alignItems: 'center',
  fontWeight: 400,
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const TypographyTitle = styled(Typography)`
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 22px;
color: #000000;
`;
const TypographySES = styled(Typography)`
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 22px;
color: #9FAFB9;
`;

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  marginLeft: '32px',
});

const SinceDate = styled.a({
  color: 'gray',
  fontSize: '12px',
  textDecoration: 'underline',
  marginLeft: '10px'
});

const ContainerLinks = styled.div({
  display: 'flex',
  alignItems: 'center'
});

export default TitleNavigationCuAbout;
