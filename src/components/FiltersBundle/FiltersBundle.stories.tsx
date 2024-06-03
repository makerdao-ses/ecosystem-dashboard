import { Box, Typography, type Theme } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { TeamRole } from '@/core/enums/teamRole';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import RoleChip from '../RoleChip/RoleChip';
import FiltersBundle from './FiltersBundle';
import type { SelectOption } from './types';
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
    snap: 2,
  },
  {
    filters: [
      {
        type: 'select',
        id: 'actor_role',
        label: 'Actor Role',
        selected: ['ActiveEcosystemActor', 'AdvisoryCouncilMember'],
        multiple: true,
        onChange: () => null,
        options: [
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
        customOptionsRender: (option: SelectOption, isActive: boolean, theme: Theme) => {
          const getColor = () => {
            if (theme.palette.isLight) {
              return isActive ? '#343839' : '#D7D8D9 ';
            } else {
              return isActive ? '#FCFCFC' : '#373E4D';
            }
          };
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
              }}
            >
              <Typography sx={{ width: '24px' }} color={getColor()}>
                {option.extra?.count || '0'}
              </Typography>
              <RoleChip status={option.value as TeamRole} />
            </Box>
          );
        },
        withAll: true,
        customOptionsRenderAll: (isActive: boolean, theme: Theme) => {
          const getColor = () => {
            if (theme.palette.isLight) {
              return isActive ? '#343839' : '#D7D8D9 ';
            } else {
              return isActive ? '#FCFCFC' : '#373E4D';
            }
          };
          return (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '16px',
              }}
            >
              <Typography sx={{ width: '24px' }} color={getColor()}>
                17
              </Typography>
              <RoleChip status={'All' as TeamRole} />
            </Box>
          );
        },
        style: {
          width: 165,
          menuWidth: 300,
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
    searchFilters: {
      onChange: () => null,
      style: {
        width: 290,
      },
    },
    resetFilters: {
      canReset: true,
      onReset: () => null,
    },
    order: {
      mobile: ['actor_role', 'scopes'],
      tablet: ['actor_role', 'scopes'],
      desktop: ['scopes', 'actor_role'],
    },
    snap: 0,
  },
];

const [[FiltersYearsLightMode, FiltersYearsDarkMode], [EcosystemActorLightMode, EcosystemActorDarkMode]] =
  createThemeModeVariants(FiltersBundle, variantsArgs);
export { FiltersYearsLightMode, FiltersYearsDarkMode, EcosystemActorLightMode, EcosystemActorDarkMode };
