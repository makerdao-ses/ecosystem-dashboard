import styled from '@emotion/styled';
import React from 'react';
import DelegateExpenseBreakdownCard from './DelegateExpenseBreakdownCard';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';

interface Props {
  imageUrl: string;
  walletName: string;
  links: LinkModel[];
}

const DelegateExpenseBreakdown: React.FC<Props> = ({ imageUrl, links, walletName }) => (
  <Container>
    <Title>Delegate Expense Breakdown</Title>
    <DelegateExpenseBreakdownCard imageUrl={imageUrl} walletName={walletName} links={links} />
  </Container>
);

export default DelegateExpenseBreakdown;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.75px',
  color: '#231536',
  marginTop: 0,
  marginBottom: 24,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CardContainer = styled.div({
  // marginTop: 24,
  // display: 'flex',
  // flex: 1,
});
