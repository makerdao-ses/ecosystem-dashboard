import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TabProps extends React.PropsWithChildren {
  id?: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({ children, id, active = false, onClick, className }) => {
  const { isLight } = useThemeContext();

  const content = (
    <StyledTab isLight={isLight} active={active} onClick={onClick} className={className}>
      {children}
    </StyledTab>
  );

  if (!id) return content;

  return (
    <Link href={`#${id}`} passHref>
      {content}
    </Link>
  );
};

export default Tab;

const StyledTab = styled.a<WithIsLight & { active: boolean }>(({ active, isLight }) => ({
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
