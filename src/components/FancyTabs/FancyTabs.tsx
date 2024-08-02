import { styled } from '@mui/material';

export interface FancyTabItem {
  id: string;
  title: string | React.ReactNode;
  icon?: React.ReactNode;
}

interface FancyTabsProps {
  tabs: FancyTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const FancyTabs: React.FC<FancyTabsProps> = ({ tabs, activeTab, onTabChange, className }) => (
  <Wrapper className="no-select">
    <TabsContainer className={className}>
      {tabs.map((tab) => (
        <Tab key={tab.id} role="tab" active={tab.id === activeTab} onClick={() => onTabChange(tab.id)}>
          {tab.icon} <span>{tab.title}</span>
        </Tab>
      ))}
    </TabsContainer>
  </Wrapper>
);

export default FancyTabs;

const Wrapper = styled('div')({
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  whiteSpace: 'nowrap',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const TabsContainer = styled('div')(() => ({
  display: 'flex',
  gap: 8,
}));

const Tab = styled('button')<{ active: boolean }>(({ theme, active }) => ({
  all: 'unset', // Remove all default styles
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: '8px 8px 0px 0px',
  padding: '3px 7px 4px',
  cursor: 'pointer',
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[active ? 800 : 900]
  }`,
  borderBottom: 'none',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  background: active
    ? theme.palette.isLight
      ? theme.palette.colors.slate[50]
      : theme.palette.colors.charcoal[800]
    : theme.palette.isLight
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[900],
  color: active ? theme.palette.colors.gray[theme.palette.isLight ? 900 : 50] : theme.palette.colors.gray[600],

  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },

  ...(!active && {
    '&:hover': {
      border: `1px solid ${theme.palette.isLight ? '#F9FAFB' : '#292E38'}`,
      borderBottom: 'none',
      background: theme.palette.isLight ? '#F9FAFB' : '#292E38',
      color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.gray[500],
    },
  }),
}));
