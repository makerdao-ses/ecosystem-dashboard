import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/themes';
import SESTooltip from '@/stories/components/SESTooltipLegacy/SESTooltipLegacy';
import ScopeChip from '../ScopeChip/ScopeChip';
import type { TeamScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { Scope } from '@ses/core/models/interfaces/scopes';

interface GroupedScopesProps {
  scopes: Scope[];
}
const GroupedScopes: React.FC<GroupedScopesProps> = ({ scopes }) => (
  <SESTooltip
    placement="bottom-start"
    content={
      <TooltipContent>
        {scopes?.map((item, index) => (
          <ScopeChip status={item.name as TeamScopeEnum} code={item.code} key={index} />
        ))}
      </TooltipContent>
    }
  >
    <Group columns={Math.ceil(scopes.length / 2)}>
      {scopes?.map((item, index) => (
        <ScopeChip status={item.name as TeamScopeEnum} code={item.code} codeOnly key={index} />
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
