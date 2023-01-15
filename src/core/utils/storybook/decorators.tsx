import PermissionManager from '@ses/core/auth/permission-manager';
import { AuthContext } from '@ses/core/context/AuthContext';
import { CoreUnitContext } from '@ses/core/context/CoreUnitContext';
import FigmaComparator from './FigmaComparator';
import type { FigmaComparatorOptions, FigmaLinkSet } from './types';
import type { CoreUnitContextValues } from '@ses/core/context/CoreUnitContext';
import type { UserDTO } from '@ses/core/models/dto/auth.dto';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';
import type { Story } from '@storybook/react';

export const withFigmaComparator =
  (figmaLink: string | FigmaLinkSet, options?: FigmaComparatorOptions) => (Story: Story) => {
    const link = typeof figmaLink === 'string' ? { 0: figmaLink } : figmaLink;

    return (
      <FigmaComparator figmaLink={link} options={options}>
        <Story />
      </FigmaComparator>
    );
  };

export const withUserLoggedIn = (user: UserDTO) => (Story: Story) =>
  (
    <AuthContext.Provider
      value={{
        hasToken: true,
        authToken: 'mockedAuth',
        permissionManager: new PermissionManager(user),
      }}
    >
      <Story />
    </AuthContext.Provider>
  );

export const withCoreUnitContext = (CuOrStory: Story | CoreUnitDto) => {
  if (typeof CuOrStory === 'function') {
    // it is a Story
    return (
      <CoreUnitContext.Provider
        value={
          {
            currentCoreUnit: { shortCode: 'EXA' },
          } as CoreUnitContextValues
        }
      >
        <CuOrStory />
      </CoreUnitContext.Provider>
    );
  } else {
    // it is a Core Unit instance
    return (Story: Story) => (
      <CoreUnitContext.Provider
        value={
          {
            currentCoreUnit: CuOrStory,
          } as CoreUnitContextValues
        }
      >
        <Story />
      </CoreUnitContext.Provider>
    );
  }
};
