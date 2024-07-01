import { Avatar, styled, useMediaQuery } from '@mui/material';
import type { OwnerRef } from '@/core/models/interfaces/roadmaps';
import ProjectOwnerChip from '@/stories/containers/ActorProjects/components/ProjectOwnerChip/ProjectOwnerChip';
import OwnerAvatarGroup from '../OwnerAvatarGroup/OwnerAvatarGroup';
import type { Theme } from '@mui/material';

interface ContributorsProps {
  contributors: OwnerRef[];
}

const Contributors: React.FC<ContributorsProps> = ({ contributors }) => {
  const isMobileOrTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  return (
    <ContributorsBox>
      <Title>Contributor(s)</Title>

      {isMobileOrTablet ? (
        contributors.length === 1 ? (
          <ProjectOwnerChip tooltipText="Contributor" owner={contributors[0]} />
        ) : (
          <OwnerAvatarGroup tooltipTitle="Contributors" owners={contributors} />
        )
      ) : (
        <ActorList>
          {contributors.map((contributor) => (
            <Actor key={contributor.id}>
              <ActorAvatar src={contributor.imageUrl} />
              <ActorName>{contributor.name}</ActorName>
            </Actor>
          ))}
        </ActorList>
      )}
    </ContributorsBox>
  );
};

export default Contributors;

const ContributorsBox = styled('div')(({ theme }) => ({
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
    marginTop: -8,
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
