import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CircleAvatar from '@/components/CircleAvatar/CircleAvatar';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import { siteRoutes } from '@/config/routes';
import { useFlagsActive } from '@/core/hooks/useFlagsActive';
import type { Team } from '@/core/models/interfaces/team';
import type { TeamStatus } from '@/core/models/interfaces/types';
import type { FC } from 'react';

interface Props {
  actor: Team;
  className?: string;
}

const EcosystemActorDescription: FC<Props> = ({ actor, className }) => {
  const [isEnabled] = useFlagsActive();
  return (
    <Container href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} className={className}>
      <ActorAvatar>
        <CircleAvatarExtended name={actor.name || 'Wallet'} image={actor.image} />
        <ContainerDescription>
          <ContainerTitleStatus>
            <TitleLinks>
              <ContainerShortCodeName>
                {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && <ShortCode>{actor.shortCode}</ShortCode>}
                <Name>{actor.name}</Name>
              </ContainerShortCodeName>
              {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                <StatusMobile>
                  <StatusChipStyled status={actor.status as TeamStatus} />
                </StatusMobile>
              )}
            </TitleLinks>
          </ContainerTitleStatus>
        </ContainerDescription>
      </ActorAvatar>
    </Container>
  );
};

export default EcosystemActorDescription;

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  flex: 1,

  [theme.breakpoints.up('tablet_768')]: {
    flex: 'revert',
    paddingLeft: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 24,
  },
}));
const ContainerTitleStatus = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  [theme.breakpoints.up('desktop_1024')]: {
    width: 202,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 256,
  },
}));

const TitleLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  [theme.breakpoints.up('tablet_768')]: {
    width: 154,
    gap: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -4,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 202,
  },
}));

const ActorAvatar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  paddingTop: 8,

  paddingLeft: 8,

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 'revert',
    paddingLeft: 0,
    marginBottom: 0,
    paddingBottom: 0,
    width: '100%',
    marginTop: 2,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingTop: -4,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 304,
    marginLeft: -2,
    gap: 16,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 292,
    marginTop: 4,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
  width: 140,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  [theme.breakpoints.up('tablet_768')]: {
    width: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: '14px',
    width: 202,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    width: 159,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 211,
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.shortShadow,
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  border: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 4,
  },
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
    gap: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const StatusMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  marginTop: -4,
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
