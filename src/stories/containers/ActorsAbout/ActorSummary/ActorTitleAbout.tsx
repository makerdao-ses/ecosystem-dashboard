import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';

import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';

import SocialMediaComponent from '@ses/components/SocialMediaComponent/SocialMediaComponent';
import ScopeChip from '@ses/containers/Actors/components/ScopeChip/ScopeChip';
import { ActorsLinkType, getLinksFromRecognizedActors } from '@ses/containers/Actors/utils/utils';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/light';

import React from 'react';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';

import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  actorAbout: EcosystemActor;
  hiddenTextDescription?: boolean;
}

export const ActorTitleAbout = ({ actorAbout, hiddenTextDescription }: Props) => {
  const { isLight } = useThemeContext();
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <Container>
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
                {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
                <TypographySES isLight={isLight}>{pascalCaseToNormalString(actorAbout?.category[0])}</TypographySES>
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
                {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
                <TypographySES isLight={isLight}>{pascalCaseToNormalString(actorAbout?.category[0])}</TypographySES>
              </ResponsiveTitle>
            </ContainerSeparateData>
          </ContainerTitle>
        </WrapperShowDesk>

        <ContainerCategoryConditional>
          {(!phoneDimensions || hiddenTextDescription) && (
            <CategoryContainer>
              {actorAbout?.scopes?.map((item, index) => (
                <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
              ))}
            </CategoryContainer>
          )}
          {phoneDimensions && hiddenTextDescription && (
            <ContainerLinks>
              <SocialMediaComponent
                links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
                fill="#708390"
                fillDark="#ADAFD4"
              />
            </ContainerLinks>
          )}
        </ContainerCategoryConditional>
      </ContainerColum>
      {!phoneDimensions && (
        <ContainerLinks>
          <SocialMediaComponent
            links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
            fill="#708390"
            fillDark="#ADAFD4"
          />
        </ContainerLinks>
      )}
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '100%',
  },
});

const TypographyTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    [lightTheme.breakpoints.down('table_375')]: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '4px',
      marginRight: '0px',
    },
    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '19px',
      marginLeft: '12px',
      marginRight: '0px',
      marginTop: 4,
    },
    [lightTheme.breakpoints.up('table_834')]: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '24px',
      letterSpacing: '0.4px',
      color: isLight ? '#231536' : '#E2D8EE',
      marginRight: '4px',
      fontFamily: 'Inter, sans-serif',
    },
  })
);

const TypographySES = styled.div<WithIsLight>(({ isLight }) => ({
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
  marginTop: 1,
  marginLeft: 12,
  padding: '4px 0px',
  borderBottom: `2px solid ${isLight ? '#708390' : '#787A9B'}`,
  color: isLight ? '#708390' : 'red',
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

  [lightTheme.breakpoints.down('table_375')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: '4px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: -1,
    marginLeft: 4,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    width: '272px',
    marginRight: 0,
    marginTop: 6,
    alignItems: 'flex-start',
    height: 'fit-content',
  },
});

const CircleContainer = styled.div({
  marginRight: 10,
  display: 'flex',
  flexDirection: 'row',
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
  '> div:first-of-type': {
    marginRight: '16px',
  },
  '* + *': {
    marginRight: '16px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    marginBottom: '16px',
    marginTop: '20px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  height: '22px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: 4,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginBottom: '18px',
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
  justifyContent: 'space-between',

  width: '100%',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    flexDirection: 'row',
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
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  [lightTheme.breakpoints.down('table_834')]: {
    flexWrap: 'wrap',
  },
});

const ResponsiveTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('table_375')]: {
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