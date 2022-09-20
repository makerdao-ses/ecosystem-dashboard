import React from 'react';
import styled from '@emotion/styled';
import { CustomBarChart } from '../custom-bar-chart/custom-bar-chart';
import { CustomPopover } from '../custom-popover/custom-popover';
import { CustomChartItemModel } from '../../../core/models/custom-chart-item.model';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ColumnExpendituresSkeleton } from './cu-table-column-expenditures-skeleton';
import isEmpty from 'lodash/isEmpty';

interface CuTableColumnExpendituresProps {
  value?: number;
  percent?: number | null;
  items?: Array<CustomChartItemModel>;
  budgetCaps?: number[];
  months?: string[];
  isLoading?: boolean;
}

export const CuTableColumnExpenditures = ({ isLoading = false, ...props }: CuTableColumnExpendituresProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return !isLoading ? (
    <Wrapper>
      <Container>
        <DataWrapper>
          <Data>
            <Title isLight={isLight}>Latest 3 Months</Title>
            <CustomPopover
              id="mouse-over-popover-total"
              title={
                <TotalPopup>
                  <PopupTitle isLight={isLight}>
                    {props.value?.toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </PopupTitle>
                  <Label isLight={isLight}>Actual Expenditure</Label>
                </TotalPopup>
              }
            >
              <Value
                isLight={isLight}
                style={{
                  justifyContent: props.value ? 'flex-start' : 'center',
                }}
              >
                {props.value?.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                })}
              </Value>
            </CustomPopover>
          </Data>
        </DataWrapper>
        <CustomBarChart
          items={isEmpty(props.items) ? new Array(3).fill({ value: 0 }) : props.items}
          maxValues={props.budgetCaps}
          months={props.months}
        />
        <ValueWrapper>
          <CustomPopover
            css={{ alignSelf: 'center' }}
            id={'mouse-over-popover-percent'}
            title={
              <TotalPopup>
                <PopupTitle isLight={isLight}>{props.percent?.toFixed(0)}%</PopupTitle>
                <Label isLight={isLight}>
                  <b>Actuals/BudgetCap</b>
                </Label>
                <Label isLight={isLight}>over the last 3 months</Label>
              </TotalPopup>
            }
          >
            <Percent isLight={isLight}>{props.percent?.toFixed(0)}%</Percent>
          </CustomPopover>
        </ValueWrapper>
      </Container>
    </Wrapper>
  ) : (
    <ColumnExpendituresSkeleton />
  );
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  cursor: 'pointer',
  justifyContent: 'flex-start',
});

const Wrapper = styled.div({
  display: 'flex',
  marginTop: '2px',
});

const DataWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-end',
  paddingBottom: '4px',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});

const TotalPopup = styled.div({
  display: 'block',
});

const PopupTitle = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Label = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontSize: '14px',
  fontWeight: 400,
  fontStyle: 'normal',
  fontFamily: 'Inter, sans-serif',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  '> b': {
    fontWeight: 600,
  },
}));

export const Title = styled.span<{ isLight?: boolean }>(({ isLight }) => ({
  fontSize: '11px',
  color: isLight ? '#434358' : '#9FAFB9',
  fontWeight: 400,
  fontStyle: 'normal',
  marginBottom: '8px',
  lineHeight: '13px',
  fontFamily: 'Inter, sans-serif',
}));

const ValueWrapper = styled.div({
  alignSelf: 'flex-end',
});

export const Value = styled.span<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  color: isLight ? '#231536' : '#EDEFFF',
  display: 'flex',
  alignItems: 'flex-end',
  paddingBottom: 0,
  lineHeight: '17px',
}));

const Percent = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#EDEFFF',
}));
