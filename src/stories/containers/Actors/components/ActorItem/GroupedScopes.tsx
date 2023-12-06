import styled from '@emotion/styled';
import SESTooltip from '@ses/components/SESTooltip/SESTooltip';
import ScopeChip from '../ScopeChip/ScopeChip';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
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
          <ScopeChip status={item.name as ActorScopeEnum} code={item.code} key={index} />
        ))}
      </TooltipContent>
    }
  >
    <Group columns={Math.ceil(scopes.length / 2)}>
      {scopes?.map((item, index) => (
        <ScopeChip status={item.name as ActorScopeEnum} code={item.code} codeOnly key={index} />
      ))}
    </Group>
  </SESTooltip>
);

export default GroupedScopes;

const Group = styled.div<{ columns: number }>(({ columns }) => ({
  display: 'grid',
  gap: 4,
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
}));

const TooltipContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
