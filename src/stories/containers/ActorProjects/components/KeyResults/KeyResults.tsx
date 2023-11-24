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

  const componentHeight = useMemo(() => {
    let height: number | 'auto' = 'auto';
    // padding top + padding bottom + title + gap
    const NON_VARIABLE_HEIGHTS = 17 + 8 + 22 + 8;

    // calculate the height of the key results based on which card
    // on the row has more items
    if (isShownBelow) {
      if (viewMode === 'detailed') {
        if (maxKeyResultsOnRow > 0) {
          const items = Math.min(6, maxKeyResultsOnRow);
          // items * its height + gap between items
          height = NON_VARIABLE_HEIGHTS + items * 18 + (items - 1) * 8;
        }
      } else {
        // compacted:
        if (!expanded) {
          if (maxKeyResultsOnRow === 0) {
            // all on the row are empty
            height = 'auto';
          } else if (maxKeyResultsOnRow <= 4) {
            const items = Math.min(4, maxKeyResultsOnRow);
            height = NON_VARIABLE_HEIGHTS + items * 18 + (items - 1) * 8;
          } else {
            // more than 4 so we have at least one card with the expand button
            height = NON_VARIABLE_HEIGHTS + 70 + 26;
          }
        }
      }
    } else if (maxKeyResultsOnRow > 0) {
      // is up 1280, they are at the right and at least one card has some items
      const items = Math.min(3, maxKeyResultsOnRow);
      height = NON_VARIABLE_HEIGHTS - 8 + items * 18 + (items - 1) * 8;
    }

    return height;
  }, [expanded, isShownBelow, maxKeyResultsOnRow, viewMode]);

  return (
    <ResultsContainer height={componentHeight}>
      <Title isLight={isLight}>{isMobile && isEmpty ? 'No Key Results' : 'Key results'}</Title>
      {((isMobile && !isEmpty) || !isMobile) && (
        <MaybeScrollableList scrollable={!isMobile && (viewMode === 'detailed' || expanded) && keyResults.length > 6}>
          {isEmpty ? (
            <NoKeyContainer>
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
      )}
      {isShownBelow && viewMode === 'compacted' && keyResults.length > 4 && (
        <ExpandableButtonItem expanded={expanded} handleToggleExpand={handleToggleExpand} />
      )}
    </ResultsContainer>
  );
};

export default KeyResults;

const ResultsContainer = styled.div<{
  height: 'auto' | number;
}>(({ height }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingTop: 17,
  marginTop: 'auto',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    // the height should be applicable from > 768 only!
    height,
  },

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingBottom: 8,
  },
}));

const Title = styled.h4<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '18px',
  color: isLight ? '#231536' : '#D2D4EF',
  padding: '2px 8px',
  background: isLight ? 'rgba(236, 239, 249, 0.50)' : 'rgba(35, 21, 54, 0.30)',
}));

const NoKeyContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch',
  height: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    paddingBottom: 8,
  },
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
