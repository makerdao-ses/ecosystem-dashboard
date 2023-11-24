import { CuStatusEnum } from '@ses/core/enums/cuStatusEnum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import { CuTableColumnSummary } from './CuTableColumnSummary';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CuTableColumnSummary> = {
  title: 'Components/CUTable/ColumnSummary',
  component: CuTableColumnSummary,
};
export default meta;

const variantsArgs = [
  {
    title: 'Risk',
    status: CuStatusEnum.Accepted,
    statusModified: DateTime.fromISO('2021-11-25').toJSDate(),
    imageUrl: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/risk-001/RISK_logo.png',
    code: 'RISK-001',
  },
];

const [[Summary, SummaryDark]] = createThemeModeVariants(CuTableColumnSummary, variantsArgs);
export { Summary, SummaryDark };

Summary.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13994&t=iDXzm6LhfULmvnWw-4',
    options: {
      style: {
        top: 20,
        left: 6,
      },
    },
  },
};
SummaryDark.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13994&t=iDXzm6LhfULmvnWw-4',
    options: {
      style: {
        top: 20,
        left: 6,
      },
    },
  },
};
