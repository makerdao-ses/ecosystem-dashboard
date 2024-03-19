import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';
import { SocialMediaComponentStyled } from '@ses/containers/Actors/components/ActorItem/ActorItem';
import ScopeChip from '@ses/containers/Actors/components/ScopeChip/ScopeChip';
import { ActorsLinkType, getLinksFromRecognizedActors } from '@ses/containers/Actors/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { Team } from '@ses/core/models/interfaces/team';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actorAbout: Team;
}

export const ActorTitleAbout = ({ actorAbout }: Props) => {
  const { isLight } = useThemeContext();
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.down('table_834'));

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
              filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
            }}
          />
          <WrapperShowOnlyMobile>
            <ContainerTitle>
              <ContainerSeparateData>
                <ResponsiveTitle>
                  <ShortCodeTitle>
                    <ShortCode isLight={isLight}>{actorAbout.shortCode}</ShortCode>
                    {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
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
                    <ShortCode isLight={isLight}>{actorAbout.shortCode}</ShortCode>
                    {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
                  </ShortCodeTitle>
                  {/* {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>} */}
                  <TypographyCategory isLight={isLight}>
                    {pascalCaseToNormalString(actorAbout.category?.[0] ?? '')}
                  </TypographyCategory>
                </ResponsiveTitle>
              </ContainerSeparateData>
            </ContainerTitle>
          </WrapperShowDesk>

          <ContainerCategoryConditional>
            <CategoryContainer>
              {actorAbout?.scopes?.map((item, index) => (
                <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
              ))}
            </CategoryContainer>

            {phoneDimensions && !isTable && (
              <ContainerLinks>
                <SocialMediaComponentStyled
                  isLight={isLight}
                  links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
                  fill="#708390"
                  fillDark="#ADAFD4"
                />
              </ContainerLinks>
            )}
            {isTable && (
              <ContainerLinks>
                <SocialMediaComponentStyled
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
  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    width: '100%',
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

  [lightTheme.breakpoints.up('table_834')]: {
    fontStyle: 'normal',
    width: 350,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 600,
    fontSize: '24px',
    letterSpacing: '0.4px',
    marginRight: '4px',
    fontFamily: 'Inter, sans-serif',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'revert',
    whiteSpace: 'normal',
  },
}));

const TypographyCategory = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  marginBottom: 8,
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
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 8,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: 400,
    fontSize: 14,
    borderRadius: 'revert',
    borderBottom: 'revert',
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
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: -1,
    marginLeft: 4,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 0,
    marginTop: 0,
    alignItems: 'flex-start',
    height: 'fit-content',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 6,
  },
});

const CircleContainer = styled.div({
  marginRight: 10,
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 16,
  },
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

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: 4,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginBottom: '16px',
    marginTop: 6,
    marginLeft: 4,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 4,
    marginRight: '24px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 8,
  },
});
const ContainerCategoryConditional = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  [lightTheme.breakpoints.up('table_834')]: {
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
  [lightTheme.breakpoints.down('desktop_1194')]: {
    alignItems: 'center',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    flexWrap: 'wrap',
  },
});

const ResponsiveTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('mobile_375')]: {
    width: 'auto',
    marginRight: '24px',
    marginBottom: '2px',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
    marginBottom: '6px',
    flexDirection: 'row',
    borderRadius: 'revert',
    borderBottom: 'revert',
  },
});

const WrapperShowOnlyMobile = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});
const WrapperShowDesk = styled.div({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
  },
});

const ContainerForAvatarLinks = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const ShortCode = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19.36px',
  color: isLight ? '#9FAFB9' : 'red',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
  },
}));

const ShortCodeTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: 4,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
  },
});
