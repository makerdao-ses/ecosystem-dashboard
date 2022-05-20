import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CuTable } from './cu-table';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { CuTableState } from './cu-table.slice';
import { BudgetStatementDAO, CoreUnitDAO, CuMipDao } from './cu-table.api';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';

const store = configureStore({
  reducer: {
    cuTable: createSlice({
      name: 'cuTable',
      initialState: {
        items: [
          {
            name: 'Test Core Unit',
            code: 'T-001',
            category: [CuCategoryEnum.Finance],
            cuMip: [
              {
                mipStatus: 'Accepted',
                mip40: [
                  {
                    mip40BudgetPeriod: [
                      {
                        budgetPeriodStart: '2022-01-01',
                        budgetPeriodEnd: '2023-01-01',
                        mip40BudgetLineItem: [
                          {
                            budgetCap: 1000
                          }
                        ]
                      }
                    ]
                  }
                ]
              } as CuMipDao
            ],
            budgetStatements: [
              {
                month: '2022-04-01',
                budgetStatementWallet: [
                  {
                    budgetStatementLineItem: [
                      {
                        actual: 100
                      },
                      {
                        actual: 100
                      },
                      {
                        actual: 100
                      }
                    ]
                  }
                ]
              },
              {
                month: '2022-03-01',
                budgetStatementWallet: [
                  {
                    budgetStatementLineItem: [
                      {
                        actual: 300
                      },
                      {
                        actual: 100
                      },
                      {
                        actual: 600
                      }
                    ]
                  }
                ]
              },
              {
                month: '2022-02-01',
                budgetStatementWallet: [
                  {
                    budgetStatementLineItem: [
                      {
                        actual: 200
                      },
                      {
                        actual: 100
                      },
                      {
                        actual: 600
                      }
                    ]
                  }
                ]
              },
            ] as BudgetStatementDAO[],
            id: 'Test-ID',
            socialMediaChannels: [
              {
                forumTag: 'some-tag',
                linkedIn: 'https://linkedin.com',
                youtube: 'https://youtube.com',
                twitter: '',
                discord: '',
                website: ''
              }
            ],
            roadMap: [],
            image: ''
          } as CoreUnitDAO
        ] as CoreUnitDAO[],
        status: 'idle',
        facilitatorImages: {}
      },
      reducers: {}
    }).reducer
  }
});

const MockedState: CuTableState = {
  items: [],
  status: 'idle',
  facilitatorImages: {}
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line react/prop-types
const Mockstore = ({ children }) => (
  <Provider
    store={store}>
    {children}
  </Provider>
);

export default {
  title: 'Containers/CUTable',
  components: CuTable,
  excludeStories: /.*MockedState$/,
} as ComponentMeta<typeof CuTable>;

const Template: ComponentStory<typeof CuTable> = () => <CuTable />;

export const Default = Template.bind({});
Default.decorators = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
  (story) => <Mockstore cuTable={MockedState}>{story()}</Mockstore>
];
Default.args = {};
