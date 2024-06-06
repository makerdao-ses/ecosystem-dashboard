import { styled } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import type { CustomChartItemModel } from '@/core/models/customChartItemModel';
import { buildQueryString } from '@/core/utils/urls';
import { CustomBarChart } from '@/stories/components/CustomBarChart/CustomBarChart';
import { CustomPopover } from '@/stories/components/CustomPopover/CustomPopover';
import { ColumnExpendituresSkeleton } from './CuTableColumnExpendituresSkeleton';

interface CuTableColumnExpendituresProps {
  value?: number;
  percent?: number | null;
  items?: Array<CustomChartItemModel>;
  budgetCaps?: number[];
  months?: string[];
  isLoading?: boolean;
  code?: string;
}

export const CuTableColumnExpenditures = ({ isLoading = false, ...props }: CuTableColumnExpendituresProps) => {
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  return !isLoading ? (
    <LinkStyle href={`/core-unit/${props.code}/finances/reports${queryStrings}`}>
      <Container>
        <Title>Latest 3 Months</Title>
        <DataWrapper>
          <Data>
            <CustomPopover
              id="mouse-over-popover-total"
              title={
                <TotalPopup>
                  <PopupTitle>
                    {props.value?.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </PopupTitle>
                  <Label>Actual Expenditure</Label>
                </TotalPopup>
              }
            >
              <Value
                style={{
                  justifyContent: props.value ? 'flex-start' : 'center',
                }}
              >
                {props.value?.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}
              </Value>
            </CustomPopover>
            <Line />
            <CustomPopover
              css={{ alignSelf: 'center' }}
              id={'mouse-over-popover-percent'}
              title={
                <TotalPopup>
                  <PopupTitle>{props.percent?.toFixed(0)}%</PopupTitle>
                  <Label>
                    <b>Actuals/BudgetCap</b>
                  </Label>
                  <Label>over the last 3 months</Label>
                </TotalPopup>
              }
            >
              <Percent>{props.percent?.toFixed(0) === '0' ? '-  %' : `${props.percent?.toFixed(0)}%`}</Percent>
            </CustomPopover>
          </Data>
          <CustomBarCharContainer>
            <CustomBarChart
              items={isEmpty(props.items) ? new Array(3).fill({ value: 0 }) : props.items}
              maxValues={props.budgetCaps}
              months={props.months}
              code={props?.code}
            />
          </CustomBarCharContainer>
        </DataWrapper>
      </Container>
    </LinkStyle>
  ) : (
    <ColumnExpendituresSkeleton />
  );
};

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: 8,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '12px 4px 0px 4px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '17px 8px 4px 8px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 15px 3px 16px',
  },
}));

const LinkStyle = styled(Link)({
  display: 'flex',
  textDecoration: 'none',
  justifyContent: 'column',
  alignItems: 'center',
  cursor: 'pointer',
});

const DataWrapper = styled('div')(() => ({
  display: 'flex',
}));

const Data = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  justifyContent: 'center',
  height: 52,
  width: 56,
  alignItems: 'center',

  paddingTop: 8,
});

const TotalPopup = styled('div')({
  display: 'block',
});

const PopupTitle = styled('div')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontFamily: 'Inter, sans-serif',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  '> b': {
    fontWeight: 600,
  },
}));

const Title = styled('span')(({ theme }) => ({
  fontSize: 12,
  top: -8,
  left: 6,
  borderRadius: 4,
  position: 'absolute',
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[500],
  fontWeight: 400,
  fontStyle: 'normal',

  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('desktop_1280')]: {
    left: 16,
  },
}));

const Value = styled('div')(({ theme }) => ({
  display: 'flex',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[50],
  ':hover': {
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  },
}));

const Percent = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[300],
  marginLeft: 4,
}));

const CustomBarCharContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: -6,
  marginBottom: 6,
}));

const Line = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300]}`,
  width: 30,
  margin: '0 auto',
}));
