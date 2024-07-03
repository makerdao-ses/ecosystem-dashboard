import { styled } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';

const ComparisonTableSkeleton: React.FC = () => (
  <Shadow>
    <Table>
      <thead>
        <tr>
          <ReportedHeaderTH rowSpan={2} colSpan={2}>
            <ReportedHeaderSkeleton />
          </ReportedHeaderTH>
          <NetHeaderTH colSpan={4}>
            <NetHeaderSkeleton />
          </NetHeaderTH>
        </tr>
        <tr>
          <IconHeaderTH>
            <ItemWithIconContainer>
              <OnChainHeaderSkeleton />
              <IconSkeleton variant="circular" />
            </ItemWithIconContainer>
          </IconHeaderTH>
          <DifferenceHeaderTH>
            <DifferenceHeaderSkeleton />
          </DifferenceHeaderTH>
          <IconHeaderTH>
            <ItemWithIconContainer>
              <OffChainHeaderSkeleton />
              <IconSkeleton variant="circular" />
            </ItemWithIconContainer>
          </IconHeaderTH>
          <DifferenceHeaderTH>
            <DifferenceHeaderSkeleton />
          </DifferenceHeaderTH>
        </tr>
      </thead>
      <tbody>
        <CurrentMonthRow>
          <Col1>
            <MonthLabelSkeleton />
          </Col1>
          <Col2>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4>
            <DifferenceValueSmallSkeleton />
          </Col4>
          <Col5>
            <BigNumberValueSkeleton />
          </Col5>
          <Col6>
            <DifferenceValueSmallSkeleton />
          </Col6>
        </CurrentMonthRow>
        <tr>
          <Col1>
            <MonthLabelSkeleton />
          </Col1>
          <Col2>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4>
            <DifferenceValueLargeSkeleton />
          </Col4>
          <Col5>
            <BigNumberValueSkeleton />
          </Col5>
          <Col6>
            <DifferenceValueSmallSkeleton />
          </Col6>
        </tr>
        <tr>
          <Col1>
            <MonthLabelSkeleton />
          </Col1>
          <Col2>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4>
            <DifferenceValueLargeSkeleton />
          </Col4>
          <Col5>
            <BigNumberValueSkeleton />
          </Col5>
          <Col6>
            <DifferenceValueLargeSkeleton />
          </Col6>
        </tr>
        <tr>
          <Col1>
            <MonthLabelSkeleton />
          </Col1>
          <Col2>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4>
            <DifferenceValueSmallSkeleton />
          </Col4>
          <Col5>
            <BigNumberValueSkeleton />
          </Col5>
          <Col6>
            <DifferenceValueLargeSkeleton />
          </Col6>
        </tr>
      </tbody>
    </Table>
  </Shadow>
);

export default ComparisonTableSkeleton;

const Shadow = styled('div')(({ theme }) => ({
  filter: theme.palette.isLight
    ? 'drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25)) drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.40))'
    : 'none',
}));

const Table = styled('table')(({ theme }) => ({
  marginTop: 32,
  borderRadius: 6,
  backgroundColor: theme.palette.isLight ? '#ffffff' : '#10191F',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px -40px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: 'none',
  padding: 0,
}));

const ReportedHeaderTH = styled('th')({
  paddingRight: 16,
});

const ReportedHeaderSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 139,
  height: 10.5,
  marginLeft: 'auto',

  [theme.breakpoints.up('desktop_1440')]: {
    width: 227,
    height: 16,
  },
}));

const NetHeaderTH = styled('th')(({ theme }) => ({
  paddingTop: 16,
  paddingBottom: 22.75,

  [theme.breakpoints.up('desktop_1194')]: {
    paddingBottom: 21,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingTop: 11,
    paddingBottom: 16,
  },
}));

const NetHeaderSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 179,
  height: 12.25,
  marginLeft: 'auto',
  marginRight: 'auto',

  [theme.breakpoints.up('desktop_1194')]: {
    width: 205,
    height: 14,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 405,
    height: 24,
  },
}));

const IconHeaderTH = styled('th')(({ theme }) => ({
  padding: '24px 12.5px 24px 6px',

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '24px 15.5px 24px 6px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '22px 15.5px 26px 6px',
  },
}));

const ItemWithIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6.5,

  [theme.breakpoints.up('desktop_1194')]: {
    gap: 12.5,
  },
}));

const OnChainHeaderSkeleton = styled(BaseSkeleton)({
  width: 111,
  height: 10.5,
});

const OffChainHeaderSkeleton = styled(BaseSkeleton)({
  width: 156,
  height: 10.5,
});

const IconSkeleton = styled(BaseSkeleton)({
  width: 15,
  height: 15,
});

const DifferenceHeaderTH = styled('th')(({ theme }) => ({
  padding: '26px 8px 26.5px 0',
  display: 'flex',
  justifyContent: 'flex-end',

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '26px 16px 26.5px 0',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: '24px 16px 28.5px 0',
  },
}));

const DifferenceHeaderSkeleton = styled(BaseSkeleton)({
  width: 83,
  height: 10.5,
});

const CurrentMonthRow = styled('tr')(({ theme }) => ({
  background: theme.palette.isLight ? 'rgba(236, 239, 249, 0.30)' : 'rgba(48, 54, 60, 0.20)',
}));

const MonthLabelSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 75,
  height: 12.25,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 150,
    height: 14,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 120,
  },
}));

const BigNumberValueSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 111,
  height: 12.25,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 127,
    height: 14,
  },
}));

const DifferenceValueSmallSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 44,
  height: 12.25,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 50,
    height: 14,
  },
}));

const DifferenceValueLargeSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 51,
  height: 12.25,

  [theme.breakpoints.up('desktop_1194')]: {
    width: 58,
    height: 14,
  },
}));

const RowCell = styled('td')(({ theme }) => ({
  padding: '18.5px 8px 23.25px 0px',

  [theme.breakpoints.up('desktop_1194')]: {
    padding: '17.5px 16px 22.5px 0px',
  },

  '& > *': {
    marginLeft: 'auto',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    '&:first-child > *': {
      marginLeft: 16,
    },
  },
}));

const Col1 = styled(RowCell)(({ theme }) => ({
  minWidth: 91,

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 186,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
}));

const Col2 = styled(RowCell)(({ theme }) => ({
  minWidth: 142,

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 186,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
}));

const Col3 = styled(RowCell)(({ theme }) => ({
  minWidth: 151,

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 249,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
}));

const Col4 = styled(RowCell)(({ theme }) => ({
  minWidth: 92,

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 126,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 132,
  },
}));

const Col5 = styled(RowCell)(({ theme }) => ({
  minWidth: 200,

  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 249,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
}));

const Col6 = styled(RowCell)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1194')]: {
    minWidth: 134,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 140,
  },
}));
