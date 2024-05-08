import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ExpenseCategoryGroupProps extends React.PropsWithChildren {
  name: string;
}

const ExpenseCategoryGroup: React.FC<ExpenseCategoryGroupProps> = ({ name, children }) => {
  const { isLight } = useThemeContext();

  return (
    <GroupContainer>
      <NameContainer>
        <Lines isLight={isLight} />
        <Name isLight={isLight}>{name}</Name>
        <Lines isLight={isLight} />
      </NameContainer>

      <div>{children}</div>
    </GroupContainer>
  );
};

export default ExpenseCategoryGroup;

const NameContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  margin: '24px 0',

  [lightTheme.breakpoints.up('tablet_768')]: {
    margin: '16px 0',
  },
});

const GroupContainer = styled.div({
  [lightTheme.breakpoints.down('tablet_768')]: {
    '&:first-child > div:first-child': {
      marginTop: 40,
    },
  },
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '15px',
  letterSpacing: 1,
  color: isLight ? '#9FAFB9' : '#708390',
  padding: '0 16px',
  minWidth: 'fit-content',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Lines = styled.div<WithIsLight>(({ isLight }) => ({
  width: '100%',
  height: 1,
  background: isLight ? '#D4D9E1' : '#405361',
}));
