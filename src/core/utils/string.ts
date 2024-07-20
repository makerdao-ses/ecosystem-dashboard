import { PermissionsEnum } from '../enums/permissionsEnum';
import { RoleEnum } from '../enums/roleEnum';
import { BudgetStatus } from '../models/dto/coreUnitDTO';
import { ResourceType } from '../models/interfaces/types';
import type { UserDTO, UserRole } from '../models/dto/authDTO';
import type { BudgetStatementComment } from '../models/interfaces/budgetStatementComment';
import type { BudgetStatementWallet } from '../models/interfaces/budgetStatementWallet';

export const getTwoInitials = (name: string) => {
  const [, w1, w2] = /(\w+)[^a-zA-Z]*(\w*)?/.exec(name) ?? [];

  return `${(w1 && w1[0].toUpperCase()) ?? ''}${(w2 && w2[0].toUpperCase()) ?? ''}`;
};

export const getMipTitle = (title: string) => {
  if (!title) return '';
  const pieces = title.trim().split(':');
  return pieces;
};

export const formatAddressForOutput = (address: string | undefined, startChars = 5, endChars = 5, divider = '..') => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, startChars)}${divider}${address.slice(address.length - endChars, address.length)}`;
};

export const capitalizeWord = (word: string) =>
  word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());

export const capitalizeSentence = (sentence: string) => {
  const words = sentence?.split(' ');

  return words?.map((w) => capitalizeWord(w)).join(' ');
};

export const formatNumber = (number: number) =>
  number?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });

/**
 * @deprecated The method should not be used, use shortCode directly instead
 */
export const getShortCode = (code: string) => {
  if (!code) return '';
  const parts = code.split('-');
  if (!parts.length) return code;

  return parts[0];
};

export const getWalletWidthForWallets = (wallets: BudgetStatementWallet[]) => {
  for (const wallet of wallets) {
    if (wallet.name.length > 25) {
      return '230px';
    }
  }

  return '220px';
};

export const getCorrectRoleApi = (user: UserDTO) => {
  const allPermission: string[] = [];
  const allRoles: string[] = [];
  user.roles?.forEach((role: UserRole) => {
    allRoles.push(convertRoles(role.name));
    role.permissions.forEach((permission: string) => {
      allPermission.push(permission);
    });
  });
  const isAdmin = allPermission.find((item) => item === PermissionsEnum.SystemManage);
  if (isAdmin) {
    return {
      mainRole: 'Site Admin',
      allRoles,
    };
  }
  const isCoreUnitAdmin = allPermission.find((item) => item.indexOf(PermissionsEnum.CoreUnitUpdate) > -1);
  if (isCoreUnitAdmin) {
    return {
      mainRole: 'Core Unit Admin',
      allRoles,
    };
  }

  return {
    mainRole: 'User',
    allRoles,
  };
};

export const capitalizeWordWithoutConvertLowerCase = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const convertRoles = (role: RoleEnum) => {
  switch (role) {
    case RoleEnum.SuperAdmin:
      return 'Site Admin';
    case RoleEnum.CoreUnitFacilitator:
      return 'Core Unit Admin';
    default:
      return 'User';
  }
};

export const getCommentVerb = (comment: BudgetStatementComment, previousComment?: BudgetStatementComment): string => {
  if (!previousComment) {
    // is the first comment
    switch (comment.status) {
      case BudgetStatus.Review:
        return 'submitted';
      case BudgetStatus.Final:
        return 'marked as final';
    }
  } else {
    if (comment.status === previousComment.status) {
      return 'wrote';
    }

    switch (comment.status) {
      case BudgetStatus.Draft:
        return 'reopened';
      case BudgetStatus.Review:
        if (previousComment.status === BudgetStatus.Draft) {
          return 'submitted';
        } else {
          return 'reopened';
        }
      case BudgetStatus.Escalated:
        return 'escalated';
      case BudgetStatus.Final:
        if (previousComment.status === BudgetStatus.Draft) {
          return 'marked as final';
        } else {
          return 'approved';
        }
    }
  }
  return 'wrote';
};

export const replaceAllNumberLetOneBeforeDot = (num: number, isShowNegative = false) => {
  // Need to be sure that its negative
  const isNegative = num < 0;
  const mathAbsolute = Math.abs(num);

  let result;

  if (mathAbsolute < 1000) {
    result = mathAbsolute.toString();
  } else if (mathAbsolute < 1000000) {
    result = (mathAbsolute / 1000).toFixed(1).replace(/\.?0+$/g, '') + 'K';
  } else if (mathAbsolute < 1000000000) {
    result = (mathAbsolute / 1000000).toFixed(1).replace(/\.?0+$/g, '') + 'M';
  } else if (mathAbsolute < 1000000000000) {
    result = (mathAbsolute / 1000000000).toFixed(1).replace(/\.?0+$/g, '') + 'B';
  } else if (mathAbsolute < 1000000000000000) {
    result = (mathAbsolute / 1000000000000).toFixed(1).replace(/\.?0+$/g, '') + 'T';
  } else {
    result = mathAbsolute.toString();
  }

  return isShowNegative && isNegative ? '-' + result : result;
};

export const pascalCaseToNormalString = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1 $2');

export const toKebabCase = (str: string): string =>
  str
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camel case to kebab case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^a-zA-Z0-9-]/g, '') // Remove any non-alphanumeric characters (except hyphens)
    .toLowerCase(); // Convert all characters to lowercase

export const formatAddressForOutputDelegateWallet = (address: string | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 7)}...${address.slice(address.length - 4, address.length)}`;
};

export const getResourceLabel = (resourceType?: ResourceType): string => {
  switch (resourceType) {
    case ResourceType.AlignedDelegates:
      return 'Aligned Delegate';
    case ResourceType.CoreUnit:
      return 'Core Unit';
    case ResourceType.Delegates:
      return 'Recognized Delegate';
    case ResourceType.Keepers:
      return 'Keeper';
    default:
      return 'Ecosystem Actor';
  }
};

export const removeAtlasFromPath = (path: string): string => path?.replace(/\/?atlas\/?/g, '/').replace(/^\/|\/$/g, '');
export const removeSpaces = (str: string): string => str?.replace(/\s+/g, '');
