import { useMediaQuery } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { RowProps } from '@/components/AdvanceTable/types';
import { buildRow, buildRowWithoutOffChain } from '../../utils/expenseComparisonUtils';
import ExpensesComparison from './ExpensesComparison';
import type { Theme } from '@mui/material';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof ExpensesComparison> = {
  title: 'Fusion/Components/Accounts Snapshot/Expenses Comparison',
  component: ExpensesComparison,
  parameters: {
    chromatic: {
      viewports: [834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const [[LightMode, DarkMode]] = createThemeModeVariants(
  // it is required to initialized this way due the rows has react components and they can not be serialized
  () => {
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
    const rows = [
      buildRow(['May-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%', '221,504.00 DAI', '0.00%'], true, false, {
        isTablet,
      }),
      buildRow(['Apr-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%', '171,500,00 DAI', '0.00%'], false, false, {
        isTablet,
      }),
      buildRow(['Mar-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%', '288,300.00 DAI', '-0.07%'], false, false, {
        isTablet,
      }),
      buildRow(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%', '681,304.25 DAI', '-0.03%'], false, true, {
        isTablet,
      }),
    ] as RowProps[];

    return <ExpensesComparison hasOffChainData={true} rows={rows} />;
  },
  [{}],
  false
);
export { LightMode, DarkMode };

const [[WithoutOffChainLightMode, WithoutOffChainDarkMode]] = createThemeModeVariants(
  () => {
    const rowsWithoutOffChain = [
      buildRowWithoutOffChain(['May-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%'], true, false),
      buildRowWithoutOffChain(['Apr-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%'], false, false),
      buildRowWithoutOffChain(['Mar-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%'], false, false),
      buildRowWithoutOffChain(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%'], false, true),
    ] as RowProps[];

    return <ExpensesComparison hasOffChainData={false} rows={rowsWithoutOffChain} />;
  },
  [{}],
  false
);
export { WithoutOffChainLightMode, WithoutOffChainDarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1827-58944',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -2,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1811-52620',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -2,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-45514',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 1,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1715-14695',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 1,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1679-86978',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 1,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

WithoutOffChainLightMode.parameters = {
  figma: {
    component: {
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1811-57165',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 70,
            left: 0,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-51132',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 70,
            left: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1724-19230',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 70,
            left: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1714-18409',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 70,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
