import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { siteRoutes } from '@ses/config/routes';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import { ActorsLinkType, getActorLastMonthWithData, getLinksFromRecognizedActors } from '../../utils/utils';
import ActorLastModified from '../ActorLastModified/ActorLastModified';
import ScopeChip from '../ScopeChip/ScopeChip';
import GroupedScopes from './GroupedScopes';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { PropsWithChildren } from 'react';

interface Props {
  queryStrings?: string;
  actor: Team;
}

const ActorItem: React.FC<Props> = ({ actor, queryStrings }) => {
  const { isLight } = useThemeContext();
  const isUp1194 = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));

  const ActorAboutLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <Link href={`${siteRoutes.ecosystemActorAbout(actor.shortCode)}/${queryStrings}`} legacyBehavior passHref>
        <LinkColum>{children}</LinkColum>
      </Link>
    </ContainerLinkColum>
  );

  return (
    <ExtendedGenericDelegate isLight={isLight} hasScope={actor.scopes?.length > 0}>
      <ActorAboutLink>
        <ContainerActorType>
          <WrapperEcosystemActor>
            <EcosystemActorText isLight={isLight}>Ecosystem Actor</EcosystemActorText>
            <ActorAvatar>
              <CircleAvatarExtended
                isLight={isLight}
                width="32px"
                height="32px"
                name={actor.name || 'Wallet'}
                image={actor.image}
              />
              <Name isLight={isLight}>{actor.name}</Name>
            </ActorAvatar>
          </WrapperEcosystemActor>

          <TypeSection>
            <WrapperType isLight={isLight}>Role</WrapperType>
            <WrapperHiddenOnlyMobileCategory>
              <ActorTitle isLight={isLight}>{pascalCaseToNormalString(actor.category?.[0] ?? '')}</ActorTitle>
            </WrapperHiddenOnlyMobileCategory>
          </TypeSection>
          <WrapperCategoryScopeMobile>
            <WrapperCategoryScopeMobileInside>
              <ActorTitle isLight={isLight}>{pascalCaseToNormalString(actor.category?.[0] ?? '')}</ActorTitle>
            </WrapperCategoryScopeMobileInside>
            {actor.scopes?.length > 0 &&
              (actor.scopes?.length > 2 ? (
                <MobileGroupedScopesBox>
                  <GroupedScopes scopes={actor.scopes} />
                </MobileGroupedScopesBox>
              ) : (
                <ContainerScopeMobile>
                  {actor.scopes?.map((item, index) => (
                    <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
                  ))}
                </ContainerScopeMobile>
              ))}
          </WrapperCategoryScopeMobile>
        </ContainerActorType>
      </ActorAboutLink>
      <Link href={siteRoutes.ecosystemActorAbout(actor.shortCode)} legacyBehavior passHref>
        <LineLink>
          <Line isLight={isLight} />
        </LineLink>
      </Link>
      <WrapperScopeLinks alignEnd={actor?.scopes?.length === 0}>
        <WrapperHiddenOnlyMobileScope>
          <ContainerScopeLastModified>
            <ActorAboutLink>
              <ScopeSection>
                {actor?.scopes?.length > 2 && isUp1194 ? (
                  <GroupedScopes scopes={actor.scopes} />
                ) : (
                  actor?.scopes?.map((item, index) => (
                    <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
                  ))
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
                isLight={isLight}
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
    </ExtendedGenericDelegate>
  );
};

export default ActorItem;

const ExtendedGenericDelegate = styled(GenericDelegateCard)<WithIsLight & { hasScope?: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: 0,
    flexDirection: 'column',
    maxHeight: 'revert',
    minHeight: 'revert',
    height: 161,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    height: 82,
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    ':hover': {
      background: isLight ? '#ECF1F3' : '#1E2C37',
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
    maxWidth: 1312,
    alignItems: 'center',
  },
}));

const ContainerActorType = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',

    flex: 1,
    paddingTop: 'revert',
    justifyContent: 'revert',
  },
});
const EcosystemActorText = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.down('table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginBottom: 0,
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '17px',
    color: isLight ? '#9FAFB9' : '#D2D4EF',
  },
}));

const WrapperEcosystemActor = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ActorAvatar = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
  paddingLeft: 16,
  paddingTop: 16,
  paddingBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
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
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 0,
    width: 210,

    height: 82,
    paddingTop: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 292,
  },
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: '14px',
    lineHeight: '17px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    fontSize: '14px',
    lineHeight: '17px',
    marginTop: 1,
  },
}));

const TypeSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-end',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
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

const WrapperType = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    color: isLight ? '#9FAFB9' : '#9FAFB9',

    lineHeight: '17px',
    alignItems: 'end',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));
const Line = styled.div<WithIsLight>(({ isLight }) => ({
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  marginBottom: 16,
  marginRight: 16,
  marginLeft: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 14,
    marginBottom: 4,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));

const ActorTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '14px',
  color: '#708390',
  borderRadius: 3,
  width: 'fit-content',
  paddingTop: 4,
  marginLeft: 16,
  height: 23,
  borderBottom: `2px solid ${isLight ? '#708390' : '#787A9B'}`,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 16,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: -1,
    marginLeft: 6,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 2,
    marginLeft: 6,
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)<WithIsLight>(({ isLight }) => ({
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
  minWidth: 32,
  minHeight: 32,
}));

const WrapperScopeLinks = styled.div<{ alignEnd: boolean }>(({ alignEnd }) => ({
  display: 'flex',
  flexDirection: 'column',

  justifyContent: alignEnd ? 'flex-end' : 'space-between',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 82,
    paddingBottom: 'revert',
    flex: 1.5,
  },
}));

const ScopeSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  justifyContent: 'center',
  marginBottom: 8,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'flex-start',
    marginBottom: 0,
    gap: 10,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 150,
    height: 82,
    gap: 4,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 6,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 150,
    marginLeft: 0,
    flexDirection: 'column',
    gap: 4,
  },
});

const SocialIconsSection = styled.div({
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
    paddingRight: 16,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
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

const LinkContainer = styled.div({});
export const SocialMediaComponentStyled = styled(SocialMediaComponent)<WithIsLight>(({ isLight }) => ({
  '& a': {
    '&:hover svg path': {
      fill: isLight ? '#231536' : '#48495F',
      stroke: 'none',
    },
  },
}));

const ContainerLinkColum = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',

    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flex: 1,
  },
});

const LinkColum = styled.a({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    padding: 16,
    flex: 1,
  },
});

const LineLink = styled.a({});

const ContainerLastModifiedDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: -1,
    marginLeft: -22,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
    marginLeft: -14,
  },
});

const ContainerScopeLastModified = styled.div({
  marginTop: 0,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',

    flexDirection: 'row',
    gap: 32,
    marginLeft: -30,
    marginTop: -1,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 38,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 40,
    marginLeft: 42,
    paddingTop: 2,
  },
});

const ContainerLastModifiedMobileTable = styled.div({
  width: '100%',
  marginTop: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 10,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
});

const WrapperCategoryScopeMobile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 15,

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

const WrapperCategoryScopeMobileInside = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const ContainerScopeMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  justifyContent: 'flex-end',
  alignItems: 'end',
  paddingRight: 16,
});
const WrapperHiddenOnlyMobileCategory = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
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

const WrapperHiddenOnlyMobileScope = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',

    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    flex: 1,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
  },
});

const LinkSpace = styled.div({
  display: 'flex',
  flex: 1,
});

const MobileGroupedScopesBox = styled.div({
  paddingRight: 16,
});
