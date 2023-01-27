import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CoreUnit } from '@ses/core/utils/test.utils';
import {
  renderExpenditures,
  renderLastModified,
  renderLinks,
  renderSummary,
  renderTeamMember,
} from 'src/stories/containers/cu-table/cu-table.renders';
import RowItem from './row-item';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/RowItem',
  component: RowItem,
  parameters: {
    chromatic: {
      viewports: [1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof RowItem>;

const variantsArgs = [
  {
    queryStrings: '',
    key: '2',
    loading: false,
    columns: [
      {
        header: 'Core Unit',
        justifyContent: 'flex-start',
        style: { paddingLeft: '16px' },
        cellRender: renderSummary,

        width: '400px',
        hasSort: true,
      },
      {
        header: 'Expenditure',
        justifyContent: 'flex-start',
        cellRender: renderExpenditures,

        width: '215px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: 'Team Members',
        justifyContent: 'center',
        cellRender: renderTeamMember,

        width: '205px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: 'Last Modified',
        justifyContent: 'flex-start',
        cellRender: renderLastModified,

        width: '122px',
        sortReverse: true,
        hasSort: true,
      },
      {
        header: '',
        justifyContent: 'center',
        cellRender: renderLinks,

        width: '358px',
        responsiveWidth: '186px',
        hasSort: false,
      },
    ],
    cu: CoreUnit,
  },
];

// [
//
// ];
export const [[Summary, SummaryDark]] = createThemeModeVariants(RowItem, variantsArgs);

Summary.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
SummaryDark.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
