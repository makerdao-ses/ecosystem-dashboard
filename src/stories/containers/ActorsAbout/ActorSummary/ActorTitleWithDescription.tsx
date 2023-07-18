import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorTitleAbout from './ActorTitleAbout';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

interface Props {
  showTextDescription: boolean;
  actorAbout: EcosystemActor;
}

export const ActorTitleWithDescription: React.FC<Props> = ({ showTextDescription, actorAbout }) => {
  const { isLight } = useThemeContext();
  const isPhone = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  return (
    <ContainerTitle>
      <ActorTitleAbout actorAbout={actorAbout} showTextDescription={showTextDescription} />
      {showTextDescription && actorAbout?.sentenceDescription !== '' && (
        <SummaryDescription hiddenTextDescription={isPhone || showTextDescription}>
          <TypographyDescription isLight={isLight} cutTextTooLong={actorAbout.sentenceDescription?.length > 500}>
            {actorAbout?.sentenceDescription || ''}
          </TypographyDescription>
        </SummaryDescription>
      )}
    </ContainerTitle>
  );
};

export default ActorTitleWithDescription;

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',

  height: 'fit-content',
  transition: 'all .3s ease',
  paddingTop: '8px',

  [lightTheme.breakpoints.up('table_375')]: {
    minHeight: 'fit-content',
    overflow: 'hidden',
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1130,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1184,
    margin: '0 auto',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1312,
  },
});

const SummaryDescription = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
  opacity: hiddenTextDescription ? 1 : 0,
  height: hiddenTextDescription ? 'fit-content' : 0,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  marginLeft: 4,
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 0,
  },
}));

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
  cutTextTooLong?: boolean;
}>(({ isLight, cutTextTooLong = 'false' }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  marginTop: '16px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '12px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: '8px',
    width: '100%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    whiteSpace: 'normal',
  },
  ...(cutTextTooLong && {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
}));
