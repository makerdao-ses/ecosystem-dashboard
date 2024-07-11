import { styled } from '@mui/material';
import BasicTHCell from '../Cells/BasicTHCell';
import AbstractCard from './AbstractCard';
import type { CardPadding, CardType, GenericCell } from '../../types';

interface StandardCardProps {
  type?: CardType;
  cells?: GenericCell[];
  cardPadding?: CardPadding;
}

const StandardCard: React.FC<StandardCardProps> = ({ type = 'normal', cells, cardPadding = 16 }) => {
  if (!cells) return null;

  const headers = cells
    .filter((cell) => cell.isCardHeader)
    .map((cell) => <Header>{cell.value as React.ReactNode}</Header>);

  return (
    <AbstractCard>
      <CardPaddingStyle padding={cardPadding}>
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
                <Value isBold={type === 'total'}>{cell.value as string}</Value>
              </div>
            ) : (
              <Value isBold={type === 'total'} key={index}>
                {cell.value as string}
              </Value>
            )
          )}
      </CardPaddingStyle>
    </AbstractCard>
  );
};

export default StandardCard;

const CardPaddingStyle = styled('div')<{ padding: CardPadding }>(({ padding }) => ({
  padding,
  marginBottom: 16,
}));

const Header = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const Value = styled('div')<{ isBold: boolean }>(({ theme, isBold }) => ({
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.3,
  fontWeight: isBold ? 700 : 400,
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));
