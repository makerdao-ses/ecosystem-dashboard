import styled from '@emotion/styled';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const ProjectLink: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <LinkCard isLight={isLight} href={siteRoutes.roadmapMilestones('endgame-phase-1')}>
      <TextBox>
        <ProjectLabel isLight={isLight}>Project</ProjectLabel>
        <NameBox>
          <Code isLight={isLight}>PEA</Code>
          <Name isLight={isLight}>Protocol Expense Accounting</Name>
        </NameBox>
      </TextBox>
      <ArrowContainer isLight={isLight}>
        <ArrowNavigationForCards width={24} height={24} fill={isLight ? '#434358' : '#B7A6CD'} />
      </ArrowContainer>
    </LinkCard>
  );
};

export default ProjectLink;

const LinkCard = styled(Link)<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#fff' : '#31424E',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '10px 0px 20px 6px rgba(20, 0, 141, 0.10)',
}));

const TextBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  maxWidth: 'calc(100% - 40px)',
  width: '100%',
});

const ProjectLabel = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  color: isLight ? '#B6BCC2' : '#787A9B',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',
  paddingRight: 9,

  '&:after': {
    content: '""',
    background: isLight ? '#D4D9E1' : '#787A9B',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 1,
  },
}));

const NameBox = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 4,
  width: 'calc(100% - 50px)',
});

const Code = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#B6BCC2' : '#787A9B',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
}));

const Name = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#25273D' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 'calc(100% - 55px)',
}));

const ArrowContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  backgroundColor: isLight ? 'rgba(236, 239, 249, 0.50)' : 'rgba(124, 107, 149, 0.30)',
  alignItems: 'center',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 32,
  height: 34,
}));
