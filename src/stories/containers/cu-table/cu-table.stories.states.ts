import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { BudgetStatementDao, CoreUnitDao, CuMipDao } from './cu-table.api';

export const initialState = {
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
          ],
          budgetStatementFTEs: [
            {
              month: '2022-04-01',
              ftes: 8.5
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
      ] as BudgetStatementDao[],
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
    } as CoreUnitDao
  ] as CoreUnitDao[],
  status: 'idle',
  facilitatorImages: {}
};
