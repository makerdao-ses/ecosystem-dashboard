import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { ContributorCommitment } from '../../containers/cu-about/cu-about-contributor';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

interface Props {
  contributorCommitment: ContributorCommitment;
}

export const getLinksFromContributor = (contributor: ContributorCommitment) => {
  const links: LinkModel[] = [];
  if (contributor.contributor.length === 0) return links;
  const cont = contributor.contributor[0];
  if (cont.email) {
    links.push({
      linkType: LinkTypeEnum.Gmail,
      href: cont.email
    });
  }
  if (cont.forumHandle) {
    links.push({
      linkType: LinkTypeEnum.Forum,
      href: cont.forumHandle
    });
  }
  if (cont.discordHandle) {
    links.push({
      linkType: LinkTypeEnum.Discord,
      href: cont.discordHandle
    });
  }
  if (cont.twitterHandle) {
    links.push({
      linkType: LinkTypeEnum.Twitter,
      href: cont.twitterHandle
    });
  }
  return links;
};

const CardInfoMember = ({ contributorCommitment }: Props) => {
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment) || [];
  return (
    <Box>
      <Card sx={{ width: 294, height: 182, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)', borderRadius: '8px', backgroundColor: '#F9F9F9' }} >
        <CardHeader
          sx={{ marginTop: '17px', paddingTop: '0px', paddingBottom: '0px' }}
          avatar={!contributor.facilitatorImage ? <Avatar sx={{ bgcolor: 'black' }} style={{ width: '40px', height: '40px', fontSize: '1rem' }}>{getTwoInitials(contributor?.name || 'NM')}</Avatar> : <Avatar style={{ width: '40px', height: '40px' }} src={contributor.facilitatorImage} />}
          title={<Typography fontSize={14} >{contributor.name}</Typography>}
          subheader={<Typography fontSize={12} sx={{ marginLeft: '6px' }}>{`forum: @${contributor.forumHandle}`}</Typography>}
        />
        <CardContent sx={{ '&:last-child': { pb: '10px' }, paddingRight: '0px' }}>
          <CardContentPositionRow>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12}>Title</Typography>
              <Typography color=' #000000' fontSize={14}>{contributorCommitment.jobTitle}</Typography>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12} sx={{ paddingRight: '50px' }}>Commitment</Typography>
              <Typography color=' #000000' fontSize={14}>{contributorCommitment.commitment}</Typography>
            </CardContentPositionColumn>
          </CardContentPositionRow>
          <Divider light sx={{ marginTop: '30px', marginBottom: '11px', color: '#C4C4C4' }} variant='fullWidth' />
          <CardLinksFooter><CuTableColumnLinks links={links} width={10} height={10} spacingsRight={22} /></CardLinksFooter>
        </CardContent>
      </Card>
    </Box>
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
});

export default CardInfoMember;
