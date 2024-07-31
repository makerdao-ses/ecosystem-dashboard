import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import type { Scope } from '@/core/models/interfaces/scopes';

interface GroupedScopesProps {
  scopes: Scope[];
}
const GroupedScopes: React.FC<GroupedScopesProps> = ({ scopes }) => (
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
    <Group columns={Math.ceil(scopes.length / 2)}>
      {scopes?.map((scope, index) => (
        <ScopeChip scope={scope} key={index} size="medium" />
      ))}
    </Group>
  </SESTooltip>
);

export default GroupedScopes;

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
