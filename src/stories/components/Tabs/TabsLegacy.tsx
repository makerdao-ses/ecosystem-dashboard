import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomPopover } from '../CustomPopover/CustomPopover';
import Compress from '../svg/compress';
import Expand from '../svg/expand';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

export interface TabItem {
  item: string | JSX.Element;
  id: string;
  href?: string;
}

export interface TabsProps {
  items?: TabItem[];
  currentIndex: number;
  style?: CSSProperties;
  styleForTab?: CSSProperties;

  expandable?: boolean;
  expandedDefault?: boolean;
  compressedItems?: TabItem[];
  onExpand?: () => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  currentIndex,
  style,
  styleForTab,
  expandable,
  expandedDefault = true,
  compressedItems,
  onExpand,
}) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const [expanded, setExpanded] = useState(expandedDefault);

  const handleClick = (id: string, href?: string) => {
    if (id) {
      let path = router.asPath;
      if (path.lastIndexOf('#') !== -1) {
        path = path.substring(0, path.lastIndexOf('#'));
      }
      path += `#${id}`;
      router.push(path, undefined, { shallow: true });
    } else if (href) {
      router.push(href);
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
    onExpand?.();
  };

  return (
    <Wrapper className="no-select" style={style}>
      <Container isLight={isLight}>
        {expanded
          ? items?.map((element, i) => {
              let id = '';
              let item: string | JSX.Element;
              if (typeof element === 'string') {
                item = element;
              } else {
                item = element?.item;
                id = element?.id;
              }
              return (
                <Tab
                  isLight={isLight}
                  key={`${item}-${i}`}
                  active={i === currentIndex}
                  onClick={() => handleClick(id, element?.href)}
                  style={{
                    marginRight: i === 0 ? '32px' : undefined,
                    ...styleForTab,
                  }}
                >
                  {item}
                </Tab>
              );
            })
          : compressedItems?.map((element, i) => {
              let id = '';
              let item: string | JSX.Element;
              if (typeof element === 'string') {
                item = element;
              } else {
                item = element?.item;
                id = element?.id;
              }
              return (
                <Tab
                  isLight={isLight}
                  key={`${item}-${i}`}
                  active={i === currentIndex}
                  onClick={() => handleClick(id, element?.href)}
                  style={{
                    marginRight: i === 0 ? '32px' : undefined,
                    ...styleForTab,
                  }}
                >
                  {item}
                </Tab>
              );
            })}
        {expandable && (
          <Tab isLight={isLight} active={false} style={{ paddingBottom: 7 }} onClick={handleExpand}>
            {expanded ? (
              <IconPopover id={'expanded-view-popover'} title={'Auditor view'} isLight={isLight}>
                <Expand />
              </IconPopover>
            ) : (
              <IconPopover id={'compressed-view-popover'} title={'Default view'} isLight={isLight}>
                <Compress />
              </IconPopover>
            )}
          </Tab>
        )}
      </Container>
    </Wrapper>
  );
};

interface IconPopoverProps extends React.PropsWithChildren, WithIsLight {
  id: string;
  title: string;
}

const IconPopover: React.FC<IconPopoverProps> = ({ isLight, children, id, title }) => (
  <CustomPopover
    id={id}
    title={title}
    popupStyle={{
      color: isLight ? '#231536' : '#D2D4EF',
    }}
    sxProps={{
      marginLeft: '-11px',
      marginTop: '-3px',
    }}
  >
    {children}
  </CustomPopover>
);

const Wrapper = styled.div({
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
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

const Tab = styled.div<{ active: boolean; isLight: boolean }>(({ active, isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  color: active && isLight ? '#1AAB9B' : isLight && !active ? '#7E7E88' : !isLight && active ? '#1AAB9B' : '#708390',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 400,
  paddingBottom: '12px',
  borderBottom: `2px solid ${isLight ? (active ? '#1AAB9B' : 'transparent') : active ? '#1AAB9B' : 'transparent'}`,
  cursor: 'pointer',
  transition: 'all .3s ease',
  whiteSpace: 'nowrap',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '18px',
  },
}));
