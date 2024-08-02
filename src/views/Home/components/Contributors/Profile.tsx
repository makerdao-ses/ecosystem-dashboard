import { styled } from '@mui/material';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamStatus } from '@/core/models/interfaces/types';
import type { FC } from 'react';

interface Props {
  contributor: Team;
  className?: string;
}

const Profile: FC<Props> = ({ contributor, className }) => (
  <Container className={className}>
    <ContainerAvatarDescription>
      <CircleAvatarExtended name={contributor.name || 'Wallet'} image={contributor.image} />
      <ContainerDescription>
        <ContainerTitleStatus>
          <TitleLinks>
            <ContainerShortCodeName>
              <ShortCode>{contributor.shortCode}</ShortCode>
              <Name>{contributor.name}</Name>
            </ContainerShortCodeName>
            <StatusMobile>
              <StatusChipStyled status={contributor.status as TeamStatus} />
            </StatusMobile>
          </TitleLinks>
        </ContainerTitleStatus>
      </ContainerDescription>
    </ContainerAvatarDescription>
  </Container>
);

export default Profile;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  height: 'fit-content',
  [theme.breakpoints.up('tablet_768')]: {
    flex: 'revert',
  },
}));
const ContainerTitleStatus = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const TitleLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    gap: 8,
  },
}));

const ContainerAvatarDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
  alignItems: 'center',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    gap: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginTop: 4,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: 185,
  [theme.breakpoints.up('tablet_768')]: {
    width: 220,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: '14px',
    width: 104,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 150,
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.shortShadow,
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const ShortCode = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const ContainerDescription = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'space-between',

  flex: 1,
  paddingRight: 8,
  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const StatusMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 1,
  },
}));
const ContainerShortCodeName = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
});

const StatusChipStyled = styled(StatusChip)({
  padding: '1px 16px 1px 16px',
});
