import { styled } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { siteRoutes } from '@ses/config/routes';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/themes';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import RoleChip from '@/components/RoleChip/RoleChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamRole } from '@/core/enums/teamRole';
import { TeamStatus } from '@/core/models/interfaces/types';
import { ActorsLinkType, getActorLastMonthWithData, getLinksFromRecognizedActors } from '../../utils/utils';
import ActorLastModified from '../ActorLastModified/ActorLastModified';

import GroupedScopes from './GroupedScopes';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';
import type { Team } from '@ses/core/models/interfaces/team';
import type { PropsWithChildren } from 'react';

interface Props {
  queryStrings?: string;
  actor: Team;
}

const ActorItem: React.FC<Props> = ({ actor, queryStrings }) => {
  const [isEnabled] = useFlagsActive();
  const ActorSpaceLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <Link href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`} legacyBehavior passHref>
        <LinkColumSpace>{children}</LinkColumSpace>
      </Link>
    </ContainerLinkColum>
  );
  const ActorAboutLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <Link href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`} legacyBehavior passHref>
        <LinkColum>{children}</LinkColum>
      </Link>
    </ContainerLinkColum>
  );
  const socialIcons: SocialMediaChannels = actor.socialMediaChannels[0] ?? {};
  const keysWithNonNullValues = Object.keys(socialIcons).filter(
    (key): key is keyof SocialMediaChannels =>
      socialIcons[key as keyof SocialMediaChannels] !== null &&
      socialIcons[key as keyof SocialMediaChannels] !== undefined
  );

  return (
    <CardContainer socialLength={keysWithNonNullValues.length}>
      <ActorSpaceLink>
        <ContainerActorType>
          <WrapperEcosystemActor>
            <EcosystemActorText>Ecosystem Actor</EcosystemActorText>
            <ActorAvatar>
              <CircleAvatarExtended width="32px" height="32px" name={actor.name || 'Wallet'} image={actor.image} />
              <ContainerDescription>
                <ContainerShortCodeName>
                  {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && <ShortCode>{actor.shortCode}</ShortCode>}
                  <Name>{actor.name}</Name>
                </ContainerShortCodeName>

                {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                  <StatusMobile>
                    {' '}
                    <StatusChip status={TeamStatus.Accepted} />
                  </StatusMobile>
                )}
              </ContainerDescription>
            </ActorAvatar>
          </WrapperEcosystemActor>

          <TypeSection>
            <WrapperType>Role</WrapperType>
            <WrapperHiddenOnlyMobileCategory>
              <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
            </WrapperHiddenOnlyMobileCategory>
          </TypeSection>
          <WrapperCategoryScopeMobile>
            <WrapperCategoryScopeMobileInside>
              <RoleChip status={(actor.category?.[0] ?? '') as TeamRole} />
            </WrapperCategoryScopeMobileInside>
            {actor.scopes?.length > 0 &&
              (actor.scopes?.length > 2 ? (
                <MobileGroupedScopesBox>
                  <GroupedScopes scopes={actor.scopes} />
                </MobileGroupedScopesBox>
              ) : (
                <ContainerScopeMobile>
                  {actor.scopes?.map((item, index) => (
                    <ScopeChip scope={item} key={index} />
                  ))}
                </ContainerScopeMobile>
              ))}
          </WrapperCategoryScopeMobile>
        </ContainerActorType>
      </ActorSpaceLink>
      <Link href={siteRoutes.ecosystemActorAbout(actor.shortCode)} legacyBehavior passHref>
        <LineLink>
          <Line />
        </LineLink>
      </Link>
      <WrapperScopeLinks alignEnd={actor?.scopes?.length === 0}>
        <WrapperHiddenOnlyMobileScope>
          <ContainerScopeLastModified>
            <ActorAboutLink>
              <ScopeSection>
                {actor?.scopes?.length > 2 ? (
                  <GroupedScopes scopes={actor.scopes} />
                ) : (
                  actor?.scopes?.map((item, index) => <ScopeChip scope={item} key={index} />)
                )}
              </ScopeSection>
            </ActorAboutLink>

            <ContainerLastModifiedDesk>
              <ActorLastModified
                date={getActorLastMonthWithData(actor)}
                href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
              />
            </ContainerLastModifiedDesk>
          </ContainerScopeLastModified>
          <ActorAboutLink>
            <LinkSpace />
          </ActorAboutLink>
        </WrapperHiddenOnlyMobileScope>
        <SocialIconsSection>
          {actor?.socialMediaChannels && (
            <LinkContainer>
              <SocialMediaComponentStyled
                links={getLinksFromRecognizedActors(actor, ActorsLinkType)}
                fillDark="#ADAFD4"
                hasTooltip
              />
            </LinkContainer>
          )}
        </SocialIconsSection>
      </WrapperScopeLinks>
      <ContainerLastModifiedMobileTable>
        <ActorLastModified
          date={getActorLastMonthWithData(actor)}
          href={`${siteRoutes.ecosystemActorReports(actor.shortCode)}`}
        />
      </ContainerLastModifiedMobileTable>
    </CardContainer>
  );
};

export default ActorItem;

