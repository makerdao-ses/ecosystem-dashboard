import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CuTableColumnLinks, LinkModel } from '../cu-table-column-links/cu-table-column-links';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';

export type CardInfoMemberType = {
  avatar?: string;
  name: string;
  username: string;
  jobTitle: string;
  commitment: string;
}

interface Props {
  info: CardInfoMemberType;

}

const CardInfoMember = ({ info }: Props) => {
  const links: LinkModel[] = [{
    href: '#',
    linkType: LinkTypeEnum.Gmail,
  }, {
    href: '#',
    linkType: LinkTypeEnum.Forum
  },
  {
    href: '#',
    linkType: LinkTypeEnum.Twitter
  },
  {
    href: '#',
    linkType: LinkTypeEnum.Discord
  },
  ];

  return (
    <Box>
      <Card sx={{
        width: 294,
        height: 182,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: '8px',
        backgroundColor: '#F9F9F9'
      }} >
        <CardHeader
          sx={{
            marginTop: '17px',
            paddingTop: '0px',
            paddingBottom: '0px'
          }}
          avatar={!info.avatar
            ? <Avatar sx={{
              bgcolor: 'black',
              width: 40,
              height: 40
            }} style={{ fontSize: '1rem' }}>{getTwoInitials(info.name || 'NM')}</Avatar>
            : <Avatar style={{
              width: '40px',
              height: '40px'
            }} src={info.avatar} />}
          title={<Typography fontSize={14} sx={{ color: '#000000' }}>{info.name}</Typography>}
          subheader={<Typography fontSize={12} sx={{
            marginLeft: '6px',
            color: '#000000'
          }}>{info.username}</Typography>}
        />
        <CardContent sx={{
          '&:last-child': { pb: '10px' },
          paddingRight: '0px'
        }}>
          <CardContentPositionRow>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12}>Title</Typography>
              <Typography color=' #000000' fontSize={14}>{info.jobTitle}</Typography>
            </CardContentPositionColumn>
            <CardContentPositionColumn>
              <Typography color='#C4C4C4' fontSize={12} sx={{ paddingRight: '50px' }}>Commitment</Typography>
              <Typography color=' #000000' fontSize={14}>{info.commitment}</Typography>
            </CardContentPositionColumn>
          </CardContentPositionRow>
          <Divider light sx={{
            marginTop: '30px',
            marginBottom: '11px',
            color: '#C4C4C4'
          }} variant='fullWidth' />
          <CardLinksFooter><CuTableColumnLinks links={links} width={10} height={10} spacingsRight={22}/></CardLinksFooter>
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
