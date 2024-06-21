import { styled } from '@mui/material';
import AvatarPlaceholder from '@ses/components/svg/avatar-placeholder';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';

interface CoordinatorsProps {
  coordinators: OwnerRef[];
}

const Coordinators: React.FC<CoordinatorsProps> = ({ coordinators }) => (
  <CoordinatorsBox>
    <Title>Coordinator(s)</Title>

    <CoordinatorsList>
      {coordinators.map((coordinator) => (
        <Coordinator key={coordinator.id}>
          <AvatarPlaceholder width={24} height={24} />
          <CoordinatorName>{coordinator.name}</CoordinatorName>
        </Coordinator>
      ))}
    </CoordinatorsList>
  </CoordinatorsBox>
);

export default Coordinators;

const CoordinatorsBox = styled('div')(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  gap: 32,

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

const CoordinatorsList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}));

const Coordinator = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  alignSelf: 'stretch',
}));

const CoordinatorName = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
}));
