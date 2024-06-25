import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import { NavigationTabEnum } from '../../useEndgameView';
import type { FC } from 'react';

interface NavigationTabsProps {
  activeTab: NavigationTabEnum;
}

const NavigationTabs: FC<NavigationTabsProps> = ({ activeTab }) => {
  const handleOnClick = (tab: NavigationTabEnum) => () => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(tab);
      if (element) {
        const offsetTop = element.offsetTop - 125;
        window?.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
        setTimeout(() => {
          window.history.replaceState(null, '', `#${tab}`);
        }, 300);
      }
    }
  };

  return (
    <Sticky>
      <Wrapper>
        <Container>
          <Navigation>
            <Tab
              active={activeTab === NavigationTabEnum.LATESTS_UPDATES}
              onClick={handleOnClick(NavigationTabEnum.LATESTS_UPDATES)}
            >
              Latest Updates
            </Tab>
            <Tab
              active={activeTab === NavigationTabEnum.KEY_CHANGES}
              onClick={handleOnClick(NavigationTabEnum.KEY_CHANGES)}
            >
              Key Changes
            </Tab>
            <Tab
              active={activeTab === NavigationTabEnum.BUDGET_STRUCTURE}
              onClick={handleOnClick(NavigationTabEnum.BUDGET_STRUCTURE)}
            >
              Endgame Budget Structure
            </Tab>
            <Tab
              active={activeTab === NavigationTabEnum.BUDGET_TRANSITION_STATUS}
              onClick={handleOnClick(NavigationTabEnum.BUDGET_TRANSITION_STATUS)}
            >
              Budget Transition Status
            </Tab>
          </Navigation>
        </Container>
      </Wrapper>
    </Sticky>
  );
};

export default NavigationTabs;

const Sticky = styled('div')({
  position: 'sticky',
  top: 98,
  zIndex: 2,
});

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : '#1B1E24',
  backdropFilter: theme.palette.isLight ? 'none' : 'blur(20px)',
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const Navigation = styled('nav')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400]}`,
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  minWidth: 'fit-content',
  width: '100%',

  [theme.breakpoints.down('tablet_768')]: {
    marginLeft: -16,
    paddingLeft: 16,
    paddingRight: 16,
  },

  [theme.breakpoints.up('tablet_768')]: {
    gap: 56,
  },
}));

const Tab = styled('div')<{ active?: boolean }>(({ theme, active = false }) => {
  const activeColor = theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50];
  const defaultColor = theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600];

  return {
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 600,
    color: active ? activeColor : defaultColor,
    paddingBottom: 6,
    paddingTop: 6,
    borderBottom: `2px solid ${active ? activeColor : 'transparent'}`,
    whiteSpace: 'nowrap',
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },

    [theme.breakpoints.up('tablet_768')]: {
      fontSize: 14,
      lineHeight: '22px',
      paddingBottom: 12,
      paddingTop: 12,
    },

    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  };
});
