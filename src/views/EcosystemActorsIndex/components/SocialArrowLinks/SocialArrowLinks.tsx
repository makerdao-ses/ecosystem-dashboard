import { styled } from '@mui/material';
import React from 'react';
import SocialMediaLinksButton from '@/components/ButtonLink/SocialMediaLinksButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { Team } from '@/core/models/interfaces/team';
import type { FC } from 'react';

interface Props {
  actor: Team;

  className?: string;
}

const SocialArrowLinks: FC<Props> = ({ actor, className }) => (
  <ContainerLinksArrows className={className}>
    <SocialMediaLinksButton socialMedia={actor.socialMediaChannels?.[0]} hideLabelIn={['desktop_1024']} />
    <VerticalLine />
    <InternalLinkButtonStyled href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} showIcon />
  </ContainerLinksArrows>
);
export default SocialArrowLinks;

const ContainerLinksArrows = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  paddingTop: 8,
  paddingRight: 8,
  gap: 16,
  height: 32,

  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 0,
    gap: 8,
    height: 'revert',
    alignItems: 'flex-end',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 16,
    paddingTop: 0,
    alignItems: 'center',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingRight: 24,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  width: 40,
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
const VerticalLine = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    height: 16,
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]}`,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 8,
    marginRight: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 8,
    marginRight: 8,
  },
}));
