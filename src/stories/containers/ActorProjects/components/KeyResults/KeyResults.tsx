import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { KeyResult } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface KeyResultsProps {
  keyResults: KeyResult[];
}

const KeyResults: React.FC<KeyResultsProps> = ({ keyResults }) => {
  const { isLight } = useThemeContext();
  const isEmpty = keyResults.length === 0;
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  if (isMobile && isEmpty) return null;

  return (
    <ResultsContainer>
      <Title isLight={isLight}>Key Results</Title>
      <ResultList>
        {isEmpty ? (
          <NoKeyContainer>
            <NoKeyResults isLight={isLight}>No Key results yet</NoKeyResults>
          </NoKeyContainer>
        ) : (
          keyResults.map((keyResult) => (
            <ResultItem key={keyResult.id}>
              <KeyLink href={keyResult.link} target="_blank">
                {keyResult.title}
              </KeyLink>
            </ResultItem>
          ))
        )}
      </ResultList>
    </ResultsContainer>
  );
};

export default KeyResults;

const ResultsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: 15,
  gap: 8,
});

const Title = styled.h4<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '18px',
  color: isLight ? '#231536' : 'red',
  padding: '2px 8px',
  background: isLight ? 'rgba(236, 239, 249, 0.50)' : 'red',
}));

const ResultList = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: 0,
  padding: 0,
});

const NoKeyContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
});

const NoKeyResults = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#546978' : 'red',
  fontSize: 16,
  fontStyle: 'italic',
  lineHeight: '18px',
}));

const ResultItem = styled.li(() => ({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
}));

const KeyLink = styled(ExternalLink)(() => ({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '18px',
  paddingLeft: 22,
  position: 'relative',

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 8,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#447AFB',
  },
}));
