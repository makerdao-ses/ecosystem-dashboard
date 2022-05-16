
import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CutableColumnLinks, LinkModel, LinkType } from '../cutable-column-links/cutable-column-links';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { ContributorCommitment } from '../../containers/cu-about/cu-about-contributor';

interface Props {
  contributorCommitment: ContributorCommitment;
}

export const getLinksFromContributor = (contributor: ContributorCommitment) => {
  const links: LinkModel[] = [];
  if (contributor.contributor.length === 0) return links;
  const cont = contributor.contributor[0];
  if (cont.email) {
    links.push({
      linkType: LinkType.Gmail,
      href: cont.email
    });
  }
  if (cont.forumHandle) {
    links.push({
      linkType: LinkType.Forum,
      href: cont.forumHandle
    });
  }
  if (cont.discordHandle) {
    links.push({
      linkType: LinkType.Discord,
      href: cont.discordHandle
    });
  }
  if (cont.twitterHandle) {
    links.push({
      linkType: LinkType.Twitter,
      href: cont.twitterHandle
    });
  }
  return links;
};

const CardInfoMember = ({ contributorCommitment }: Props) => {
  const contributor = contributorCommitment.contributor[0] || [];
  const links = getLinksFromContributor(contributorCommitment) || [];

  return (
    <Box sx={{ maxWidth: 294, maxHeight: 182 }}>
      <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)', borderRadius: '8px', backgroundColor: '#F9F9F9' }} >
        <CardHeader
          sx={{ marginTop: '17px', paddingTop: '0px', paddingBottom: '0px' }}
          avatar={!contributor.facilitatorImage ? <Avatar sx={{ bgcolor: 'black' }} style={{ width: '48px', height: '48px', fontSize: '1rem' }}>{getTwoInitials(contributor?.name || 'NM')}</Avatar> : <Avatar style={{ width: '48px', height: '48px' }} src={contributor.facilitatorImage} />}
          title={<Typography fontSize={14} >{contributor.name}</Typography>}
          subheader={<Typography fontSize={12} sx={{ marginLeft: '6px' }}>{`forum: @${contributor.forumHandle}`}</Typography>}
        />
        <CardContent>
          <CardContentPositionRow>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12}>Title</Typography>
              <Typography color=' #000000' fontSize={14}>{contributorCommitment.jobTitle}</Typography>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12}>Commitment</Typography>
              <Typography color=' #000000' fontSize={14}>{contributorCommitment.commitment}</Typography>
            </CardContentPositionColumn>
          </CardContentPositionRow>
          <Divider light sx={{ marginTop: '30px', color: '#C4C4C4' }} variant='fullWidth' />
          <CardLinksFooter><CutableColumnLinks links={links} width={16} height={16} /></CardLinksFooter>
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
