import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { TeamStatus } from '@/core/models/interfaces/types';
import { StatusChipLegacy } from '@/stories/components/StatusChipLegacy/StatusChipLegacy';
import ScopeChip from '@/views/Actors/components/ScopeChip/ScopeChip';
import { ActorsLinkType, getLinksFromRecognizedActors } from '@/views/Actors/utils/utils';
import type { TeamScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actorAbout: Team;
}

export const ActorTitleAbout = ({ actorAbout }: Props) => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  return (
    <Container>
      <ContainerForAvatarLinks>
        <CircleContainer>
          <CircleAvatar
            width={phoneDimensions ? '32px' : '68px'}
            height={phoneDimensions ? '32px' : '68px'}
            name={actorAbout?.name || 'Ecosystem Actors'}
            image={actorAbout?.image}
            style={{
              minWidth: phoneDimensions ? '32px' : '68px',
              minHeight: phoneDimensions ? '32px' : '68px',
              filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
            }}
          />
          <WrapperShowOnlyMobile>
            <ContainerTitle>
              <ContainerSeparateData>
                <ResponsiveTitle>
                  <ShortCodeTitle>
                    {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                      <ShortCode isLight={isLight}>{actorAbout.shortCode}</ShortCode>
                    )}
                    {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
                    {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                      <Status>
                        <StatusChipLegacy status={TeamStatus.Accepted} />
                      </Status>
                    )}
                  </ShortCodeTitle>

                  <TypographyCategory isLight={isLight}>
                    {pascalCaseToNormalString(actorAbout.category?.[0] ?? '')}
                  </TypographyCategory>
                </ResponsiveTitle>
              </ContainerSeparateData>
            </ContainerTitle>
          </WrapperShowOnlyMobile>
        </CircleContainer>
        <ContainerColum>
          <WrapperShowDesk>
            <ContainerTitle>
              <ContainerSeparateData>
                <ResponsiveTitle>
                  <ShortCodeTitle>
                    {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                      <ShortCode isLight={isLight}>{actorAbout.shortCode}</ShortCode>
                    )}
                    {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
                  </ShortCodeTitle>
                  {isEnabled('FEATURE_ECOSYSTEM_ACTORS_STATUS_AND_CODE') && (
                    <Status>
                      <StatusChipLegacy status={TeamStatus.Accepted} />
                    </Status>
                  )}
                  <TypographyCategory isLight={isLight}>
                    {pascalCaseToNormalString(actorAbout.category?.[0] ?? '')}
                  </TypographyCategory>
                </ResponsiveTitle>
                <CategoryContainer>
                  {actorAbout?.scopes?.map((item, index) => (
                    <ScopeChip status={item.name as TeamScopeEnum} code={item.code} key={index} />
                  ))}
                </CategoryContainer>
              </ContainerSeparateData>
            </ContainerTitle>
            {isTable && (
              <ContainerLinks>
                <SocialMediaComponentStyled
                  iconsNumbers={getLinksFromRecognizedActors(actorAbout, ActorsLinkType).length ?? 0}
                  isLight={isLight}
                  links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
                  fill="#708390"
                  fillDark="#ADAFD4"
                />
              </ContainerLinks>
            )}
          </WrapperShowDesk>

          <ContainerCategoryConditional>
            {phoneDimensions && (
              <CategoryContainer>
                {actorAbout?.scopes?.map((item, index) => (
                  <ScopeChip status={item.name as TeamScopeEnum} code={item.code} key={index} />
                ))}
              </CategoryContainer>
            )}

            {phoneDimensions && !isTable && (
              <ContainerLinks>
                <SocialMediaComponentStyled
                  iconsNumbers={getLinksFromRecognizedActors(actorAbout, ActorsLinkType).length ?? 0}
                  isLight={isLight}
                  links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
                  fill="#708390"
                  fillDark="#ADAFD4"
                />
              </ContainerLinks>
            )}
          </ContainerCategoryConditional>
        </ContainerColum>
        {!phoneDimensions && !isTable && (
          <ContainerLinks>
            <SocialMediaComponentStyled
              iconsNumbers={getLinksFromRecognizedActors(actorAbout, ActorsLinkType).length ?? 0}
              isLight={isLight}
              links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
              fill="#708390"
              fillDark="#ADAFD4"
            />
          </ContainerLinks>
        )}
      </ContainerForAvatarLinks>
    </Container>
  );
};
export default ActorTitleAbout;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 400,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    width: '100%',
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'flex-start',
  },
});

const TypographyTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  color: isLight ? '#231536' : '#E2D8EE',

  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  marginRight: '0px',
  maxWidth: 216,
  width: 'fit-content',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontStyle: 'normal',
    maxWidth: 218,
    width: 'fit-content',
    fontWeight: 600,
    fontSize: '24px',
    letterSpacing: '0.4px',
    fontFamily: 'Inter, sans-serif',
    lineHeight: '29.05px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    maxWidth: 'revert',
    whiteSpace: 'normal',
  },
}));

const TypographyCategory = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  marginBottom: 6,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 12,
  fontStyle: 'normal',
  lineHeight: 'normal',
  borderRadius: 3,
  marginTop: 4,
  padding: '4px 0px',
  width: 'fit-content',
  borderBottom: `2px solid ${isLight ? '#708390' : '#787A9B'}`,
  color: '#708390',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 8,
    width: 'fit-content',
    marginTop: 6,
    fontWeight: 400,
    fontSize: 14,
    borderRadius: 'revert',
    borderBottom: 'revert',
    minWidth: 'fit-content',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginBottom: 2,
  },
}));

const ContainerLinks = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  height: '68px',
  marginRight: '6px',

  [lightTheme.breakpoints.down('mobile_375')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: -1,
    marginLeft: 4,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginRight: 0,
    marginTop: 0,
    alignItems: 'flex-start',
    height: 'fit-content',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 6,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 0,
  },
});

const CircleContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
});

const ContainerColum = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
});

const CategoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: 4,
  '> div:first-of-type': {
    marginRight: '16px',
  },
  '* + *': {
    marginRight: '16px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    marginBottom: '16px',
    marginTop: '20px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: 4,
    marginLeft: -1,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },

  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginBottom: 16,
    marginLeft: 4,
    marginTop: -2,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginTop: 5,
    marginLeft: 0,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 5,
    marginLeft: 4,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 10,
    marginLeft: 3,
  },
});
const ContainerCategoryConditional = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    rowGap: 10,
  },
});

const ContainerSeparateData = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexWrap: 'wrap',
  },
});

const ResponsiveTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('mobile_375')]: {
    width: 'auto',
    marginBottom: '2px',
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: '100%',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 'revert',
    borderBottom: 'revert',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 17,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 18,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 1,
  },
});

const WrapperShowOnlyMobile = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
});
const WrapperShowDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
});

const ContainerForAvatarLinks = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    gap: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ShortCode = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  minWidth: 'fit-content',
  fontSize: 16,
  lineHeight: '19.36px',
  color: isLight ? '#9FAFB9' : 'rgb(84, 105, 120)',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
    lineHeight: '29.05px',
  },
}));

const ShortCodeTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 4,
  [lightTheme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    gap: 4,
    width: 'fit-content',
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    alignItems: 'center',
    gap: 8,
  },
});

const SocialMediaComponentStyled = styled(SocialMediaComponent)<WithIsLight & { iconsNumbers: number }>(
  ({ isLight, iconsNumbers }) => ({
    '& a': {
      '&:hover svg path': {
        fill: isLight ? '#231536' : '#48495F',
        stroke: 'none',
      },
    },
    [lightTheme.breakpoints.up('tablet_768')]: {
      marginTop: 4,
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      rowGap: 4,
      flexDirection: 'row',
      width: iconsNumbers <= 3 ? 'fit-content' : 128,
    },
    [lightTheme.breakpoints.up('desktop_1024')]: {
      justifyContent: 'revert',
      flexWrap: 'revert',
      flexDirection: 'row',
      width: 'revert',
      maxWidth: 'revert',
    },
  })
);

const Status = styled.div({
  marginLeft: 14,
  marginTop: -1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 'revert',
    marginLeft: -2,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: 0,
  },
});
