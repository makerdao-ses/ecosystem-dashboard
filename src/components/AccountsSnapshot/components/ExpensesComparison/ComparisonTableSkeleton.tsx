import { styled } from '@mui/material';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import type { Theme } from '@mui/material';

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
              <IconSkeleton />
            </ItemWithIconContainer>
          </IconHeaderTH>
          <DifferenceHeaderTH>
            <DifferenceHeaderSkeleton />
          </DifferenceHeaderTH>
          <IconHeaderTH>
            <ItemWithIconContainer>
              <OffChainHeaderSkeleton />
              <IconSkeleton />
            </ItemWithIconContainer>
          </IconHeaderTH>
          <DifferenceHeaderTH>
            <DifferenceHeaderSkeleton />
          </DifferenceHeaderTH>
        </tr>
      </thead>
      <tbody>
        <CurrentMonthRow>
          <Col1 border={['borderRight']}>
            <MonthLabelSkeleton />
          </Col1>
          <Col2 border={['borderRight']}>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4 border={['borderRight']}>
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
          <Col1 border={['borderRight']}>
            <MonthLabelSkeleton />
          </Col1>
          <Col2 border={['borderRight']}>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4 border={['borderRight']}>
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
          <Col1 border={['borderRight']}>
            <MonthLabelSkeleton />
          </Col1>
          <Col2 border={['borderRight']}>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4 border={['borderRight']}>
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
          <Col1 border={['borderTop', 'borderRight']}>
            <MonthLabelSkeleton width={48} />
          </Col1>
          <Col2 border={['borderTop', 'borderRight']}>
            <BigNumberValueSkeleton />
          </Col2>
          <Col3 border={['borderTop']}>
            <BigNumberValueSkeleton />
          </Col3>
          <Col4 border={['borderTop', 'borderRight']}>
            <DifferenceValueSmallSkeleton />
          </Col4>
          <Col5 border={['borderTop']}>
            <BigNumberValueSkeleton />
          </Col5>
          <Col6 border={['borderTop']}>
            <DifferenceValueLargeSkeleton />
          </Col6>
        </tr>
      </tbody>
    </Table>
  </Shadow>
);

export default ComparisonTableSkeleton;

type BorderPositionDirective = 'borderTop' | 'borderRight' | 'borderBottom' | 'borderLeft';

const createBorder = (theme: Theme, directive: BorderPositionDirective) => ({
  [directive]: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
});

const Shadow = styled('div')(({ theme }) => ({
  boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,
  borderRadius: 12,
}));

const Table = styled('table')(({ theme }) => ({
  marginTop: 16,
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  borderRadius: 12,
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: 'none',
  padding: 0,
}));

const ReportedHeaderTH = styled('th')(({ theme }) => ({
  paddingRight: 16,
  ...createBorder(theme, 'borderRight'),
  ...createBorder(theme, 'borderBottom'),
}));

const ReportedHeaderSkeleton = styled(BaseSkeleton)(() => ({
  width: 135,
  height: 24,
  marginLeft: 'auto',
}));

const NetHeaderTH = styled('th')(({ theme }) => ({
  paddingTop: 14,
  paddingBottom: 13,
  ...createBorder(theme, 'borderBottom'),

  [theme.breakpoints.up('desktop_1024')]: {
    paddingBottom: 21,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    paddingTop: 11,
    paddingBottom: 16,
  },
}));

const NetHeaderSkeleton = styled(BaseSkeleton)(() => ({
  width: 205,
  height: 24,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const IconHeaderTH = styled('th')(({ theme }) => ({
  padding: '23px 6px',
  ...createBorder(theme, 'borderBottom'),

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '19px 12px',
  },
}));

const ItemWithIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 8,

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 12.5,
  },
}));

const OnChainHeaderSkeleton = styled(BaseSkeleton)({
  width: 93,
  height: 24,
});

const OffChainHeaderSkeleton = styled(BaseSkeleton)({
  width: 102,
  height: 24,
});

const IconSkeleton = styled(BaseSkeleton)({
  width: 16,
  height: 16,
});

const DifferenceHeaderTH = styled('th')(({ theme }) => ({
  padding: '23px 6px',
  display: 'flex',
  justifyContent: 'flex-end',
  ...createBorder(theme, 'borderBottom'),

  '&:not(:last-of-type)': {
    ...createBorder(theme, 'borderRight'),
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '19px 16px',
  },
}));

const DifferenceHeaderSkeleton = styled(BaseSkeleton)(({ theme }) => ({
  width: 48,
  height: 24,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 74,
  },
}));

const CurrentMonthRow = styled('tr')(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#21262F',
}));

const MonthLabelSkeleton = styled(BaseSkeleton)(() => ({
  width: 78,
  height: 22,
  marginLeft: '0!important', // prevent overriding this property
  marginRight: 'auto',
}));

const BigNumberValueSkeleton = styled(BaseSkeleton)(() => ({
  width: 111,
  height: 22,
}));

const DifferenceValueSmallSkeleton = styled(BaseSkeleton)(() => ({
  width: 37,
  height: 22,
}));

const DifferenceValueLargeSkeleton = styled(BaseSkeleton)(() => ({
  width: 51,
  height: 22,
}));

const RowCell = styled('td')<{ border?: BorderPositionDirective[] }>(({ theme, border = [] }) => ({
  padding: '16px 8px',

  ...border.reduce(
    (acc, curr) => ({
      ...acc,
      ...createBorder(theme, curr),
    }),
    {}
  ),

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },

  '& > *': {
    marginLeft: 'auto',
  },
}));

const Col1 = styled(RowCell)(({ theme }) => ({
  minWidth: 94,

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 138,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
}));

const Col2 = styled(RowCell)(({ theme }) => ({
  minWidth: 125,

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 176,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
}));

const Col3 = styled(RowCell)(({ theme }) => ({
  minWidth: 159,

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 200,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
}));

const Col4 = styled(RowCell)(({ theme }) => ({
  minWidth: 83,

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 123,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 132,
  },
}));

const Col5 = styled(RowCell)(({ theme }) => ({
  minWidth: 160,

  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 200,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
}));

const Col6 = styled(RowCell)(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 123,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 140,
  },
}));
