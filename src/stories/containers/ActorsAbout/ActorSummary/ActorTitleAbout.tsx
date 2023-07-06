import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';

import { CircleAvatar } from '@ses/components/CircleAvatar/CircleAvatar';

import ScopeChip from '@ses/containers/Actors/components/ScopeChip/ScopeChip';
import { ActorsLinkType, getLinksFromRecognizedActors } from '@ses/containers/Actors/utils/utils';

import { DelegateSocialDtoLinks } from '@ses/containers/RecognizedDelegates/DelegateExpenseBreakdown/DelegateSocialLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
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
  const phoneDimensions = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const lessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));

  return (
    <Container>
      <CircleContainer>
        <CircleAvatar
          width={'68px'}
          height={'68px'}
          name={actorAbout?.name || 'Ecosystem Actors'}
          image={actorAbout?.image}
          style={{
            filter: 'drop-shadow(2px 4px 7px rgba(26, 171, 155, 0.25))',
          }}
        />
      </CircleContainer>
      <ContainerColum>
        <ContainerTitle>
          <ContainerSeparateData>
            <ResponsiveTitle>
              <CodeActor>{actorAbout?.code}</CodeActor>
              {actorAbout?.name && <TypographyTitle isLight={isLight}>{actorAbout?.name}</TypographyTitle>}
              <TypographySES isLight={isLight}>{actorAbout?.category[0]}</TypographySES>
            </ResponsiveTitle>
          </ContainerSeparateData>
        </ContainerTitle>

        <ContainerCategoryConditional>
          {(!(phoneDimensions || lessPhone) || hiddenTextDescription) && (
            <CategoryContainer>
              {actorAbout?.scopes?.map((item, index) => (
                <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
              ))}
            </CategoryContainer>
          )}
          {(phoneDimensions || lessPhone) && hiddenTextDescription && (
            <ContainerLinks>
              <DelegateSocialDtoLinks
                links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
                fill="#708390"
                fillDark="#ADAFD4"
              />
            </ContainerLinks>
          )}
        </ContainerCategoryConditional>
      </ContainerColum>
      {!(phoneDimensions || lessPhone) && (
        <ContainerLinks>
          <DelegateSocialDtoLinks
            links={getLinksFromRecognizedActors(actorAbout, ActorsLinkType) || []}
            fill="#708390"
            fillDark="#ADAFD4"
          />
        </ContainerLinks>
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 400,
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
      marginLeft: '4px',
      marginRight: '0px',
    },
    [lightTheme.breakpoints.up('table_834')]: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '24px',
      letterSpacing: '0.4px',
      color: isLight ? '#231536' : '#E2D8EE',
      marginRight: '8px',
      fontFamily: 'Inter, sans-serif',
    },
  })
);

const TypographySES = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    marginBottom: 8,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 'normal',
    color: isLight ? '#708390' : 'red',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginBottom: 6,
  },
}));
const CodeActor = styled.div({
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  lineHeight: 'normal',
  marginRight: 4,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});

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
    marginTop: '4px',
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
  marginRight: '16px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'none',
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
    marginTop: 6,
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginBottom: '16px',
    marginTop: '20px',
    marginRight: '24px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 12,
    marginRight: '24px',
    '> div:first-of-type': {
      marginRight: '8px',
    },
    '* + *': {
      marginRight: '8px',
    },
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 14,
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
  flexDirection: 'row',
  width: '100%',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: '100%',
    marginBottom: '6px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: 'auto',
    marginRight: '24px',
    marginBottom: '2px',
  },
});

export default ActorTitleAbout;
