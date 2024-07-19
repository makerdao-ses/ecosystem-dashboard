import { styled } from '@mui/material';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { siteRoutes } from '@ses/config/routes';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import LastModifiedActorCoreUnit from '@/views/CoreUnitsIndex/components/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import { getActorLastMonthWithData } from '../../utils/utils';
import EcosystemActorDescription from '../EcosystemActorDescription/EcosystemActorDescription';
import RoleItem from '../RoleItem/RoleItem';
import ScopeItem from '../ScopeItem/ScopeItem';

import SocialArrowLinks from '../SocialArrowLinks/SocialArrowLinks';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  queryStrings?: string;
  actor: Team;
}

const ActorItem: React.FC<Props> = ({ actor, queryStrings }) => {
  const socialIcons: SocialMediaChannels = actor.socialMediaChannels[0] ?? {};
  const keysWithNonNullValues = Object.keys(socialIcons).filter(
    (key): key is keyof SocialMediaChannels =>
      socialIcons[key as keyof SocialMediaChannels] !== null &&
      socialIcons[key as keyof SocialMediaChannels] !== undefined
  );

  return (
    <CardContainer socialLength={keysWithNonNullValues.length}>
      <ContainerActorType>
        <RowLink>
          <EcosystemActorDescription actor={actor} />
          <ShowOnlyMobile>
            <SocialArrowLinks actor={actor} />
          </ShowOnlyMobile>
        </RowLink>
        <LinkSpace href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} />
        <RowScopeRole>
          <RoleItem actor={actor} />
          <ScopeItem actor={actor} />
        </RowScopeRole>
        <LinkSpace href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} />

        <DivSpace href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} />
        <ContainerLastModifiedDesk>
          <LastModifiedActorCoreUnit
            date={getActorLastMonthWithData(actor)}
            href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
          />
        </ContainerLastModifiedDesk>
        <LinkSpace href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}`} />
        <ShowOnlyTable>
          <SocialArrowLinks actor={actor} />
        </ShowOnlyTable>
      </ContainerActorType>

      <ContainerLastModifiedMobileTable>
        <ActorLastModifiedStyled
          date={getActorLastMonthWithData(actor)}
          href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
        />
      </ContainerLastModifiedMobileTable>
      <LinkSpaceDesk href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`} />
      <ShowOnlyDesk>
        <SocialArrowLinks actor={actor} />
      </ShowOnlyDesk>
    </CardContainer>
  );
};

export default ActorItem;

const CardContainer = styled(Card)<{ socialLength: number }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  [theme.breakpoints.up('tablet_768')]: {
    padding: 0,
    flexDirection: 'column',
    maxHeight: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    ':hover': {
      background: theme.palette.isLight ? theme.palette.colors.gray[50] : 'rgba(41, 46, 56, 1)',
    },
  },

  [theme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    maxWidth: 1312,
    alignItems: 'center',
  },
}));

const ContainerActorType = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',

    paddingTop: 'revert',
  },
}));

const RowLink = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 0,

    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 0,
  },
}));

export const SocialMediaComponentStyled = styled(SocialMediaComponent)(({ theme }) => ({
  '& a': {
    '&:hover svg path': {
      fill: theme.palette.isLight ? '#231536' : '#48495F',
      stroke: 'none',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 4,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    rowGap: 4,
    flexDirection: 'row',
    width: 176,
    paddingTop: 16,
    paddingBottom: 16,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 'revert',
    justifyContent: 'revert',
    flexWrap: 'revert',
    rowGap: 'revert',
    flexDirection: 'revert',
    width: 'revert',
  },
}));

const ContainerLastModifiedMobileTable = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: 0,
  marginLeft: 0,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 4,
    marginLeft: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ActorLastModifiedStyled = styled(LastModifiedActorCoreUnit)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    padding: '3px 8px 4px 8px',
    fontSize: 14,
  },
}));

const ShowOnlyMobile = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));
const ShowOnlyTable = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
    justifyContent: 'flex-end',
    selfAlign: 'end',

    paddingTop: 8,
    paddingRight: 8,
    minWidth: 80,
  },
}));

const ShowOnlyDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const LinkSpace = styled(Link)({
  display: 'flex',
  flex: 1,
});
const LinkSpaceDesk = styled(Link)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 2,
    paddingTop: 27.5,
    paddingBottom: 27.5,
  },
}));

const ContainerLastModifiedDesk = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -4,
    marginLeft: 18,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    marginLeft: 6,
    marginTop: -4,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    marginTop: -4,
    marginLeft: -4,
  },
}));

const DivSpace = styled(Link)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    marginLeft: -10,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    minWidth: 50,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
    minWidth: 94,
  },
}));

const RowScopeRole = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingRight: 8,
  paddingLeft: 8,

  justifyContent: 'space-between',

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',

    '& #scope': {
      order: 1,
    },
    '& #role': {
      order: 2,
    },
    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: -15,
    marginTop: -2,
    alignItems: 'center',
    '& #role': {
      order: 1,
    },
    '& #scope': {
      order: 2,
    },
    paddingRight: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: -20,
    marginTop: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: -24,
  },
}));
