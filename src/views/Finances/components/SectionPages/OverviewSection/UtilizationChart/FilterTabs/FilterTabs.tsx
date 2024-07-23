import { styled } from '@mui/material';

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ tabs, activeTab, onChangeTab }) => (
  <Wrapper className="no-select">
    <TabContainer>
      {tabs.map((tab) => (
        <Tab key={tab} onClick={() => onChangeTab(tab)} active={activeTab === tab}>
          {tab}
        </Tab>
      ))}
    </TabContainer>
  </Wrapper>
);

export default FilterTabs;

const Wrapper = styled('div')(() => ({
  position: 'relative',
  maxWidth: '100%',
  boxShadow: '1px 0px 15px 0px rgba(117, 117, 117, 0.15)',
}));

const TabContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'column',
    gap: 8,
    padding: '14px 0',
    minWidth: 192,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    minWidth: 205,
  },
}));

const Tab = styled('div')<{ active: boolean }>(({ theme, active }) => ({
  fontSize: 12,
  fontWeight: active ? 700 : 500,
  lineHeight: active ? '18px' : '22px',
  color: active
    ? theme.palette.isLight
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[500]
    : theme.palette.isLight
    ? theme.palette.colors.gray[500]
    : 'red',
  background: active ? (theme.palette.isLight ? theme.palette.colors.slate[50] : 'red') : 'transparent',
  whiteSpace: 'nowrap',
  padding: `8px 8px ${active ? 8 : 4}px`,
  cursor: 'pointer',

  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 24px',
    lineHeight: '22px',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: 4,
      height: '100%',
      borderRadius: '0px 4px 4px 0px',
      background: active ? (theme.palette.isLight ? theme.palette.colors.gray[900] : 'red') : 'transparent',
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '22px',
    padding: '2px 16px 2px 24px',
  },
}));
