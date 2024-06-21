import { styled } from '@mui/material';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import Link from 'next/link';

interface ProjectLinkProps {
  href?: string;
  code: string;
  name: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({ href, code, name }) => (
  <LinkCard as={href ? 'a' : 'div'} href={href ?? ''}>
    <TextBox>
      <ProjectLabel>Project</ProjectLabel>
      <NameBox addLimit={!!href}>
        <Code>{code}</Code>
        <Name addLimit={!!href}>{name}</Name>
      </NameBox>
    </TextBox>
    {href && (
      <ArrowContainer>
        <Arrow width={24} height={24} />
      </ArrowContainer>
    )}
  </LinkCard>
);

export default ProjectLink;

const LinkCard = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 6,
  background: theme.palette.isLight ? '#fff' : '#31424E',
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 5px 10px 0px rgba(219, 227, 237, 0.40)'
    : '10px 0px 20px 6px rgba(20, 0, 141, 0.10)',
}));

const TextBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 8,
  maxWidth: 'calc(100% - 40px)',
  width: '100%',
});

const ProjectLabel = styled('div')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.isLight ? '#B6BCC2' : '#787A9B',
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',
  paddingRight: 9,

  '&:after': {
    content: '""',
    background: theme.palette.isLight ? '#D4D9E1' : '#787A9B',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 1,
  },
}));

const NameBox = styled('div')<{ addLimit: boolean }>(({ addLimit }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 4,
  width: `calc(100% - ${addLimit ? '50px' : '40px'})`,
}));

const Code = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#B6BCC2' : '#787A9B',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 'normal',
}));

const Name = styled('span')<{ addLimit: boolean }>(({ theme, addLimit }) => ({
  color: theme.palette.isLight ? '#25273D' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: `calc(100% - ${addLimit ? '55px' : '0px'})`,
}));

const ArrowContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.isLight ? 'rgba(236, 239, 249, 0.50)' : 'rgba(124, 107, 149, 0.30)',
  alignItems: 'center',
  overflow: 'hidden',
  justifyContent: 'center',
  width: 32,
  height: 34,
}));

const Arrow = styled(ArrowNavigationForCards)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? '#434358' : '#B7A6CD',
  },
}));
