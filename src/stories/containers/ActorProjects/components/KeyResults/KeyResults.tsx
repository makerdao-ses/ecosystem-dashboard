import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useMemo } from 'react';
import ExpandableButtonItem from './ExpandableButtonItem';
import MaybeScrollableList from './MaybeScrollableList';
import type { DeliverableViewMode } from '../ProjectCard/ProjectCard';
import type { KeyResult } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface KeyResultsProps {
  keyResults: KeyResult[];
  viewMode: DeliverableViewMode;
  isShownBelow: boolean;
  expanded: boolean;
  handleToggleExpand: () => void;
  maxKeyResultsOnRow: number;
}

const KeyResults: React.FC<KeyResultsProps> = ({
  keyResults,
  viewMode,
  isShownBelow,
  expanded,
  handleToggleExpand,
  maxKeyResultsOnRow,
}) => {
  const { isLight } = useThemeContext();
  const isEmpty = keyResults.length === 0;
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

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
      <Title isLight={isLight}>Key results</Title>
      <MaybeScrollableList scrollable={!isMobile && (viewMode === 'detailed' || expanded) && keyResults.length > 6}>
        {isEmpty ? (
          <NoKeyContainer maxKeyResultsOnRow={maxKeyResultsOnRow}>
            <NoKeyResults>No Key results yet</NoKeyResults>
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
          </>
        )}
      </MaybeScrollableList>
      {isShownBelow && viewMode === 'compacted' && keyResults.length > 4 && (
        <ExpandableButtonItem expanded={expanded} handleToggleExpand={handleToggleExpand} />
      )}
    </ResultsContainer>
  );
};

export default KeyResults;

const ResultsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 17,
  marginTop: 'auto',
  gap: 8,

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingBottom: 8,
  },
});

const Title = styled.h4<WithIsLight>(({ isLight }) => ({
  display: 'none',
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '18px',
  color: isLight ? '#231536' : '#D2D4EF',
  padding: '2px 8px',
  background: isLight ? 'rgba(236, 239, 249, 0.50)' : 'rgba(35, 21, 54, 0.30)',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'block',
  },
}));

const NoKeyContainer = styled.div<{ maxKeyResultsOnRow: number }>(({ maxKeyResultsOnRow }) => {
  let height: number | string = 'auto';
  // TODO: test 1-3 items per row to adjust the sizes
  if (maxKeyResultsOnRow >= 4) {
    height = 102;
  } else if (maxKeyResultsOnRow === 3) {
    height = 70;
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',

    [lightTheme.breakpoints.up('tablet_768')]: {
      paddingBottom: 8,
      height,
    },
  };
});

const NoKeyResults = styled.span({
  color: '#546978',
  fontSize: 16,
  fontStyle: 'italic',
  lineHeight: '18px',
  padding: '16px 0',
});

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
  gap: 6,

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
