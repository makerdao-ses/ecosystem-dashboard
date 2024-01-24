import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ReservesWaterFallChartSection from './ReservesWaterFallChartSection';
import { builderWaterFallSeries } from './utils';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ReservesWaterFallChartSection> = {
  title: 'Components/NewFinances/Section/ReservesWaterFallChartSection',
  component: ReservesWaterFallChartSection,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const data = [
  129200, 232251, 124393, 123108, -121954, 122535, 213078, 212286, -1111921, -131261, -222203, 222500, 270021,
];

const args = [
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO Finances Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
    series: builderWaterFallSeries(data, true, false),
  },
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO Finances Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    series: builderWaterFallSeries(data, false, true),
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
  },
  {
    selectedGranularity: 'monthly',
    title: 'MakerDAO Finances Reserves',
    legends: [
      {
        title: 'Reserves Balance',
        color: '#83A7FF',
      },
      {
        title: 'Outflow',
        color: '#CB3A0D',
      },
      {
        title: 'Inflow',
        color: '#2DC1B1',
      },
    ],
    year: '2023',
    series: builderWaterFallSeries(data, false, false),
    activeItems: [],
    handleSelectChangeItem: () => null,
    handleGranularityChange: () => null,
    handleResetFilter: () => null,
    items: [],
    popupContainerHeight: 120,
    isDisabled: true,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(ReservesWaterFallChartSection, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:338004&mode=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:331963&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 26,
            left: -244,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:330409&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 26,
            left: -116,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-335076&mode=dev',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 26,
            left: -6,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:336606&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 26,
            left: -2,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:333607&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 26,
            left: -2,
          },
        },
      },
    },
  },
};
