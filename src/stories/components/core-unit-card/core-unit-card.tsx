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

interface CoreUnitCardProps {
  coreUnit: CoreUnitDto;
  onClick?: (code: string) => void;
}

export const CoreUnitCard = ({ coreUnit, onClick }: CoreUnitCardProps) => {
  return <Container>
    <Summary>
      <Title>Core Unit</Title>
      <CuTableColumnSummary
        title={coreUnit.name}
        status={getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
        statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
        imageUrl={coreUnit.image}
        mipUrl={getMipUrlFromCoreUnit(coreUnit)}
        onClick={() => onClick && onClick(coreUnit.code)}
        code={formatCode(coreUnit.code)}
      />
    </Summary>
    <Expenditure>
      <Title style={{ marginBottom: '18px' }}>Expenditure</Title>
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
    <Line>
    </Line>
    <Categories>
      {coreUnit.category?.map((category) => <CategoryChip key={category} category={category} style={{ marginRight: '16px' }}/>)}
    </Categories>
    <Links>
      <CuTableColumnLinks
        links={getLinksFromCoreUnit(coreUnit)}
        spacingsLeft={16}
        fill="#708390"
      />
    </Links>
  </Container>;
};

const Container = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto',
  marginBottom: '32px',
  boxShadow: '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  background: 'white',
  padding: '24px 16px 13px 16px',
  gridTemplateColumns: 'auto',
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
  '@media (min-width: 635px)': {
    gridTemplateColumns: '3.5fr 2fr',
    gridTemplateAreas:
      `"summary expenditure"
       "team team"
       "line line"
       "categories categories" 
       "links links"`,
  },
  '@media (min-width: 835px)': {
    gridTemplateColumns: '3.5fr 2fr 1fr',
    gridTemplateAreas:
      `"summary expenditure team"
       "line line line"
       "categories links links"`,
  },
});

const Summary = styled.div({
  gridArea: 'summary',
  display: 'block',
});

const Expenditure = styled.div({
  gridArea: 'expenditure'
});

const Team = styled.div({
  gridArea: 'team'
});

const Line = styled.div({
  gridArea: 'line',
  height: 1,
  background: '#D4D9E1',
  margin: '16px 0',
  '@media (min-width: 835px)': {
    margin: '16px 0 8px',
  }
});

const Categories = styled.div({
  gridArea: 'categories',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  '@media (min-width: 835px)': {
    margin: '0',
  }
});

const Links = styled.div({
  gridArea: 'links'
});

const Title = styled.div({
  fontFamily: 'SF Pro Text',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  color: '#708390',
});
