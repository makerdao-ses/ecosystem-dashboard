import { Avatar, styled } from '@mui/material';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';

interface ContributorsProps {
  contributors: OwnerRef[];
}

const Contributors: React.FC<ContributorsProps> = ({ contributors }) => (
  <ContributorsBox>
    <Title>Contributor(s)</Title>

    <ActorList>
      {contributors.map((contributor) => (
        <Actor key={contributor.id}>
          <ActorAvatar src={contributor.imageUrl} />
          <ActorName>{contributor.name}</ActorName>
        </Actor>
      ))}
    </ActorList>
  </ContributorsBox>
);

export default Contributors;

const ContributorsBox = styled('div')(({ theme }) => ({
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
  color: theme.palette.mode === 'light' ? '#434358' : '#B6BCC2',
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
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
}));
