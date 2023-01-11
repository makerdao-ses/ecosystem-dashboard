import { CuCategoryEnum } from '../enums/cu-category.enum';
import { CuJobEnum } from '../enums/cu-job.enum';

import { BudgetStatus } from '../models/dto/core-unit.dto';
import { getCorrectRoleApi } from './string.utils';
import type { UserDTO } from '../models/dto/auth.dto';

export const getColorForString = (value: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < value?.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const getColorCategory = (category: CuCategoryEnum) => {
  switch (category) {
    case CuCategoryEnum.Technical:
      return {
        color: '#546978',
        background: 'rgba(246, 245, 255, 0.5)',
      };
    case CuCategoryEnum.Growth:
      return {
        color: '#DC5D00',
        background: 'rgba(255, 245, 245, 0.5);',
      };
    case CuCategoryEnum.Support:
      return {
        color: '#1AAB9B',
        background: 'rgba(245, 255, 246, 0.5)',
      };

    case CuCategoryEnum.Operational:
      return {
        color: '#9055AF',
        background: 'rgba(250, 245, 255, 0.5)',
      };
    case CuCategoryEnum.RWAs:
      return {
        color: '#2DC1B1',
        background: 'rgba(245, 255, 249, 0.5)',
      };
    case CuCategoryEnum.Finance:
      return {
        color: '#447AFB',
        background: 'rgba(247, 255, 245, 0.52)',
      };
    case CuCategoryEnum.Business:
      return {
        color: '#F08B04',
        background: 'rgba(255, 251, 245, 0.5)',
      };

    default:
      return {
        color: '#25273D',
        background: 'white',
      };
  }
};

export const getColorJobPosition = (job: CuJobEnum) => {
  switch (job) {
    case CuJobEnum.DataExpert:
      return {
        color: '#8F2EC1',
      };
    case CuJobEnum.Facilitator:
      return {
        color: '#1AAB9B',
      };
    case CuJobEnum.ProjectLead:
      return {
        color: '#635696',
      };

    case CuJobEnum.ResearchExpert:
      return {
        color: '#00B5D3',
      };
    case CuJobEnum.TeamLead:
      return {
        color: '#FF4085',
      };
    case CuJobEnum.TechExpert:
      return {
        color: '#F08B04',
      };
    case CuJobEnum.DataAnalyst:
      return {
        color: '#1DC1AE',
      };
    case CuJobEnum.Contributor:
      return {
        color: '#D44C96',
      };
    case CuJobEnum.Legal:
      return {
        color: '#FF8237',
      };
    case CuJobEnum.Product:
      return {
        color: '#02CB9B',
      };
    case CuJobEnum.Developer:
      return {
        color: '#34AAFF',
      };
    case CuJobEnum.Data:
      return {
        color: '#E4DC0A',
      };
    default:
      return {
        color: '#000000',
      };
  }
};

export const getColorRole = (user: UserDTO) => {
  const role = getCorrectRoleApi(user);
  switch (role.mainRole) {
    case 'Core Unit Admin':
      return {
        color: '#447AFB',
        darkColor: '#34AAFF',
      };
    case 'Site Admin':
      return {
        color: '#FF4085',
        darkColor: '#FF2272',
      };
    case 'User':
      return {
        color: '#1AAB9B',
        darkColor: '#00ED18',
      };

    default:
      return {
        color: '#000000',
        darkColor: '#447AFB',
      };
  }
};

export const getExpenseReportStatusColor = (
  variant: BudgetStatus
): { color: string; background: string; darkColor: string; darkBackground: string } => {
  switch (variant) {
    case BudgetStatus.Review:
      return {
        color: '#F08B04',
        darkColor: '#F08B04',
        background: '#FFF9ED',
        darkBackground: '#533905',
      };
    case BudgetStatus.Final:
      return {
        color: '#1AAB9B',
        darkColor: '#1AAB9B',
        background: '#E7FCFA',
        darkBackground: '#044942',
      };
    case BudgetStatus.Escalated:
      return {
        color: '#EB4714',
        darkColor: '#EB4714',
        background: '#FDEDE8',
        darkBackground: '#481403',
      };

    default: // default to draft
      return {
        color: '#447AFB',
        darkColor: '#447AFB',
        background: '#EDF2FF',
        darkBackground: '#061D58',
      };
  }
};
