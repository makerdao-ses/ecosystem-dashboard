import styled from '@emotion/styled';
import EndgameAtlasBudgets from '@ses/containers/Finances/components/EndgameAtlasBudgets';
import React from 'react';
import CardNavigationFinance from '../../CardNavigationFinance/CardNavigationFinance';
import EndgameScopeBudgets from '../../EndgameScopeBudgets';
import MakerDAOLegacyBudgets from '../../MakerDAOLegacyBudgets';

const CardsNavigation: React.FC = () => (
  <ContainerCardsNavigation>
    <CardNavigationFinance
      href="#"
      svgImage={<EndgameAtlasBudgets />}
      title="Endgame Atlas Budgets"
      description="Finances of the core governance constructs described in the Maker Atlas."
    />
    <CardNavigationFinance
      href="#"
      svgImage={<EndgameScopeBudgets />}
      title="Endgame Scope Budgets"
      description="Detailed budgets of the practical DAO activities within Endgame."
    />
    <CardNavigationFinance
      href="#"
      svgImage={<MakerDAOLegacyBudgets />}
      title="MakerDAO Legacy Budgets"
      description="Historical records of MakerDAO expenses, prior to Endgame"
    />
  </ContainerCardsNavigation>
);

export default CardsNavigation;

const ContainerCardsNavigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 32,
  flexWrap: 'wrap',
});
