import request, { gql } from 'graphql-request';
import { DateTime } from 'luxon';
import { GRAPHQL_ENDPOINT } from '@/config/endpoints';
import type { Analytic } from '@/core/models/interfaces/analytic';
import type { MakerburnHistory } from '@/core/models/interfaces/makerburnHistory';

export interface RevenueAndSpendingData {
  fees: number;
  liquidationIncome: number;
  psm: number;
  daiSpent: number;
  mkrVesting: number;
  annualProfit: number;
}
export type RevenueAndSpendingRecords = Record<string, RevenueAndSpendingData>;

const query = gql`
  query Analytics($filter: AnalyticsFilter) {
    analytics {
      series(filter: $filter) {
        period
        rows {
          value
          metric
          unit
        }
      }
    }
  }
`;

const mkrPriceQuery = gql`
  query Analytics($filter: AnalyticsFilter) {
    analytics {
      series(filter: $filter) {
        period
        rows {
          sum
        }
      }
    }
  }
`;

const getFilter = (currency: 'DAI' | 'MKR') => ({
  filter: {
    start: '2021-01-01',
    end: '2025-01-01',
    granularity: currency === 'DAI' ? 'annual' : 'daily',
    metrics: ['PaymentsOffChainIncluded'],
    dimensions: [
      {
        name: 'budget',
        select: 'atlas',
        lod: 1,
      },
    ],
    currency,
  },
});

const mkrPriceFilter = {
  filter: {
    start: '2021-01-01',
    end: '2025-01-01',
    granularity: 'daily',
    metrics: 'DailyMkrPriceChange',
    dimensions: [
      {
        name: 'priceData',
        select: 'atlas',
        lod: 1,
      },
    ],
    currency: 'DAI',
  },
};

export const getRevenueAndSpendingData = async () => {
  // Fetch data from the Makerburn API
  const response = await fetch('https://api.makerburn.com/history');

  const [data, daiSpentResponse, mkrVestingResponse, mkrPriceResponse] = await Promise.all([
    (await response.json()) as MakerburnHistory[],
    // dai spent request
    await request<{
      analytics: Analytic;
    }>(GRAPHQL_ENDPOINT, query, getFilter('DAI')),
    // mkr vesting request
    await request<{
      analytics: Analytic;
    }>(GRAPHQL_ENDPOINT, query, getFilter('MKR')),
    // mkr price request
    await request<{
      analytics: Analytic;
    }>(GRAPHQL_ENDPOINT, mkrPriceQuery, mkrPriceFilter),
  ]);

  // move mkr price to a more efficient to access data structure
  // { year: {month: { day: price } } }
  const mkrPriceData: Record<string, Record<string, Record<string, number>>> = {};
  mkrPriceResponse.analytics.series.forEach((series) => {
    const date = DateTime.fromFormat(series.period, 'yyyy/MM/dd');
    if (!mkrPriceData[date.year]) {
      mkrPriceData[date.year] = {};
    }
    if (!mkrPriceData[date.year][date.month]) {
      mkrPriceData[date.year][date.month] = {};
    }
    mkrPriceData[date.year][date.month][date.day] = series.rows[0].sum;
  });

  // reduce mkr vesting data from daily to annual
  const mkrVestingData: Record<string, number> = {};
  mkrVestingResponse.analytics.series.forEach((series) => {
    const date = DateTime.fromFormat(series.period, 'yyyy/MM/dd');
    if (!mkrVestingData[date.year]) {
      mkrVestingData[date.year] = 0;
    }

    const mkrPrice = mkrPriceData[date.year][date.month][date.day] ?? 1;
    mkrVestingData[date.year] += series.rows[0].value * mkrPrice;
  });

  // Process and sanitize the data
  const revenueAndSpendingData: RevenueAndSpendingRecords = {};

  data.forEach((record) => {
    const date = DateTime.fromISO(record.date);
    // Only consider the last day of the year or iterate till the last day of the current year
    if ((date.month === 12 && date.day === 31) || date.year === DateTime.now().year) {
      // calculate the total DAI spent for the year (period)
      const daiSpent =
        daiSpentResponse.analytics.series
          .find((series) => series.period === date.year.toString())
          ?.rows?.reduce((prev, curr) => prev + curr.value, 0) ?? 0;

      // calculate the total MKR spent for the year (period)
      const mkrVesting = mkrVestingData[date.year] ?? 0;

      revenueAndSpendingData[date.year] = {
        fees: record.annual_fees ?? 0,
        liquidationIncome: record.liq_profit_12_mth ?? 0,
        psm: record.psm_swap_fees_12_mth ?? 0,

        daiSpent,
        mkrVesting,
        annualProfit: 0, // will be calculated below
      };
    }
  });

  // calculate the annual profit for each year
  Object.values(revenueAndSpendingData).forEach((record) => {
    // Revenue - Spending
    record.annualProfit = record.fees + record.liquidationIncome + record.psm - record.daiSpent - record.mkrVesting;
  });

  return revenueAndSpendingData;
};
