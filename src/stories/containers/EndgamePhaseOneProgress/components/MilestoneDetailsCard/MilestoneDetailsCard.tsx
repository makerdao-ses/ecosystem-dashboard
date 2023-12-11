import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const MilestoneDetailsCard: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Card isLight={isLight}>
      <MobileHeader>name and chips</MobileHeader>
      <Aside>stats, charts, coordinators and ecosystem actors</Aside>
      <MilestoneContent>
        <DeliverablesSection>all deliverables here...</DeliverablesSection>
      </MilestoneContent>
    </Card>
  );
};

export default MilestoneDetailsCard;

const Card = styled.article<WithIsLight>(() => ({}));

const MobileHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
});

const Aside = styled.aside({});

const MilestoneContent = styled.div({});

const DeliverablesSection = styled.div({});
