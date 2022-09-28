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
} from '../../../core/business-logic/core-units';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { getShortCode } from '../../../core/utils/string.utils';
import { CoreUnitCard } from '../../components/core-unit-card/core-unit-card';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnLastModified } from '../../components/cu-table-column-last-modified/cu-table-column-last-modified';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';

export const renderSummary = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnSummary isLoading />;

  return (
    <CuTableColumnSummary
      key={`summary-${coreUnit.code}`}
      title={coreUnit.name}
      status={getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: '16px',
        width: '100%',
        height: '50px',
        margin: 'auto 0',
        cursor: 'pointer',
      }}
    >
      <CuTableColumnLinks
        links={getLinksFromCoreUnit(coreUnit)}
        spacings={16}
        fill="#708390"
        fillDark="#D2D4EF"
        isIndex
      />
    </div>
  );
};

export const renderCard = (coreUnit: CoreUnitDto, key?: number) => {
  if (!coreUnit) return <CoreUnitCard key={`card-placeholder-${key}`} coreUnit={{} as CoreUnitDto} isLoading />;
  return <CoreUnitCard key={`card-${coreUnit.code}`} coreUnit={coreUnit} />;
};

export const renderLastModified = (coreUnit: CoreUnitDto) => {
  if (!coreUnit) return <CuTableColumnLastModified date={undefined} isLoading={!coreUnit} />;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        margin: 'auto 0',
        height: '50px',
      }}
    >
      <CuTableColumnLastModified date={getLastMonthWithData(coreUnit.budgetStatements)} />
    </div>
  );
};
