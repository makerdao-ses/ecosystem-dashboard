import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const ComparisonTableSkeleton: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Shadow isLight={isLight}>
      <Table isLight={isLight}>
        <thead>
          <tr>
            <ReportedHeaderTH rowSpan={2} colSpan={2}>
              <ReportedHeaderSkeleton isLight={isLight} />
            </ReportedHeaderTH>
            <NetHeaderTH colSpan={4}>
              <NetHeaderSkeleton isLight={isLight} />
            </NetHeaderTH>
          </tr>
          <tr>
            <IconHeaderTH>
              <ItemWithIconContainer>
                <OnChainHeaderSkeleton isLight={isLight} />
                <IconSkeleton isLight={isLight} variant="circular" />
              </ItemWithIconContainer>
            </IconHeaderTH>
            <DifferenceHeaderTH>
              <DifferenceHeaderSkeleton isLight={isLight} />
            </DifferenceHeaderTH>
            <IconHeaderTH>
              <ItemWithIconContainer>
                <OffChainHeaderSkeleton isLight={isLight} />
                <IconSkeleton isLight={isLight} variant="circular" />
              </ItemWithIconContainer>
            </IconHeaderTH>
            <DifferenceHeaderTH>
              <DifferenceHeaderSkeleton isLight={isLight} />
            </DifferenceHeaderTH>
          </tr>
        </thead>
        <tbody>
          <CurrentMonthRow isLight={isLight}>
            <Col1>
              <MonthLabelSkeleton isLight={isLight} />
            </Col1>
            <Col2>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col2>
            <Col3>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col3>
            <Col4>
              <DifferenceValueSmallSkeleton isLight={isLight} />
            </Col4>
            <Col5>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col5>
            <Col6>
              <DifferenceValueSmallSkeleton isLight={isLight} />
            </Col6>
          </CurrentMonthRow>
          <tr>
            <Col1>
              <MonthLabelSkeleton isLight={isLight} />
            </Col1>
            <Col2>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col2>
            <Col3>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col3>
            <Col4>
              <DifferenceValueLargeSkeleton isLight={isLight} />
            </Col4>
            <Col5>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col5>
            <Col6>
              <DifferenceValueSmallSkeleton isLight={isLight} />
            </Col6>
          </tr>
          <tr>
            <Col1>
              <MonthLabelSkeleton isLight={isLight} />
            </Col1>
            <Col2>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col2>
            <Col3>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col3>
            <Col4>
              <DifferenceValueLargeSkeleton isLight={isLight} />
            </Col4>
            <Col5>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col5>
            <Col6>
              <DifferenceValueLargeSkeleton isLight={isLight} />
            </Col6>
          </tr>
          <tr>
            <Col1>
              <MonthLabelSkeleton isLight={isLight} />
            </Col1>
            <Col2>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col2>
            <Col3>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col3>
            <Col4>
              <DifferenceValueSmallSkeleton isLight={isLight} />
            </Col4>
            <Col5>
              <BigNumberValueSkeleton isLight={isLight} />
            </Col5>
            <Col6>
              <DifferenceValueLargeSkeleton isLight={isLight} />
            </Col6>
          </tr>
        </tbody>
      </Table>
    </Shadow>
  );
};

export default ComparisonTableSkeleton;

const Shadow = styled.div<WithIsLight>(({ isLight }) => ({
  filter: isLight
    ? 'drop-shadow(0px 1px 3px rgba(190, 190, 190, 0.25)) drop-shadow(0px 20px 40px rgba(219, 227, 237, 0.40))'
    : 'none',
}));

const Table = styled.table<WithIsLight>(({ isLight }) => ({
  marginTop: 32,
  borderRadius: 6,
  backgroundColor: isLight ? '#ffffff' : '#10191F',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px -40px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: 'none',
  padding: 0,
}));

const ReportedHeaderTH = styled.th({
  paddingRight: 16,
});

const ReportedHeaderSkeleton = styled(BaseSkeleton)({
  width: 139,
  height: 10.5,
  marginLeft: 'auto',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 227,
    height: 16,
  },
});

const NetHeaderTH = styled.th({
  paddingTop: 16,
  paddingBottom: 22.75,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingBottom: 21,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingTop: 11,
    paddingBottom: 16,
  },
});

const NetHeaderSkeleton = styled(BaseSkeleton)({
  width: 179,
  height: 12.25,
  marginLeft: 'auto',
  marginRight: 'auto',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 205,
    height: 14,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 405,
    height: 24,
  },
});

const IconHeaderTH = styled.th({
  padding: '24px 12.5px 24px 6px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '24px 15.5px 24px 6px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '22px 15.5px 26px 6px',
  },
});

const ItemWithIconContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6.5,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 12.5,
  },
});

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

const DifferenceHeaderTH = styled.th({
  padding: '26px 8px 26.5px 0',
  display: 'flex',
  justifyContent: 'flex-end',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '26px 16px 26.5px 0',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '24px 16px 28.5px 0',
  },
});

const DifferenceHeaderSkeleton = styled(BaseSkeleton)({
  width: 83,
  height: 10.5,
});

const CurrentMonthRow = styled.tr<WithIsLight>(({ isLight }) => ({
  background: isLight ? 'rgba(236, 239, 249, 0.30)' : 'rgba(48, 54, 60, 0.20)',
}));

const MonthLabelSkeleton = styled(BaseSkeleton)({
  width: 75,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 150,
    height: 14,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 120,
  },
});

const BigNumberValueSkeleton = styled(BaseSkeleton)({
  width: 111,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 127,
    height: 14,
  },
});

const DifferenceValueSmallSkeleton = styled(BaseSkeleton)({
  width: 44,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 50,
    height: 14,
  },
});

const DifferenceValueLargeSkeleton = styled(BaseSkeleton)({
  width: 51,
  height: 12.25,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 58,
    height: 14,
  },
});

const RowCell = styled.td({
  padding: '18.5px 8px 23.25px 0px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '17.5px 16px 22.5px 0px',
  },

  '& > *': {
    marginLeft: 'auto',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    '&:first-child > *': {
      marginLeft: 16,
    },
  },
});

const Col1 = styled(RowCell)({
  minWidth: 91,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 186,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
});

const Col2 = styled(RowCell)({
  minWidth: 142,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 186,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 195,
  },
});

const Col3 = styled(RowCell)({
  minWidth: 151,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 249,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
});

const Col4 = styled(RowCell)({
  minWidth: 92,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 126,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 132,
  },
});

const Col5 = styled(RowCell)({
  minWidth: 200,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 249,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 261,
  },
});

const Col6 = styled(RowCell)({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 134,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 140,
  },
});