const CardContainer = styled(Card)<{ socialLength: number }>(({ theme, socialLength }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: 0,
    flexDirection: 'column',
    maxHeight: 'revert',
    minHeight: 'revert',
    height: 161,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    height: socialLength >= 4 ? 104 : 82,
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    ':hover': {
      background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
    },
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    height: 82,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    maxWidth: 1312,
    alignItems: 'center',
  },
}));

const ContainerActorType = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    maxWidth: 'fit-content',
    paddingTop: 'revert',
    justifyContent: 'revert',
  },
});
const EcosystemActorText = styled('div')(({ theme }) => ({
  display: 'none',
  [lightTheme.breakpoints.down('tablet_768')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginBottom: 0,
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '17px',
    color: theme.palette.isLight ? '#9FAFB9' : '#D2D4EF',
  },
}));

const WrapperEcosystemActor = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const ActorAvatar = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingLeft: 16,
  paddingTop: 16,
  paddingBottom: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 8,
    paddingLeft: 0,
    marginBottom: 0,
    paddingBottom: 0,
    width: 343,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 0,
    width: 190,
    paddingTop: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 210,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 292,
  },
});

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : '#D2D4EF',
  width: 160,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: '14px',
    width: 90,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: '14px',
    width: 110,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 211,
  },
}));

const TypeSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-end',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 16,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,

    flexDirection: 'row',
  },
});

const WrapperType = styled('div')(({ theme }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.isLight ? '#9FAFB9' : '#9FAFB9',

    lineHeight: '17px',
    alignItems: 'end',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const Line = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  marginBottom: 16,
  marginRight: 16,
  marginLeft: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 14,
    marginBottom: 4,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.avatars : theme.fusionShadows.shortShadow,
  minWidth: 32,
  minHeight: 32,
}));

const WrapperScopeLinks = styled('div')<{ alignEnd: boolean }>(({ alignEnd }) => ({
  display: 'flex',
  flexDirection: 'column',

  justifyContent: alignEnd ? 'flex-end' : 'space-between',
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 82,
    paddingBottom: 'revert',
    flex: 1.29,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 'revert',
    flex: 1.5,
  },
}));

const ScopeSection = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'center',
  marginBottom: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',
    marginBottom: 0,
    gap: 10,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 150,
    height: 82,
    gap: 4,
    marginLeft: -8,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 6,
    paddingTop: 6,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 150,
    marginLeft: 0,
    paddingTop: 6,
    flexDirection: 'column',
    gap: 4,
  },
});

const SocialIconsSection = styled('div')({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
    paddingRight: 16,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',

    width: 'fit-content',
    marginTop: -1,

    justifyContent: 'flex-end',
    paddingRight: 16,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
  },
});

const LinkContainer = styled('div')({});
export const SocialMediaComponentStyled = styled(SocialMediaComponent)(({ theme }) => ({
  '& a': {
    '&:hover svg path': {
      fill: theme.palette.isLight ? '#231536' : '#48495F',
      stroke: 'none',
    },
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 4,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    rowGap: 4,
    flexDirection: 'row',
    width: 176,
    paddingTop: 16,
    paddingBottom: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 'revert',
    justifyContent: 'revert',
    flexWrap: 'revert',
    rowGap: 'revert',
    flexDirection: 'revert',
    width: 'revert',
  },
}));

const ContainerLinkColum = styled('div')({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',

    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
  },
});

const LinkColum = styled('a')({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    padding: 16,
    flex: 1,
  },
});
const LinkColumSpace = styled('a')({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 'revert',
    minWidth: 430,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: 0,
  },
});

const LineLink = styled('a')({});

const ContainerLastModifiedDesk = styled('div')({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -1,
    marginLeft: -22,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    marginLeft: -14,
    marginTop: 6,
  },
});

const ContainerScopeLastModified = styled('div')({
  marginTop: 0,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',

    flexDirection: 'row',
    gap: 32,
    marginLeft: -30,
    marginTop: 6,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 38,
    marginTop: -1,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 40,
    marginLeft: 42,
    paddingTop: 2,
  },
});

const ContainerLastModifiedMobileTable = styled('div')({
  width: '100%',
  marginTop: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 10,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
});

const WrapperCategoryScopeMobile = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,
  paddingLeft: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});

const WrapperCategoryScopeMobileInside = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ContainerScopeMobile = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  justifyContent: 'flex-end',
  alignItems: 'end',
  paddingRight: 16,
});
const WrapperHiddenOnlyMobileCategory = styled('div')({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 12,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginRight: 0,
    marginLeft: 36,
  },
});

const WrapperHiddenOnlyMobileScope = styled('div')({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',

    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
  },
});

const LinkSpace = styled('div')({
  display: 'flex',
  flex: 1,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    height: 104,
  },
});

const MobileGroupedScopesBox = styled('div')({
  paddingRight: 16,
});

const ShortCode = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const ContainerDescription = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingRight: 16,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingRight: 'revert',
    justifyContent: 'revert',
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const StatusMobile = styled('div')({
  display: 'flex',
});
const ContainerShortCodeName = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
  [lightTheme.breakpoints.up('desktop_1024')]: {
    paddingTop: 4,
  },
});
