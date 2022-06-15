import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { getTwoInitials } from '../../../core/utils/string.utils';
import { ContributorCommitment } from '../../containers/cu-about/cu-about-contributor';
import { getLinksFromContributor } from '../../../core/business-logic/core-unit-about';
import { DateTime } from 'luxon';
import { getColorJobPosition } from '../../../core/utils/color.utils';

interface Props {
  contributorCommitment: ContributorCommitment;
}

const CardInfoMember = ({ contributorCommitment }: Props) => {
  const since = DateTime.now().diff(DateTime.fromISO(contributorCommitment.startDate || ''), 'years').toFormat('y');
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment);
  const { color } = getColorJobPosition(contributorCommitment.jobTitle);
  return (
    <Box>
      <Card sx={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        width: '311px',
      }} >

        <CardContent sx={{
          margin: '16px',
          padding: '0px',
        }}>
          <CardHeader
            sx={{
              padding: '0px',
              '& .MuiCardHeader-avatar': {
                marginRight: '0px',
              }

            }}
            avatar={!contributor.facilitatorImage
              ? <Avatar sx={{
                bgcolor: 'black',
                marginRight: '21px',
              }} style={{
                width: '54px',
                height: '54px',
                fontSize: '20px',
                color: 'white',
                border: '3px solid #E7FCFA',

              }}>{getTwoInitials(contributor?.name || 'NM')}</Avatar>
              : <Avatar sx={{
                marginRight: '0px',
              }} style={{
                width: '54px',
                height: '54px',
                border: '3px solid #E7FCFA',
              }} src={contributor.facilitatorImage} />}
            title={<Typography fontSize={20} color='#231536' lineHeight='24px' fontWeight={500}>{contributor.name}</Typography>}
            subheader={<Typography fontSize={14} sx={{
              marginTop: '8px',
            }}>{contributor.email}</Typography>}
          />
          <Typography sx={{
            marginTop: '24px',
            marginBottom: '24px',
            color,
          }}>{contributorCommitment.jobTitle}</Typography>

          <CardContentPositionRow>
            <CardContentPositionColumn>
              <TypographyStyled color='#708390'>Since</TypographyStyled>
              <TypographyStyled color='#231536'>{`${since} Years`}</TypographyStyled>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <TypographyStyled color='#708390' >Commitment</TypographyStyled>
              <TypographyStyled color=' #231536'>{contributorCommitment.commitment}</TypographyStyled>
            </CardContentPositionColumn>
          </CardContentPositionRow>
        </CardContent>
        <Divider light sx={{
          marginBottom: '8px',
          color: '#C4C4C4'
        }} variant='fullWidth' />
        <CardLinksFooter><CuTableColumnLinks links={links} width={16} height={16} spacingsRight={19} /></CardLinksFooter>
      </Card>
    </Box >
  );
};

const CardContentPositionRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const CardContentPositionColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const CardLinksFooter = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '8px',
});

const TypographyStyled = styled(Typography)<{ color: string }>((props) => ({
  color: props.color,
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px'
}));
export default CardInfoMember;
