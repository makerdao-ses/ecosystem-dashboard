import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { CardPadding } from '../../types';
import BasicTHCell from '../Cells/BasicTHCell';
import AbstractCard from './AbstractCard';
import type { CardType, GenericCell } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface StandardCardProps {
  type?: CardType;
  cells?: GenericCell[];
  cardPadding?: CardPadding;
}

const StandardCard: React.FC<StandardCardProps> = ({ type = 'normal', cells, cardPadding = 16 }) => {
  const { isLight } = useThemeContext();
  if (!cells) return null;

  const headers = cells
    .filter((cell) => cell.isCardHeader)
    .map((cell) => <Header isLight={isLight}>{cell.value as React.ReactNode}</Header>);

  return (
    <AbstractCard>
      <CardPadding padding={cardPadding}>
        {headers}
        {cells
          .filter((cell) => !cell.isCardHeader)
          .map((cell, index) =>
            cell.inherit ? (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {cell.inherit && (
                  <BasicTHCell
                    cell={{
                      ...cell.inherit,
                      border: undefined,
                      cellPadding: '16px 0',
                    }}
                    as="div"
                  />
                )}
                <Value isLight={isLight} isBold={type === 'total'}>
                  {cell.value as string}
                </Value>
              </div>
            ) : (
              <Value isLight={isLight} isBold={type === 'total'} key={index}>
                {cell.value as string}
              </Value>
            )
          )}
      </CardPadding>
    </AbstractCard>
  );
};

export default StandardCard;

const CardPadding = styled.div<{ padding: CardPadding }>(({ padding }) => ({
  padding,
  marginBottom: 16,
}));

const Header = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Value = styled.div<WithIsLight & { isBold: boolean }>(({ isLight, isBold }) => ({
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.3,
  fontWeight: isBold ? 700 : 400,
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
}));
