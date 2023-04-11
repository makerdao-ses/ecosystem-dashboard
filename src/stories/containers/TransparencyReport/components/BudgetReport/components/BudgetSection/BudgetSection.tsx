import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BudgetSectionProps extends React.PropsWithChildren {
  title?: string;
  level?: 1 | 2;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({ children, level = 1, title }) => {
  const { isLight } = useThemeContext();
  const Wrapper = level === 1 ? WrapperL1 : WrapperL2;
  const LevelContainer = level === 1 ? Container : React.Fragment;

  return (
    <Wrapper isLight={isLight}>
      <LevelContainer>
        {title && <SectionTitle>{title}</SectionTitle>}

        <ChildrenContainer hasMargin={!!title}>{children}</ChildrenContainer>
      </LevelContainer>
    </Wrapper>
  );
};

export default BudgetSection;

const WrapperL1 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 0 32px',
  background: isLight ? '#F6F8F9' : '#F6000066',
  boxShadow: isLight ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '#f00',
  marginTop: 32,
}));

const WrapperL2 = styled.div<WithIsLight>(({ isLight }) => ({
  padding: '16px 32px 32px',
  background: isLight ? '#ECF1F3' : '#F6000066',
  marginTop: 32,
  borderRadius: 6,
}));

const ChildrenContainer = styled.div<{ hasMargin: boolean }>(({ hasMargin }) => ({
  marginTop: hasMargin ? 24 : 0,
}));
