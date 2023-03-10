import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
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
        <NameLines
          sx={{
            bgcolor: isLight ? '#9FAFB9' : 'red',
          }}
        />
        <Name isLight={isLight}>{name}</Name>
        <NameLines
          sx={{
            bgcolor: isLight ? '#9FAFB9' : 'red',
          }}
        />
      </NameContainer>

      <div>{children}</div>
    </GroupContainer>
  );
};

export default ExpenseCategoryGroup;

const GroupContainer = styled.div({});

const NameContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
});

const Name = styled.div<WithIsLight>(({ isLight }) => ({
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '15px',
  letterSpacing: 1,
  color: isLight ? '#9FAFB9' : 'red',
  padding: '0 16px',
  minWidth: 'fit-content',
}));

const NameLines = styled(Divider)({
  width: '100%',
});
