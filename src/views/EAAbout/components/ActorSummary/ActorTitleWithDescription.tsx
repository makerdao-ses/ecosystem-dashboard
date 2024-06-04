import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import ActorTitleAbout from './ActorTitleAbout';
import type { Team } from '@ses/core/models/interfaces/team';

interface Props {
  showTextDescription: boolean;
  actorAbout: Team;
  cutTextTooLong?: boolean;
  className?: string;
}

export const ActorTitleWithDescription: React.FC<Props> = ({ showTextDescription, actorAbout, className }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerTitle className={className}>
      <ActorTitleAbout actorAbout={actorAbout} />
      {showTextDescription && actorAbout?.sentenceDescription !== '' && (
        <SummaryDescription>
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
  gap: 8,

  height: 'fit-content',
  transition: 'all .3s ease',

  paddingLeft: 16,
  paddingRight: 16,
  minHeight: 'fit-content',
  overflow: 'hidden',
  width: '100%',
  paddingTop: 0,
  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 32,
    paddingRight: 32,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    maxWidth: 1184,
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    margin: '0 auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 1312,
  },
});

const SummaryDescription = styled.div({
  marginLeft: 4,
  marginTop: 1,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginLeft: 0,
  },
});

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
  [lightTheme.breakpoints.between('mobile_375', 'tablet_768')]: {
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
