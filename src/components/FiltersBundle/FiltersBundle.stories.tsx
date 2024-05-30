import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import FiltersBundle from './FiltersBundle';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FiltersBundle> = {
  title: 'Fusion/Components/FiltersBundle',
  component: FiltersBundle,
  decorators: [withThemeContext(true, false)],
};

export default meta;

const variantsArgs = [
  {
    filters: [
      {
        type: 'select',
        id: 'year',
        label: 'Year',
        selected: '2021',
        onChange: () => null,
        options: [
          {
            value: '2021',
            label: '2021',
          },
          {
            value: '2022',
            label: '2022',
          },
          {
            value: '2023',
            label: '2023',
          },
          {
            value: '2024',
            label: '2024',
          },
        ],
      },
    ],
  },
  {
    filters: [
      {
        type: 'search',
        id: 'search',
        onChange: () => null,
      },
      {
        id: 'divider',
        type: 'divider',
      },
      {
        type: 'select',
        id: 'actor_role',
        label: 'Actor Role',
        selected: ['ActiveEcosystemActor', 'AdvisoryCouncilMember'],
        multiple: true,
        onChange: () => null,
        options: [
          {
            label: 'All',
            value: 'All',
            extra: {
              count: '17',
            },
          },
          {
            label: 'Active Ecosystem Actor',
            value: 'ActiveEcosystemActor',
            extra: {
              count: '10',
            },
          },
          {
            label: 'Scope Facilitator',
            value: 'ScopeFacilitator',
            extra: {
              count: '2',
            },
          },
          {
            label: 'Advisory Council Member',
            value: 'AdvisoryCouncilMember',
            extra: {
              count: '5',
            },
          },
          {
            label: 'DataExpert',
            value: 'DataExpert',
            extra: {
              count: '0',
            },
          },
        ],
        style: {
          width: 165,
          menuWidth: 250,
        },
      },
      {
        type: 'select',
        id: 'scopes',
        label: 'Scopes',
        selected: ['SupportScope', 'AccessibilityScope'],
        multiple: true,
        onChange: () => null,
        options: [
          {
            label: 'All',
            value: 'All',
            extra: {
              count: '17',
            },
          },
          {
            label: 'Support Scope',
            value: 'SupportScope',
            extra: {
              count: '10',
            },
          },
          {
            label: 'Stability Scope',
            value: 'StabilityScope',
            extra: {
              count: '2',
            },
          },
          {
            label: 'Accessibility Scope',
            value: 'AccessibilityScope',
            extra: {
              count: '5',
            },
          },
          {
            label: 'Protocol Scope',
            value: 'ProtocolScope',
            extra: {
              count: '0',
            },
          },
        ],
        style: {
          width: 165,
          menuWidth: 250,
        },
      },
    ],
    resetFilters: {
      canReset: true,
      onReset: () => null,
    },
    order: {
      tablet: ['actor_role', 'scopes', 'divider', 'search'],
      desktop: ['search', 'scopes', 'actor_role', 'divider'],
    },
    snap: 0,
  },
];

const [[FiltersYearsLightMode, FiltersYearsDarkMode], [EcosystemActorLightMode, EcosystemActorDarkMode]] =
  createThemeModeVariants(FiltersBundle, variantsArgs);
export { FiltersYearsLightMode, FiltersYearsDarkMode, EcosystemActorLightMode, EcosystemActorDarkMode };
