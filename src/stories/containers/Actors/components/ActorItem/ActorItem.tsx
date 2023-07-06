import styled from '@emotion/styled';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import { siteRoutes } from '@ses/config/routes';
import { DelegateSocialDtoLinks } from '@ses/containers/RecognizedDelegates/DelegateExpenseBreakdown/DelegateSocialLink';
import GenericDelegateCard from '@ses/containers/RecognizedDelegates/components/GenericDelegateCard';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import { ActorsLinkType, getLinksFromRecognizedActors } from '../../utils/utils';
import ScopeChip from '../ScopeChip/ScopeChip';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actor: EcosystemActor;
}

const ActorItem: React.FC<Props> = ({ actor }) => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();

  return (
    <>
      {isEnabled('FEATURE_ECOSYSTEM_ACTORS_ABOUT') ? (
        <Link href={`${siteRoutes.ecosystemActorAbout(actor.code)}`} passHref legacyBehavior>
          <Item isLight={isLight}>
            <ExtendedGenericDelegate
              isLight={isLight}
              hasScope={actor?.scopes.length > 0}
              isHoveEnable={isEnabled('FEATURE_ECOSYSTEM_ACTORS_ABOUT')}
            >
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
                  <ActorTitle isLight={isLight}>{pascalCaseToNormalString(actor.category[0])}</ActorTitle>
                </TypeSection>
              </ContainerActorType>
              <Line isLight={isLight} />
              <WrapperScopeLinks alignEnd={actor?.scopes.length === 0}>
                {actor?.scopes.length > 0 && (
                  <ScopeSection>
                    {actor?.scopes?.map((item) => (
                      <ScopeChip status={item.name as ActorScopeEnum} code={item.code} />
                    ))}
                  </ScopeSection>
                )}
                <SocialIconsSection>
                  {actor?.socialMediaChannels && (
                    <LinkContainer>
                      <DelegateSocialDtoLinksStyled
                        isLight={isLight}
                        links={getLinksFromRecognizedActors(actor, ActorsLinkType)}
                        fillDark="#ADAFD4"
                        hasTooltip
                      />
                    </LinkContainer>
                  )}
                </SocialIconsSection>
              </WrapperScopeLinks>
            </ExtendedGenericDelegate>
          </Item>
        </Link>
      ) : (
        <ExtendedGenericDelegate
          isLight={isLight}
          hasScope={actor?.scopes.length > 0}
          isHoveEnable={isEnabled('FEATURE_ECOSYSTEM_ACTORS_ABOUT')}
        >
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
              <ActorTitle isLight={isLight}>{pascalCaseToNormalString(actor.category[0])}</ActorTitle>
            </TypeSection>
          </ContainerActorType>
          <Line isLight={isLight} />
          <WrapperScopeLinks alignEnd={actor?.scopes.length === 0}>
            {actor?.scopes.length > 0 && (
              <ScopeSection>
                {actor?.scopes?.map((item) => (
                  <ScopeChip status={item.name as ActorScopeEnum} code={item.code} />
                ))}
              </ScopeSection>
            )}
            <SocialIconsSection>
              {actor?.socialMediaChannels && (
                <LinkContainer>
                  <DelegateSocialDtoLinksStyled
                    isLight={isLight}
                    links={getLinksFromRecognizedActors(actor, ActorsLinkType)}
                    fillDark="#ADAFD4"
                    hasTooltip
                  />
                </LinkContainer>
              )}
            </SocialIconsSection>
          </WrapperScopeLinks>
        </ExtendedGenericDelegate>
      )}
    </>
  );
};

export default ActorItem;

const Item = styled.a<WithIsLight>({});
const ExtendedGenericDelegate = styled(GenericDelegateCard)<WithIsLight & { hasScope: boolean; isHoveEnable: boolean }>(
  ({ isLight, hasScope, isHoveEnable }) => ({
    background: isLight ? '#FFFFFF' : '#10191F',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    minHeight: hasScope ? '214px' : '183px',
    ...(isHoveEnable && {
      ':hover': {
        background: isLight ? '#ECF1F3' : '#1E2C37',
      },
    }),

    [lightTheme.breakpoints.up('table_834')]: {
      padding: '8px 16px',
      flexDirection: 'column',
      maxHeight: 'revert',
      height: 129,
      minHeight: 'revert',
    },
    [lightTheme.breakpoints.up('desktop_1194')]: {
      height: 82,
      flexDirection: 'row',
      padding: '16px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    [lightTheme.breakpoints.up('desktop_1440')]: {
      flexDirection: 'row',
      gap: 59,
      height: 82,
      maxWidth: 1312,
      alignItems: 'center',
    },
  })
);

const ContainerActorType = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const EcosystemActorText = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#9FAFB9' : '#D2D4EF',
  marginBottom: 7,
  [lightTheme.breakpoints.down('table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
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
  marginBottom: 22,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 0,
    width: 343,
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
    paddingLeft: 18,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 60,
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
    marginBottom: 4,
    lineHeight: '17px',
    alignItems: 'end',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'none',
  },
}));
const Line = styled.div<WithIsLight>(({ isLight }) => ({
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  marginTop: 22,
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 16,
    marginBottom: 12,
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
  lineHeight: '17px',
  color: '#708390',
  borderRadius: 3,
  width: 'fit-content',
  paddingTop: 4,
  paddingBottom: 2,
  borderBottom: `2px solid ${isLight ? '#708390' : '#787A9B'}`,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 10,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: -1,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 1,
  },
}));

const CircleAvatarExtended = styled(CircleAvatar)<WithIsLight>(({ isLight }) => ({
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 4px 7px rgba(26, 171, 155, 0.25)',
}));

const WrapperScopeLinks = styled.div<{ alignEnd: boolean }>(({ alignEnd }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: alignEnd ? 'flex-end' : 'space-between',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 150,
    gap: 4,
    marginRight: 52,
    marginBottom: 0,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginRight: 70,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 220,
    marginRight: 58,
    flexDirection: 'column',
    gap: 4,
  },
});

const SocialIconsSection = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -6,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
    width: 320,
    marginTop: -1,
    justifyContent: 'flex-end',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    flexDirection: 'row',
  },
});

const LinkContainer = styled.div({});
const DelegateSocialDtoLinksStyled = styled(DelegateSocialDtoLinks)<WithIsLight>(({ isLight }) => ({
  '& a': {
    '&:hover svg path': {
      fill: isLight ? '#231536' : '#48495F',
      stroke: 'none',
    },
  },
}));
