import { styled } from '@mui/material';
import { removeEmptyProperties } from '@ses/core/utils/urls';
import { useRouter } from 'next/router';
import ArrowCollapse from 'public/assets/svg/arrow_collapse.svg';
import ArrowExpand from 'public/assets/svg/arrow_expand.svg';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tab from './Tab';
import TabPopover from './TabPopover';
import type { CSSProperties } from 'react';

export interface TabItem {
  item: string | JSX.Element;
  id: string;
  href?: string;
}

export interface InternalTabsProps {
  isExpanded: boolean;
  setExpanded: (isExpanded: boolean) => void;
  queryValue?: string;
  expandedActiveId?: string;
  setExpandedActiveId: React.Dispatch<React.SetStateAction<string | undefined>>;
  compressedActiveId?: string;
  setCompressedActiveId: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  // callback called after the `Tabs` is initialized
  onInit?: (internalState: InternalTabsProps) => void;
  // callback when the `Tabs` is expanded/compressed
  onExpand?: (isExpanded: boolean) => void;
  // callback when the active tab is changed
  onChange?: ((currentId?: string, previousId?: string) => void) | ((currentId?: string) => void);
  // tooltip for the expand button
  expandToolTip?: {
    default: string;
    compressed: string;
  };
  // query string to be used
  tabQuery?: string;
  // view key to be used in the URL
  viewKey?: string;
  // values to be used as `viewKey` query string
  viewValues?: {
    default: string;
    compressed: string;
  };
  // is this `Tabs` self managed or managed by the user (dev)
  controlled?: boolean;
  // selected tab when this `Tabs` are controlled (true)
  selectedTabId?: string;
  // Customize
  className?: string;
  // When compress the icon its the only select there is not more values
  showBorderBottomIconTab?: boolean;
  isDisablePopover?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  styleForTab,
  expandable,

