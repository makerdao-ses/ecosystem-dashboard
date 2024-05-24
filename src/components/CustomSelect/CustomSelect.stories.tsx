import { Box, Typography } from '@mui/material';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { TeamRole } from '@/core/enums/teamRole';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import RoleChip from '../RoleChip/RoleChip';
import CustomSelect from './CustomSelect';
import type { OptionItem } from './type';
import type { Theme } from '@mui/material';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomSelect> = {
  title: 'Fusion/Components/CustomSelect',
  component: CustomSelect,
  decorators: [withThemeContext(true, false)],
};

export default meta;

const variantsArgs = [
  {
    label: 'Year',
    onChange: () => null,
    options: [
      {
        label: '2022',
        value: '2022',
      },
      {
        label: '2023',
        value: '2023',
      },
      {
        label: '2024',
        value: '2024',
      },
    ],
    selected: '2024',
    style: {
      width: 97,
    },
  },
  {
    label: 'Metrics',
    multiple: true,
    onChange: () => null,
    options: [
      {
        label: 'Budget',
        value: 'budget',
      },
      {
        label: 'Forecast',
        value: 'forecast',
      },
      {
        label: 'Net Protocol Outflow',
        value: 'net_protocol_outflow',
      },
      {
        label: 'Net Expenses On-Chain',
        value: 'net_expenses_on_chain',
      },
      {
        label: 'Actuals',
        value: 'actuals',
      },
    ],
    selected: ['budget', 'forecast', 'actuals'],
    style: {
      width: 300,
      menuWidth: 300,
    },
  },
  {
    label: 'Actor Role',
    onChange: () => null,
    options: [
      {
        label: 'All',
        value: 'All',
        extra: {
          count: 17,
        },
      },
      {
        label: 'Active Ecosystem Actor',
        value: 'ActiveEcosystemActor',
        extra: {
          count: 10,
        },
      },
      {
        label: 'Scope Facilitator',
        value: 'ScopeFacilitator',
        extra: {
          count: 2,
        },
      },
      {
        label: 'Advisory Council Member',
        value: 'AdvisoryCouncilMember',
        extra: {
          count: 5,
        },
      },
      {
        label: 'DataExpert',
        value: 'DataExpert',
        extra: {
          count: 0,
        },
      },
    ],
    customOptionsRender: (option: OptionItem, isActive: boolean, theme: Theme) => {
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
    selected: 'ActiveEcosystemActor',
    style: {
      width: 350,
      menuWidth: 350,
    },
  },
  {
    label: 'Actor Role',
    onChange: () => null,
    options: [
      {
        label: 'All',
        value: 'All',
        extra: {
          count: 17,
        },
      },
      {
        label: 'Active Ecosystem Actor',
        value: 'ActiveEcosystemActor',
        extra: {
          count: 10,
        },
      },
      {
        label: 'Scope Facilitator',
        value: 'ScopeFacilitator',
        extra: {
          count: 2,
        },
      },
      {
        label: 'Advisory Council Member',
        value: 'AdvisoryCouncilMember',
        extra: {
          count: 5,
        },
      },
      {
        label: 'Data Expert',
        value: 'DataExpert',
        extra: {
          count: 0,
        },
      },
    ],
    customOptionsRender: (option: OptionItem, isActive: boolean, theme: Theme) => {
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
    selected: ['ActiveEcosystemActor', 'AdvisoryCouncilMember'],
    multiple: true,
    style: {
      width: 350,
      menuWidth: 350,
    },
  },
];

const [
  [DefaultCustomSelectLightMode, DefaultCustomSelectDarkMode],
  [MultiSelectLightMode, MultiSelectDarkMode],
  [SingleSelectWithCustomRenderLightMode, SingleSelectWithCustomRenderDarkMode],
  [MultiSelectWithCustomRenderLightMode, MultiSelectWithCustomRenderDarkMode],
] = createThemeModeVariants(CustomSelect, variantsArgs);

export {
  DefaultCustomSelectLightMode,
  DefaultCustomSelectDarkMode,
  MultiSelectLightMode,
  MultiSelectDarkMode,
  SingleSelectWithCustomRenderLightMode,
  SingleSelectWithCustomRenderDarkMode,
  MultiSelectWithCustomRenderLightMode,
  MultiSelectWithCustomRenderDarkMode,
};
