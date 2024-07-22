import { styled } from '@mui/material';

import React from 'react';
import Container from '@/components/Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';

interface ExpenseSectionProps extends React.PropsWithChildren {
  title?: string;
  level?: 1 | 2;
  hasIcon?: boolean;
}

const ExpenseSection: React.FC<ExpenseSectionProps> = ({ children, level = 1, title, hasIcon = false }) => {
  const Wrapper = level === 1 ? WrapperL1 : WrapperL2;
  const LevelContainer = level === 1 ? L1Container : React.Fragment;

  return (
    <ExpensesContainer level={level}>
      <Wrapper>
        <LevelContainer>
          {title && (
            <SectionTitle hasExternalIcon={true} hasIcon={hasIcon}>
              {title}
            </SectionTitle>
          )}

          <ChildrenContainer hasMargin={!!title}>{children}</ChildrenContainer>
        </LevelContainer>
      </Wrapper>
    </ExpensesContainer>
  );
};

export default ExpenseSection;

const ExpensesContainer = styled('div')<{ level: 1 | 2 }>(({ level, theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,

  [theme.breakpoints.up('tablet_768')]: {
    ...(level === 2 && {
      paddingLeft: 0,
      paddingRight: 0,
    }),
  },
}));

const L1Container = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

const WrapperL1 = styled('div')(({ theme }) => ({
  padding: '8px 0',

  background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : '#1E222A',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  marginBottom: 24,

  [theme.breakpoints.up('tablet_768')]: {
    background: theme.palette.isLight ? theme.palette.colors.gray[100] : '#1E222A',
    padding: '8px 0 24px',
  },
}));

const WrapperL2 = styled('div')(({ theme }) => ({
  padding: '16px 8px',
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,
  marginTop: 16,

  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
    marginTop: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 32px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px 32px',
  },

  // custom style for the table header sections
  '.advanced-table--group-section': {
    lineHeight: '17px',
    background: theme.palette.isLight ? 'rgba(255, 255, 255, 0.4)' : 'rgba(30, 44, 55, 0.7)',
    padding: '8px 16px',
    marginTop: 24,
    marginBottom: 8,
  },
}));

const ChildrenContainer = styled('div')<{ hasMargin: boolean }>(({ hasMargin, theme }) => ({
  marginTop: hasMargin ? 16 : 0,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: hasMargin ? 24 : 0,
  },
}));
