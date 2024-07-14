import { styled } from '@mui/material';
import { DateTime } from 'luxon';
import MemoCheck from 'public/assets/svg/memo_check.svg';
import { useMemo } from 'react';

export type CUNewExpenseReportProps = {
  description: string;
  date: string;
};

const NewExpenseReport: React.FC<CUNewExpenseReportProps> = ({ description, date }) => {
  const dateStr = useMemo(() => DateTime.fromISO(date).toUTC().toFormat('dd-LLL-yyyy HH:mm ZZZZ'), [date]);

  return (
    <Container>
      <Left>
        <MemoCheckIcon />
      </Left>
      <Text>
        <>
          {description} on {dateStr}
        </>
      </Text>
      <Right>
        <Circle />
      </Right>
    </Container>
  );
};

export default NewExpenseReport;

const Container = styled('div')({
  position: 'relative',
  marginBottom: 16,
  display: 'flex',
  width: '100%',
});

const Text = styled('div')(({ theme }) => ({
  margin: '0 16px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  maxWidth: 400,
  minWidth: '61%',
  textAlign: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    textAlign: 'left',
    minWidth: '64%',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
    minWidth: '48.5%',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 'fit-content',
  },
}));

const Left = styled('div')(({ theme }) => ({
  minWidth: 40,
  width: '100%',
  display: 'flex',
  justifyItems: 'center',
  alignItems: 'center',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    left: 32,
    top: '50%',
    width: 'calc(100% - 32px)',
    height: 1,
    background: theme.palette.isLight ? theme.palette.colors.green[200] : theme.palette.colors.green[800],
  },
}));

const MemoCheckIcon = styled(MemoCheck)(({ theme }) => ({
  width: 19,
  height: 19,
  zIndex: 1,
  margin: '6px 4.959px 7px 7.539px',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
  },
}));

const Right = styled('div')(({ theme }) => ({
  minWidth: 32,
  width: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: '50%',
    width: '100%',
    height: 1,
    background: theme.palette.isLight ? theme.palette.colors.green[200] : theme.palette.colors.green[800],
  },
}));

const Circle = styled('div')(({ theme }) => ({
  width: 8,
  height: 8,
  background: theme.palette.isLight ? theme.palette.colors.green[200] : theme.palette.colors.green[800],
  borderRadius: '50%',
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
}));
