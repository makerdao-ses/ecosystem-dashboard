import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import { DateTime } from 'luxon';
import React from 'react';
import GreenArrowDown from '../../SVG/GreenArrowDown';
import RedArrowUp from '../../SVG/RedArrowUp';
import TxHash from '../../TxHash/TxHash';

interface TransactionHeaderProps {
  isIncomingTransaction: boolean;
  name: string;
  date: string;
  toDate?: string | null;
  txHash: string | null;
}

const TransactionHeader: React.FC<TransactionHeaderProps> = ({ isIncomingTransaction, name, date, toDate, txHash }) => {
  const { isLight } = useThemeContext();

  const formattedDate = toDate
    ? `${DateTime.fromISO(date).toUTC().toFormat('dd-MMM-yyyy')} to ${DateTime.fromISO(toDate)
        .toUTC()
        .toFormat('dd-MMM-yyyy')}`
    : DateTime.fromISO(date).toUTC().toFormat("dd-MMM-yyyy HH:mm 'UTC'");
  return (
    <Wrapper>
      {isIncomingTransaction ? <GreenArrow /> : <RedArrow />}
      <Content>
        <Name isLight={isLight}>{name}</Name>
        <Date isLight={isLight}>{formattedDate}</Date>
        <ExtendedTxHash txHash={txHash} />
      </Content>
    </Wrapper>
  );
};

export default TransactionHeader;

const Wrapper = styled.div({
  display: 'flex',
  gap: 16,
  gridColumn: '1 / 3',
});

const commonArrowStyles = {
  width: 24,
  height: 24,
  marginTop: 5,
} as React.CSSProperties;

const GreenArrow = styled(GreenArrowDown)(() => ({
  ...commonArrowStyles,
}));

const RedArrow = styled(RedArrowUp)(() => ({
  ...commonArrowStyles,
}));

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const Name = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const Date = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#405361',
}));

const ExtendedTxHash = styled(TxHash)({
  marginTop: 0.5,
  gap: 2,
});