  activeIdDefault,
  expandedDefault = true,
  compressedTabs = [],
  onInit,
  onExpand,
  onChange,
  expandToolTip,
  tabQuery = 'tab',
  viewKey = 'view',
  showBorderBottomIconTab = false,
  viewValues = {
    default: 'default',
    compressed: 'compressed',
  },
  controlled = false,
  selectedTabId,
  className,
  isDisablePopover = false,
}) => {
  const router = useRouter();
  const query = router.query;
  const queryValue = useMemo(() => {
    const value = query[tabQuery];
    if (Array.isArray(value) && value.length > 0) {
      return value[0];
    }
    if (typeof value === 'string') {
      return value;
    }
  }, [query, tabQuery]);
  const [expanded, setExpanded] = useState(() => {
    if ([viewValues.default, viewValues.compressed].includes(router.query[viewKey] as string)) {
      return router.query[viewKey] === viewValues.default;
    }
    return expandedDefault;
  });

  const isValidQueryValue = useCallback(
    (value: string, expanded: boolean): boolean => {
      if (value) {
        const actualId = value;
        if (expanded) {
          return tabs.some((element) => element.id === actualId);
        } else {
          return !!compressedTabs?.some((element) => element.id === actualId);
        }
      } else {
        return true;
      }
    },
    [compressedTabs, tabs]
  );

  const [expandedActiveId, setExpandedActiveId] = useState<string | undefined>(() => {
    if (!!queryValue && isValidQueryValue(queryValue, true)) {
      onChange?.(queryValue, undefined);
      return queryValue;
    }
    return activeIdDefault ?? tabs?.[0]?.id;
  });
  const [compressedActiveId, setCompressedActiveId] = useState<string | undefined>(() => {
    if (!!queryValue && isValidQueryValue(queryValue, false)) {
      onChange?.(queryValue, undefined);
      return queryValue;
    }
    return activeIdDefault ?? compressedTabs?.[0]?.id;
  });
  const activeId = expanded ? expandedActiveId : compressedActiveId;

  useEffect(() => {
    // called on init...
    if (onInit) {
      onInit({
        isExpanded: expanded,
        setExpanded,
        queryValue,
        expandedActiveId,
        setExpandedActiveId,
        compressedActiveId,
        setCompressedActiveId,
      });
    }
    // this hook should be called only once even if the dependencies changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!controlled) {
      // update active id
      if (queryValue && isValidQueryValue(queryValue, expanded)) {
        if (
          queryValue !== activeId ||
          (expanded && queryValue === tabs?.[0]?.id) ||
          (!expanded && queryValue === compressedTabs?.[0]?.id)
        ) {
          onChange?.(queryValue, activeId);
        }
        if (expanded) {
          setExpandedActiveId(queryValue);
        } else {
          setCompressedActiveId(queryValue);
        }
      } else {
        // select the first tab
        if (expanded) {
          setExpandedActiveId(tabs?.[0]?.id);
        } else {
          setCompressedActiveId(compressedTabs?.[0]?.id);
        }
      }
    }
  }, [
    activeId,
    compressedActiveId,
    compressedTabs,
    controlled,
    expanded,
    expandedActiveId,
    isValidQueryValue,
    onChange,
    queryValue,
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
          ...removeEmptyProperties(router.query),
          [viewKey]: view,
          [tabQuery]: id,
        },
      },
      undefined,
      { shallow: true }
    );
    onExpand?.(!expanded);
    setExpanded(!expanded);
  };

  const activeTabs = expanded ? tabs : compressedTabs;

  return (
    <Wrapper className="no-select">
      <Container className={className}>
        {activeTabs?.map((element, index) => (
          <StyledTab
            id={element.id}
            href={element.href}
            tabQuery={tabQuery}
            active={
              controlled
                ? element.id === selectedTabId
                : expanded
                ? element.id === expandedActiveId
                : element.id === compressedActiveId
            }
            isFirst={index === 0}
            additionalStyles={styleForTab}
            key={`${element?.item}-${index}`}
          >
            {element?.item ?? element}
          </StyledTab>
        ))}
        {expandable && (
          <StyledTabIcon
            showBorderBottomIconTab={showBorderBottomIconTab}
            expanded={expanded}
            active={false}
            additionalStyles={{ paddingBottom: 7 }}
            onClick={handleExpand}
          >
            {expanded ? (
              !isDisablePopover ? (
                <TabPopover id="expanded-view-popover" title={expandToolTip?.compressed}>
                  <ArrowExpand width={24} height={24} key="expanded-view-popover" />
                </TabPopover>
              ) : (
                <ArrowExpand width={24} height={24} key="expanded-view-popover" />
              )
            ) : !isDisablePopover ? (
              <TabPopover id="compressed-view-popover" title={expandToolTip?.default}>
                <ArrowCollapseStyled width={24} height={24} key="compressed-view-popover" />
              </TabPopover>
            ) : (
              <ArrowCollapseStyled width={24} height={24} key="compressed-view-popover" />
            )}
          </StyledTabIcon>
        )}
      </Container>
    </Wrapper>
  );
};

export default Tabs;

const Wrapper = styled('div')({
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const Container = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  borderBottom: theme.palette.isLight
    ? `1px solid ${theme.palette.colors.gray[500]}`
    : `1px solid ${theme.palette.colors.slate[400]}`,
  flex: 1,
  minWidth: 'fit-content',
  '* + *': {
    marginRight: 20,
  },
  width: '100%',
  '& :last-child': {
    marginRight: 0,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    '* + *': {
      marginRight: 40,
    },
  },
}));

const StyledTab = styled(Tab)<{ isFirst?: boolean; additionalStyles?: React.CSSProperties }>(
  ({ isFirst = false, additionalStyles, theme }) => ({
    marginRight: isFirst ? 20 : undefined,
    ...(additionalStyles ?? {}),

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
    },
    '&:hover path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },

    [theme.breakpoints.up('desktop_1024')]: {
      marginRight: isFirst ? 40 : undefined,
    },
  })
);

const ArrowCollapseStyled = styled(ArrowCollapse)(({ theme }) => ({
  '& path': {
    // Note use important to override styles in StyledTab
    fill: `${theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]} !important`,
  },
}));

const StyledTabIcon = styled(StyledTab)<{ expanded: boolean; showBorderBottomIconTab?: boolean }>(
  ({ theme, expanded, showBorderBottomIconTab = false }) => ({
    borderBottom: showBorderBottomIconTab
      ? `2px solid ${
          theme.palette.isLight
            ? expanded
              ? 'transparent'
              : theme.palette.colors.gray[900]
            : expanded
            ? 'transparent'
            : theme.palette.colors.gray[50]
        }`
      : 'transparent',
  })
);
