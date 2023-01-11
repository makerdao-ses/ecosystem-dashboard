import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { CuJobEnum } from '../../../core/enums/cu-job.enum';
import cuTableReducer, { sortNeutralState } from '../../containers/cu-table/cu-table.slice';
import { CuTableColumnTeamMember } from './cu-table-column-team-member';
import type { ContributorCommitmentDto } from '../../../core/models/dto/core-unit.dto';
import type { CuTableState } from '../../containers/cu-table/cu-table.slice';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

const store = configureStore({
  reducer: {
    cuTable: cuTableReducer,
  },
});

const MockedState: CuTableState = {
  items: [],
  status: 'idle',
  sortColumn: 0,
  headersSort: sortNeutralState,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Mockstore = ({ children }) => <Provider store={store}>{children}</Provider>;

export default {
  title: 'Components/CUTable/ColumnTeamMember',
  components: CuTableColumnTeamMember,
} as ComponentMeta<typeof CuTableColumnTeamMember>;

const Template: ComponentStory<typeof CuTableColumnTeamMember> = (args) => <CuTableColumnTeamMember {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>,
];
Default.args = {
  fte: 4.5,
  members: [
    {
      jobTitle: CuJobEnum.Facilitator,
      startDate: '2011-10-10',
      contributor: [
        {
          email: 'some@gmail.com',
          forumHandle: '',
          discordHandle: '',
          facilitatorImage: '',
          name: 'Some facilitator',
          twitterHandle: '',
          id: '',
        },
      ],
    } as ContributorCommitmentDto,
  ],
};

export const Empty = Template.bind({});
Empty.decorators = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>,
];
Empty.args = {
  fte: 1,
  members: [],
};
