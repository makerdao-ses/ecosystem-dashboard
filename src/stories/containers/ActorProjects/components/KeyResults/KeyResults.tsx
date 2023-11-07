import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useMemo, useState } from 'react';
import ExpandableButtonItem from './ExpandableButtonItem';
import MaybeScrollableList from './MaybeScrollableList';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { KeyResult } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface KeyResultsProps {
  keyResults: KeyResult[];
  viewMode: DeliverableViewMode;
  isShownBelow: boolean;
}

const KeyResults: React.FC<KeyResultsProps> = ({ keyResults, viewMode, isShownBelow }) => {
  const { isLight } = useThemeContext();
  const isEmpty = keyResults.length === 0;
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const results = useMemo(() => {
    if (viewMode === 'compacted') {
      if (isShownBelow) {
        return expanded ? keyResults : keyResults.slice(0, keyResults.length > 4 ? 3 : 4);
      }
      // it is shown in the right side and it is > 1280px width
      return keyResults.slice(0, 3);
    }

    return keyResults;
  }, [expanded, isShownBelow, keyResults, viewMode]);

  if (isMobile && isEmpty) return null;

  return (
    <ResultsContainer>
      <Title isLight={isLight}>Key Results</Title>
      <MaybeScrollableList scrollable={!isMobile && viewMode === 'detailed' && keyResults.length > 6}>
        {isEmpty ? (
          <NoKeyContainer>
            <NoKeyResults isLight={isLight}>No Key results yet</NoKeyResults>
          </NoKeyContainer>
        ) : (
          <>
            {results.map((keyResult) => (
              <ResultItem key={keyResult.id}>
                <KeyLink href={keyResult.link} target="_blank">
                  {keyResult.title}
                </KeyLink>
              </ResultItem>
            ))}
            {isShownBelow && viewMode === 'compacted' && keyResults.length > 4 && (
              <ExpandableButtonItem expanded={expanded} handleToggleExpand={handleToggleExpand} />
            )}
          </>
        )}
      </MaybeScrollableList>
    </ResultsContainer>
  );
};

export default KeyResults;

const ResultsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 15,
  marginTop: 'auto',
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
  padding: '16px 0',
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
