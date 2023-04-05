import styled from '@emotion/styled';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import Compress from '../svg/compress';
import Expand from '../svg/expand';
import Tab from './Tab';
import TabPopover from './TabPopover';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

export interface TabItem {
  item: string | JSX.Element;
  id: string;
}

export interface TabsProps {
  // tabs to be shown in default view
  tabs: TabItem[];
  // styles for each tab (extend the tabs styles)
  styleForTab?: CSSProperties;
  // default selected tab
  activeIdDefault?: string;

  // do this this `Tabs` allow to be expanded/compressed
  expandable?: boolean;
  // is this `Tabs` expanded by default
  expandedDefault?: boolean;
  // tabs to be shown in compressed view
  compressedTabs?: TabItem[];
  // callback when the `Tabs` is expanded/compressed
  onExpand?: () => void;
  // callback when the active tab is changed
  onChange?: ((currentId?: string, previousId?: string) => void) | ((currentId?: string) => void);
  // tooltip for the expand button
  expandToolTip?: {
    default: string;
    compressed: string;
  };
  // view key to be used in the URL
  viewKey?: string;
  // values to be used as `viewKey` query string
  viewValues?: {
    default: string;
    compressed: string;
  };
  // translate the anchor to the actual id. By default both are equals
  anchorToActualId?: (anchor: string) => string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  styleForTab,
  expandable,

  activeIdDefault,
  expandedDefault = true,
  compressedTabs = [],
  onExpand,
  onChange,
  expandToolTip,
  viewKey = 'view',
  viewValues = {
    default: 'default',
    compressed: 'compressed',
  },
  anchorToActualId = (anchor) => anchor,
}) => {
  const { isLight } = useThemeContext();
  const anchor = useUrlAnchor();
  const router = useRouter();
  const [expanded, setExpanded] = useState(() => {
    if ([viewValues.default, viewValues.compressed].includes(router.query[viewKey] as string)) {
      return router.query[viewKey] === viewValues.default;
    }
    return expandedDefault;
  });
  const [expandedActiveId, setExpandedActiveId] = useState<string | undefined>(activeIdDefault ?? tabs?.[0]?.id);
  const [compressedActiveId, setCompressedActiveId] = useState<string | undefined>(
    activeIdDefault ?? compressedTabs?.[0]?.id
  );
  const activeId = expanded ? expandedActiveId : compressedActiveId;

  const isValidAnchor = useCallback(() => {
    if (anchor) {
      const actualId = anchorToActualId(anchor);
      if (expanded) {
        return tabs.some((element) => element.id === actualId);
      } else {
        return !!compressedTabs?.some((element) => element.id === actualId);
      }
    } else {
      return true;
    }
  }, [anchor, anchorToActualId, compressedTabs, expanded, tabs]);

  useEffect(() => {
    // update active id
    if (anchor && isValidAnchor()) {
      const actualId = anchorToActualId(anchor);
      if (
        actualId !== activeId ||
        (expanded && actualId === tabs?.[0]?.id) ||
        (!expanded && actualId === compressedTabs?.[0]?.id)
      ) {
        onChange?.(actualId, activeId);
      }
      if (expanded) {
        setExpandedActiveId(actualId);
      } else {
        setCompressedActiveId(actualId);
      }
    } else {
      // select the first tab
      if (expanded) {
        setExpandedActiveId(tabs?.[0]?.id);
      } else {
        setCompressedActiveId(compressedTabs?.[0]?.id);
      }
    }
  }, [
    activeId,
    anchor,
    anchorToActualId,
    compressedActiveId,
    compressedTabs,
    expanded,
    expandedActiveId,
    isValidAnchor,
    onChange,
    tabs,
  ]);

  const handleExpand = () => {
    let id;
    let view;
    if (expanded) {
      // if we are in expanded mode, we're compressing
      id = compressedActiveId;
      view = viewValues.compressed;
      onChange?.(compressedActiveId, expandedActiveId);
    } else {
      // if we are in compressed mode, we're expanding
      id = expandedActiveId;
      view = viewValues.default;
      onChange?.(expandedActiveId, compressedActiveId);
    }

    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          [viewKey]: view,
        },
        hash: id,
      },
      undefined,
      { shallow: true }
    );
    setExpanded(!expanded);
    onExpand?.();
  };

  const activeTabs = expanded ? tabs : compressedTabs;
  return (
    <Wrapper className="no-select">
      <Container isLight={isLight}>
        {activeTabs?.map((element, index) => (
          <StyledTab
            id={element.id}
            active={expanded ? element.id === expandedActiveId : element.id === compressedActiveId}
            isFirst={index === 0}
            additionalStyles={styleForTab}
            key={`${element?.item}-${index}`}
          >
            {element?.item ?? element}
          </StyledTab>
        ))}
        {expandable && (
          <StyledTab active={false} additionalStyles={{ paddingBottom: 7 }} onClick={handleExpand}>
            {expanded ? (
              <TabPopover id={'expanded-view-popover'} title={expandToolTip?.compressed}>
                <Expand />
              </TabPopover>
            ) : (
              <TabPopover id={'compressed-view-popover'} title={expandToolTip?.default}>
                <Compress />
              </TabPopover>
            )}
          </StyledTab>
        )}
      </Container>
    </Wrapper>
  );
};

export default Tabs;

const Wrapper = styled.div({
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #405361',
  flex: 1,
  minWidth: 'fit-content',
  '* + *': {
    marginRight: '32px',
  },
  width: '100%',
  '& :last-child': {
    marginRight: '0px',
  },
}));

const StyledTab = styled(Tab)<{ isFirst?: boolean; additionalStyles?: React.CSSProperties }>(
  ({ isFirst = false, additionalStyles }) => ({
    marginRight: isFirst ? 32 : undefined,
    ...(additionalStyles ?? {}),
  })
);
