import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import type { Scope } from '@/core/models/interfaces/scopes';
import type { TeamCategory } from '@/core/models/interfaces/types';
import type { Theme } from '@mui/material';

interface GroupedScopesProps {
  items: Scope[] | TeamCategory[];
}

const GroupScopesContributors: React.FC<GroupedScopesProps> = ({ items }) => {
  const isDesktop1280Plus = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));

  // Function to check if an object is of type Scope
  const isScope = (item: Scope | TeamCategory): item is Scope => (item as Scope).name !== undefined;

  return (
    <SESTooltip
      placement="bottom-start"
      content={
        <TooltipContent>
          {items.map((scope, index) =>
            isScope(scope) ? (
              <ScopeChip scope={scope} key={index} size="large" />
            ) : (
              <CategoryChip category={scope} key={index} />
            )
          )}
        </TooltipContent>
      }
    >
      <Group columns={1}>
        {isScope(items[0]) ? (
          <ScopeChip scope={items[0]} size={isDesktop1280Plus ? 'medium' : 'small'} />
        ) : (
          <ContainerCategory>
            <CategoryChip category={items[0]} />
            <CategoryChip category={items[1] as TeamCategory} />
          </ContainerCategory>
        )}
      </Group>
    </SESTooltip>
  );
};

export default GroupScopesContributors;

const Group = styled.div<{ columns: number }>(({ columns }) => ({
  display: 'grid',
  gap: 4,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  direction: 'rtl',

  [lightTheme.breakpoints.up('tablet_768')]: {
    direction: 'ltr',
  },

  [lightTheme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    display: 'flex',
  },
}));

const TooltipContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const ContainerCategory = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});
