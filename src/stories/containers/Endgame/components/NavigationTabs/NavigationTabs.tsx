import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { NavigationTabEnum } from '../../useEndgameContainer';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface NavigationTabsProps {
  activeTab: NavigationTabEnum;
  handlePauseUrlUpdate: () => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, handlePauseUrlUpdate }) => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();

  const handleOnClick = (tab: NavigationTabEnum) => () => {
    if (typeof document !== 'undefined') {
      handlePauseUrlUpdate();
      document?.getElementById(`section-${tab}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <Sticky>
      <Wrapper isLight={isLight}>
        <Container>
          <Navigation isLight={isLight}>
            <Tab
              isLight={isLight}
              active={activeTab === NavigationTabEnum.KEY_CHANGES}
              onClick={handleOnClick(NavigationTabEnum.KEY_CHANGES)}
            >
              Key Changes
            </Tab>
            {isEnabled('FEATURE_ENDGAME_BUDGET_STRUCTURE_SECTION') && (
              <Tab
                isLight={isLight}
                active={activeTab === NavigationTabEnum.BUDGET_STRUCTURE}
                onClick={handleOnClick(NavigationTabEnum.BUDGET_STRUCTURE)}
              >
                Endgame Budget Structure
              </Tab>
            )}
            {isEnabled('FEATURE_ENDGAME_BUDGET_TRANSITION_SECTION') && (
              <Tab
                isLight={isLight}
                active={activeTab === NavigationTabEnum.BUDGET_TRANSITION_STATUS}
                onClick={handleOnClick(NavigationTabEnum.BUDGET_TRANSITION_STATUS)}
              >
                Budget Transition Status
              </Tab>
            )}
          </Navigation>
        </Container>
      </Wrapper>
    </Sticky>
  );
};

export default NavigationTabs;

const Sticky = styled.div({
  position: 'sticky',
  top: 63,
  zIndex: 2,
});

const Wrapper = styled.div<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? 'white' : '#000f1d',
  backdropFilter: isLight ? 'none' : 'blur(20px)',
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const Navigation = styled.nav<WithIsLight>(({ isLight }) => ({
  borderBottom: `1px solid ${isLight ? '#B6EDE7' : '#405361'}`,
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  minWidth: 'fit-content',
  width: '100%',

  [lightTheme.breakpoints.down('tablet_768')]: {
    marginLeft: -16,
    paddingLeft: 16,
    paddingRight: 16,
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 56,
  },
}));

const Tab = styled.div<WithIsLight & { active?: boolean }>(({ isLight, active = false }) => {
  const activeColor = isLight ? '#1AAB9B' : '#2DC1B1';
  const defaultColor = '#708390';

  return {
    fontSize: 14,
    color: active ? activeColor : defaultColor,
    paddingBottom: 10,
    paddingTop: 10,
    borderBottom: `2px solid ${active ? activeColor : 'transparent'}`,
    whiteSpace: 'nowrap',
    cursor: 'pointer',

    [lightTheme.breakpoints.up('tablet_768')]: {
      fontSize: 16,
      lineHeight: '22px',
      paddingBottom: 12,
    },
  };
});
