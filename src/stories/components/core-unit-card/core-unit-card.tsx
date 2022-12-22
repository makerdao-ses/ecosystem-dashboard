import React, { useMemo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLastMonthWithData,
  getLast3ExpenditureValuesFromCoreUnit,
  getLast3MonthsWithDataFormatted,
  getLatestMip39FromCoreUnit,
  getLinksFromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
  getStautsMip39AccetedOrObsolete,
} from '../../../core/business-logic/core-units';
import { getShortCode } from '../../../core/utils/string.utils';
import { CuTableColumnSummary } from '../cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnExpenditures } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnTeamMember } from '../cu-table-column-team-member/cu-table-column-team-member';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CategoryChip } from '../category-chip/category-chip';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CategoriesSkeleton } from './categories-skeleton';
import Skeleton from '@mui/material/Skeleton';
import { buildQueryString } from '../../../core/utils/url.utils';
import { useRouter } from 'next/router';
import lightTheme from '../../../../styles/theme/light';
import { CuTableColumnLastModified } from '../cu-table-column-last-modified/cu-table-column-last-modified';

interface CoreUnitCardProps {
  coreUnit: CoreUnitDto;
  isLoading?: boolean;
}

export const CoreUnitCard = ({ coreUnit, isLoading = false }: CoreUnitCardProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);
  if (isLoading) {
    return (
      <Container isLight={isLight} style={{ marginBottom: '32px' }}>
        <Summary>
          <Skeleton variant="rectangular" width={100} height={20} style={{ borderRadius: '4px' }} />
          <CuTableColumnSummary isLoading />
        </Summary>
        <Expenditure>
          <Skeleton variant="rectangular" width={100} height={20} style={{ borderRadius: '4px' }} />
          <CuTableColumnExpenditures isLoading />
        </Expenditure>
        <Team>
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            style={{
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <CuTableColumnTeamMember isLoading />
        </Team>
        <Line isLight={isLight} />
        <Categories>
          <CategoriesSkeleton />
        </Categories>
        <Links>
          <CuTableColumnLinks isLoading />
        </Links>
        <LastModified>
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            style={{
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <CuTableColumnLastModified isLoading />
        </LastModified>
      </Container>
    );
  }

  return (
    <CuCard>
      <Link href={`/core-unit/${coreUnit.shortCode}${queryStrings}`}>
        <Container isLight={isLight}>
          <Summary>
            <Title hideSmall>Core Unit</Title>
            <CuTableColumnSummary
              title={coreUnit?.name}
              status={getStautsMip39AccetedOrObsolete(coreUnit)}
              statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
              imageUrl={coreUnit?.image}
              mipUrl={getMipUrlFromCoreUnit(coreUnit)}
              code={getShortCode(coreUnit.code)}
              categories={coreUnit.category}
              isCard={true}
            />
          </Summary>
          <Link href={`/core-unit/${coreUnit.shortCode}/finances/reports${queryStrings}`}>
            <Expenditure>
              <Title style={{ marginBottom: '11px' }}>Expenditure</Title>
              <CuTableColumnExpenditures
                value={getExpenditureValueFromCoreUnit(coreUnit)}
                percent={getPercentFromCoreUnit(coreUnit)}
                items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
                budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
                months={getLast3MonthsWithDataFormatted(coreUnit)}
              />
            </Expenditure>
          </Link>
          <Team>
            <Title style={{ marginBottom: '16px' }}>Team Members</Title>
            <CuTableColumnTeamMember
              members={getFacilitatorsFromCoreUnit(coreUnit)}
              fte={getFTEsFromCoreUnit(coreUnit)}
            />
          </Team>
          <Link href={`/core-unit/${coreUnit.shortCode}/activity-feed${queryStrings}`}>
            <LastModified>
              <Title style={{ marginBottom: '16px' }}>Last Modified</Title>
              <CuTableColumnLastModified date={getLastMonthWithData(coreUnit)} />
            </LastModified>
          </Link>
          <Line isLight={isLight} />
          <Categories>
            {coreUnit.category?.map((category) => (
              <CategoryChip key={category} category={category} />
            ))}
          </Categories>
          <Links>
            <CuTableColumnLinks
              links={getLinksFromCoreUnit(coreUnit)}
              spacings={16}
              fill="#708390"
              fillDark="#D2D4EF"
            />
          </Links>
        </Container>
      </Link>
    </CuCard>
  );
};

const CuCard = styled.div({
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    ':last-child': {
      marginBottom: '0px',
    },
  },
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'grid',
  gridTemplateRows: 'auto',
  boxShadow: isLight
    ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  background: isLight ? '#FFFFFF' : '#10191F',
  padding: '16px',
  gridTemplateColumns: 'auto',
  minWidth: '340px',
  gridTemplateAreas: `"summary"
     "expenditure"
     "team"
     "lastModified"
     "line"
     "categories"
     "links"
     `,
  '@media (min-width: 375px)': {
    gridTemplateColumns: '2fr 2fr',
    gridTemplateAreas: `"summary summary"
       "expenditure expenditure"
       "team lastModified"
       "line line"
       "categories categories" 
       "links links"`,
  },
  '@media (min-width: 685px)': {
    gridTemplateColumns: '2.5fr 1fr 2fr',
    gridTemplateAreas: `"summary summary expenditure"
       "team team lastModified"
       "line line line"
       "categories links links"
       `,
  },
  '@media (min-width: 834px)': {
    gridTemplateColumns: '2fr 195px 1fr 1fr',
    paddingBottom: '8px',
    gridTemplateAreas: `"summary expenditure team lastModified"
       "line line line line"
       "categories categories links links"`,
    padding: '24px 16px 8px',
  },
}));

const Summary = styled.div({
  gridArea: 'summary',
  display: 'block',
  paddingRight: '8px',
  minWidth: '300px',
});

const Expenditure = styled.div({
  gridArea: 'expenditure',
  paddingTop: '32px',
  '@media (min-width: 685px)': {
    paddingTop: '0',
  },
});

const Team = styled.div({
  gridArea: 'team',
  paddingTop: '32px',
  width: 'fit-content',
  '@media (min-width: 375px)': {
    marginLeft: '0auto',
  },
  '@media (min-width: 685px) and (max-width: 834px)': {
    paddingTop: '0',
  },
  '@media (min-width: 834px)': {
    paddingTop: '0',
    margin: '0 auto',
  },
});

const LastModified = styled.div({
  gridArea: 'lastModified',
  marginTop: '32px',
  width: 'fit-content',
  '@media (min-width: 375px)': {
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    flex: 1,
    width: '100%',
  },
  '@media (min-width: 685px) and (max-width: 833px)': {
    marginTop: '0',
    marginLeft: '0',
    alignItems: 'flex-start',
  },
  '@media (min-width: 834px)': {
    marginTop: '0',
    width: '100%',
  },
});

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  gridArea: 'line',
  height: 1,
  background: isLight ? '#D4D9E1' : '#405361',
  margin: '32px 0 16px',
  '@media (min-width: 834px)': {
    margin: '16px 0 8px',
  },
}));

const Categories = styled.div({
  gridArea: 'categories',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  justifyContent: 'center',
  '& > div': {
    marginRight: '16px',
  },
  '& div:last-child': {
    marginRight: '0px',
  },
  '@media (min-width: 685px)': {
    margin: '0',
    justifyContent: 'left',
  },
  '@media (min-width: 834px)': {
    margin: '0',
  },
});

const Links = styled.div({
  gridArea: 'links',
  display: 'flex',
  justifyContent: 'center',
  '@media (min-width: 685px)': {
    margin: '0',
    justifyContent: 'flex-end',
  },
});

const Title = styled.div<{ hideSmall?: boolean }>(({ hideSmall = false }) => ({
  display: hideSmall ? 'none' : 'block',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#9FAFB9',
  '@media (min-width: 834px)': {
    display: 'block',
    fontSize: '14px',
  },
}));
