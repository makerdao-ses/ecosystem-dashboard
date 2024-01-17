import { styled } from '@mui/system';
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

const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
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
