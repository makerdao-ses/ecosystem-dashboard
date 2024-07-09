import { styled } from '@mui/material';
import { DateTime } from 'luxon';
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
  const formattedDate = toDate
    ? `${DateTime.fromISO(date).toUTC().toFormat('dd-MMM-yyyy')} to ${DateTime.fromISO(toDate)
        .toUTC()
        .toFormat('dd-MMM-yyyy')}`
    : DateTime.fromISO(date).toUTC().toFormat("dd-MMM-yyyy HH:mm 'UTC'");

  return (
    <Wrapper>
      {isIncomingTransaction ? <GreenArrow /> : <RedArrow />}
      <Content>
        <Name>{name}</Name>
        <Date>{formattedDate}</Date>
        <ExtendedTxHash txHash={txHash} />
      </Content>
    </Wrapper>
  );
};

export default TransactionHeader;

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  gridColumn: '1 / 3',

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
}));

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

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Name = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const Date = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
}));

const ExtendedTxHash = styled(TxHash)({
  marginTop: 0.5,
  gap: 2,
});
