import { styled } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import SocialMediaLinksButton from '@/components/ButtonLink/SocialMediaLinksButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import { buildQueryString } from '@/core/utils/urls';

interface Props {
  coreUnit: CoreUnit;
  className?: string;
}

export const CuRenderLinks: React.FC<Props> = ({ coreUnit, className }) => {
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return (
    <LinksContainer className={className}>
      <ContainerLinksArrowsDesk>
        <SocialMediaLinksButton socialMedia={coreUnit.socialMediaChannels?.[0]} hideLabelIn={['desktop_1024']} />
        <VerticalLine />
        <InternalLinkButtonStyled href={`${siteRoutes.coreUnitAbout(coreUnit.shortCode)}/${queryStrings}`} showIcon />
      </ContainerLinksArrowsDesk>
    </LinksContainer>
  );
};

const LinksContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 150,
  justifyContent: 'flex-end',

  paddingRight: '16px',

  height: '50px',
  cursor: 'pointer',
  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 0,
  },
}));

const ContainerLinksArrowsDesk = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    justifyContent: 'flex-end',
  },
}));

const VerticalLine = styled('div')(({ theme }) => ({
  marginLeft: 8,
  marginRight: 8,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 16,
    marginRight: 16,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
