import styled from '@emotion/styled';
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
import CoreUnitCard from '../../components/core-unit-card/core-unit-card';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnLastModified } from '../../components/cu-table-column-last-modified/cu-table-column-last-modified';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

export const renderSummary = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnSummary isLoading />;

  return (
    <CuTableColumnSummary
      key={`summary-${coreUnit.code}`}
      title={coreUnit.name}
      status={getStautsMip39AccetedOrObsolete(coreUnit)}
      statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
      imageUrl={coreUnit.image}
      mipUrl={getMipUrlFromCoreUnit(coreUnit)}
      code={getShortCode(coreUnit.shortCode)}
      categories={coreUnit?.category}
    />
  );
};

export const renderExpenditures = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnExpenditures isLoading />;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        margin: 'auto 0',
        height: '52px',
      }}
    >
      <div
        style={{
          display: 'block',
          paddingLeft: '8px',
        }}
      >
        <CuTableColumnExpenditures
          value={getExpenditureValueFromCoreUnit(coreUnit)}
          percent={getPercentFromCoreUnit(coreUnit)}
          months={getLast3MonthsWithDataFormatted(coreUnit)}
          items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
          budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
          code={getShortCode(coreUnit.shortCode)}
        />
      </div>
    </div>
  );
};

export const renderTeamMember = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnTeamMember isLoading />;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        margin: 'auto 0',
        height: '50px',
      }}
    >
      <CuTableColumnTeamMember members={getFacilitatorsFromCoreUnit(coreUnit)} fte={getFTEsFromCoreUnit(coreUnit)} />
    </div>
  );
};

export const renderLinks = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnLinks isLoading />;
  return (
    <LinksContainer>
      <CuTableColumnLinks
        links={getLinksFromCoreUnit(coreUnit)}
        spacings={16}
        fill="#708390"
        fillDark="#D2D4EF"
        isIndex
      />
    </LinksContainer>
  );
};

export const renderCard = (coreUnit: CoreUnitDto, key?: number) => {
  if (!coreUnit) return <CoreUnitCard key={`card-placeholder-${key}`} coreUnit={{} as CoreUnitDto} isLoading />;
  return <CoreUnitCard key={`card-${coreUnit.code}`} coreUnit={coreUnit} />;
};

export const renderLastModified = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnLastModified date={undefined} isLoading={!coreUnit} />;
  return <CuTableColumnLastModified date={getLastMonthWithData(coreUnit)} code={getShortCode(coreUnit.shortCode)} />;
};

const LinksContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  paddingRight: '16px',
  width: '100%',
  height: '50px',
  margin: 'auto 0',
  cursor: 'pointer',
  '@media (min-width: 1440px)': {
    paddingRight: '0px',
  },
});
