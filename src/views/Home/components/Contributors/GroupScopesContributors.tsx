import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import type { Scope } from '@/core/models/interfaces/scopes';
import type { Theme } from '@mui/material';

interface GroupedScopesProps {
  scopes: Scope[];
}
const GroupScopesContributors: React.FC<GroupedScopesProps> = ({ scopes }) => {
  const isDesktop1280Plus = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1280'));
  return (
    <SESTooltip
      placement="bottom-start"
      content={
        <TooltipContent>
          {scopes?.map((scope, index) => (
            <ScopeChip scope={scope} key={index} size="large" />
          ))}
        </TooltipContent>
      }
    >
      <Group columns={1}>
        <ScopeChip scope={scopes[0]} size={isDesktop1280Plus ? 'medium' : 'small'} />
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
