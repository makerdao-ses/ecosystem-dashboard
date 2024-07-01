import { styled, useMediaQuery } from '@mui/material';
import AvatarPlaceholder from '@ses/components/svg/avatar-placeholder';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import OwnerAvatarGroup from '../OwnerAvatarGroup/OwnerAvatarGroup';
import type { Theme } from '@mui/material';

interface CoordinatorsProps {
  coordinators: OwnerRef[];
}

const Coordinators: React.FC<CoordinatorsProps> = ({ coordinators }) => {
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  return (
    <CoordinatorsBox>
      <Title>Coordinator(s)</Title>

      {isMobileOrTablet ? (
        <OwnerAvatarGroup tooltipTitle="Coordinators" owners={coordinators} />
      ) : (
        <CoordinatorsList>
          {coordinators?.map((coordinator) => (
            <Coordinator key={coordinator.id}>
              <AvatarPlaceholder width={24} height={24} />
              <CoordinatorName>{coordinator.name}</CoordinatorName>
            </Coordinator>
          ))}
        </CoordinatorsList>
      )}
    </CoordinatorsBox>
  );
};

export default Coordinators;

const CoordinatorsBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  padding: 15,
  borderRadius: 6,
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#31424E'}`,

  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
    gap: 32,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'column',
    alignItems: 'normal',
    justifyContent: 'normal',
    padding: 0,
    border: 'none',
    gap: 24,
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
