import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorTitleAbout from './ActorTitleAbout';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

interface Props {
  hiddenTextDescription: boolean;
  actorAbout: EcosystemActor;
  showDescription: boolean;
}

export const ActorTitleWithDescription: React.FC<Props> = ({ hiddenTextDescription, actorAbout, showDescription }) => {
  const { isLight } = useThemeContext();
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const lessThanPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  return (
    <ContainerTitle hiddenTextDescription={hiddenTextDescription}>
      <ActorTitleAbout actorAbout={actorAbout} hiddenTextDescription={hiddenTextDescription} />
      {showDescription && actorAbout?.sentenceDescription && (
        <SummaryDescription hiddenTextDescription={lessThanPhone || phone || hiddenTextDescription}>
          <TypographyDescription isLight={isLight}>{actorAbout?.sentenceDescription || ''}</TypographyDescription>
        </SummaryDescription>
      )}
    </ContainerTitle>
  );
};

export default ActorTitleWithDescription;

const ContainerTitle = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  transition: 'all .3s ease',
  paddingTop: '8px',

  [lightTheme.breakpoints.down('table_375')]: {
    maxHeight: hiddenTextDescription ? 138 : 200,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  [lightTheme.breakpoints.up('table_375')]: {
    minHeight: hiddenTextDescription ? 138 : 200,
    overflow: 'hidden',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    minHeight: hiddenTextDescription ? 'fit-content' : 64,
    paddingLeft: 32,
    paddingRight: 32,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    maxWidth: 1130,
    maxHeight: hiddenTextDescription ? 138 : 200,
    paddingLeft: 0,
    paddingRight: 0,
    margin: '0 auto',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1184,
    margin: '0 auto',
    maxHeight: hiddenTextDescription ? 138 : 200,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1312,
    maxHeight: hiddenTextDescription ? 138 : 200,
  },
}));

const SummaryDescription = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
  opacity: hiddenTextDescription ? 1 : 0,
  height: hiddenTextDescription ? 'auto' : 0,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
}));

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  marginTop: '16px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '16px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: '8px',
    width: '100%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
}));
