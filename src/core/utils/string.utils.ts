import { PermissionsEnum } from '../enums/permissions.enum';
import { RoleEnum } from '../enums/role.enum';
import { UserDTO, UserRole } from '../models/dto/auth.dto';
import { BudgetStatementWalletDto } from '../models/dto/core-unit.dto';

export const getTwoInitials = (name: string) => {
  const [, w1, w2] = /(\w+)[^a-zA-Z]*(\w*)?/.exec(name) ?? [];

  return `${(w1 && w1[0].toUpperCase()) ?? ''}${(w2 && w2[0].toUpperCase()) ?? ''}`;
};

export const getMipTitle = (title: string) => {
  if (!title) return '';
  const pieces = title.trim().split(':');
  return pieces;
};

export const formatAddressForOutput = (address: string | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
};

export const capitalizeWord = (word: string) => {
  return word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const capitalizeSentence = (sentence: string) => {
  const words = sentence?.split(' ');

  return words?.map((w) => capitalizeWord(w)).join(' ');
};

export const formatNumber = (number: number) => {
  return number?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
};

export const getShortCode = (code: string) => {
  if (!code) return '';
  const parts = code.split('-');
  if (!parts.length) return code;

  return parts[0];
};

export const getWalletWidthForWallets = (wallets: BudgetStatementWalletDto[]) => {
  for (const wallet of wallets) {
    if (wallet.name.length > 25) {
      return '230px';
    }
  }

  return '180px';
};

export const getCorrectRoleApi = (user: UserDTO) => {
  const allPermission: string[] = [];
  const allRoles: string[] = [];
  user.roles?.forEach((role: UserRole) => {
    allRoles.push(convertRoles(role.name));
    role.permissions.forEach((permission: PermissionsEnum) => {
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
