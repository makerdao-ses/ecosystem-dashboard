import { CuStatusEnum } from '@ses/core/enums/cu-status.enum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import { CuTableColumnSummary } from './cu-table-column-summary';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnSummary',
  component: CuTableColumnSummary,
} as ComponentMeta<typeof CuTableColumnSummary>;

const variantsArgs = [
  {
    title: 'Risk',
    status: CuStatusEnum.Accepted,
    statusModified: DateTime.fromISO('2021-11-25').toJSDate(),
    imageUrl: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/risk-001/RISK_logo.png',
    code: 'RISK-001',
  },
];

export const [[Summary, SummaryDark]] = createThemeModeVariants(CuTableColumnSummary, variantsArgs);

Summary.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13994&t=iDXzm6LhfULmvnWw-4',
  },
};
SummaryDark.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13994&t=iDXzm6LhfULmvnWw-4',
  },
};
