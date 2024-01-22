import { styled } from '@mui/system';
import { SearchInput } from '@ses/components/SearchInput/SearchInput';
import DeliverableViewModeToggle from '@ses/containers/ActorProjects/components/DeliverableViewModeToggle/DeliverableViewModeToggle';

const DeliverablesSection: React.FC = () => (
  <DeliverablesContainer>
    <Header>
      <TitleBox>
        <Title>Highlighted Deliverables</Title>
        <Count>6</Count>
      </TitleBox>

      <DeliverableViewModeToggle deliverableViewMode="compacted" onChangeDeliverableViewMode={() => null} />
    </Header>

    <SearchContainer>
      <CustomSearchInput placeholder="Search" legacyBreakpoints={false} />
    </SearchContainer>

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 1200,
        backgroundColor: 'gray',
        marginTop: 32,
        borderRadius: 8,
      }}
    >
      Testing...
    </div>
  </DeliverablesContainer>
);

export default DeliverablesSection;

const DeliverablesContainer = styled('div')(() => ({}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
}));

const TitleBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
}));

const Title = styled('h3')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },
}));

const Count = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.4,
  },
}));

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 24,

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: 32,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
}));

const CustomSearchInput = styled(SearchInput)(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    width: '100%',

    '& > div': {
      width: '100%',
    },
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: 319,

    '& input': {
      height: 32,
    },
  },

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    width: 253,

    '& input': {
      height: 32,
      width: 253,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 320,
  },
}));
