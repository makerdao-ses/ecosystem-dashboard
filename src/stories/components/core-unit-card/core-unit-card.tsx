import React from 'react';
import styled from '@emotion/styled';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLatestMip39FromCoreUnit, getLinksFromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip
} from '../../../core/business-logic/core-units';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { formatCode } from '../../../core/utils/string.utils';
import { CuTableColumnSummary } from '../cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnExpenditures } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnTeamMember } from '../cu-table-column-team-member/cu-table-column-team-member';
import { CuTableColumnLinks } from '../cu-table-column-links/cu-table-column-links';
import { CategoryChip } from '../category-chip/category-chip';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface CoreUnitCardProps {
  coreUnit: CoreUnitDto;
  onClick?: () => void;
  onClickFinances?: () => void;
}

export const CoreUnitCard = ({ coreUnit, onClick, onClickFinances }: CoreUnitCardProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container isLight={isLight}>
    <Summary>
      <Title>Core Unit</Title>
      <CuTableColumnSummary
        title={coreUnit.name}
        status={getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
        statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
        imageUrl={coreUnit.image}
        mipUrl={getMipUrlFromCoreUnit(coreUnit)}
        onClick={onClick}
        code={formatCode(coreUnit.code)}
      />
    </Summary>
    <Expenditure onClick={onClickFinances}>
      <Title style={{ marginBottom: '11px' }}>Expenditure</Title>
      <CuTableColumnExpenditures
        value={getExpenditureValueFromCoreUnit(coreUnit)}
        percent={getPercentFromCoreUnit(coreUnit)}
        items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
        budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
      />
    </Expenditure>
    <Team>
      <Title style={{ marginBottom: '16px' }}>Team Members</Title>
      <CuTableColumnTeamMember
        members={
          getFacilitatorsFromCoreUnit(coreUnit)
        }
        fte={getFTEsFromCoreUnit(coreUnit)}
      />
    </Team>
    <Line isLight={isLight}>
    </Line>
    <Categories>
      {coreUnit.category?.map((category) => <CategoryChip key={category} category={category} />)}
    </Categories>
    <Links>
      <CuTableColumnLinks
        links={getLinksFromCoreUnit(coreUnit)}
        spacings={16}
        fill="#708390"
      />
    </Links>
  </Container>;
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'grid',
  gridTemplateRows: 'auto',
  marginBottom: '32px',
  boxShadow: isLight ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  background: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  padding: '24px 16px 13px 16px',
  gridTemplateColumns: 'auto',
  minWidth: '340px',
  gridTemplateAreas:
    `"summary"
     "expenditure"
     "team"
     "line"
     "categories"
     "links"
     `,
  '@media (min-width: 435px)': {
    gridTemplateColumns: '3.5fr 2fr',
    gridTemplateAreas:
      `"summary summary"
       "expenditure team"
       "line line"
       "categories categories" 
       "links links"`,
  },
  '@media (min-width: 685px)': {
    gridTemplateColumns: '3.5fr 2fr',
    gridTemplateAreas:
      `"summary expenditure"
       "team team"
       "line line"
       "categories links"
       `,
  },
  '@media (min-width: 835px)': {
    gridTemplateColumns: '3.5fr 2fr 1fr',
    gridTemplateAreas:
      `"summary expenditure team"
       "line line line"
       "categories links links"`,
  },
}));

const Summary = styled.div({
  gridArea: 'summary',
  display: 'block',
});

const Expenditure = styled.div({
  gridArea: 'expenditure',
  paddingTop: '19px',
  '@media (min-width: 435px)': {
    paddingTop: '0',
  }
});

const Team = styled.div({
  gridArea: 'team',
  paddingTop: '28px',
  '@media (min-width: 435px) and (max-width: 685px)': {
    paddingTop: '0',
  },
  '@media (min-width: 835px)': {
    paddingTop: '0',
  }
});

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  gridArea: 'line',
  height: 1,
  background: isLight ? '#D4D9E1' : '#405361',
  margin: '16px 0',
  '@media (min-width: 835px)': {
    margin: '16px 0 8px',
  }
}));

const Categories = styled.div({
  gridArea: 'categories',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  justifyContent: 'center',
  gap: '16px',
  '@media (min-width: 685px)': {
    margin: '0',
    justifyContent: 'left',
  },
  '@media (min-width: 835px)': {
    margin: '0',
  }
});

const Links = styled.div({
  gridArea: 'links',
  display: 'flex',
  justifyContent: 'center',
  '@media (min-width: 685px)': {
    margin: '0',
    justifyContent: 'right',
  },
});

const Title = styled.div({
  fontFamily: 'SF Pro Text',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  color: '#708390',
});
