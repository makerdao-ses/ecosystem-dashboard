import { Avatar, styled } from '@mui/material';

const EcosystemActors: React.FC = () => (
  <EcosystemActorsBox>
    <Title>Ecosystem Actor(s)</Title>

    <ActorList>
      <Actor>
        <ActorAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png" />
        <ActorName>Powerhouse Inc.</ActorName>
      </Actor>
      <Actor>
        <ActorAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png" />
        <ActorName>Phoenix Labs</ActorName>
      </Actor>
      <Actor>
        <ActorAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png" />
        <ActorName>Deviz</ActorName>
      </Actor>
      <Actor>
        <ActorAvatar src="https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png" />
        <ActorName>Pull Up</ActorName>
      </Actor>
    </ActorList>
  </EcosystemActorsBox>
);

export default EcosystemActors;

const EcosystemActorsBox = styled('div')(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  gap: 32,
  marginTop: -8,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const Title = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.mode === 'light' ? '#434358' : 'red',
}));

const ActorList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Actor = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const ActorAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  boxShadow: '2px 4px 7px 0px rgba(26, 171, 155, 0.25)',
});

const ActorName = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : 'red',
}));
