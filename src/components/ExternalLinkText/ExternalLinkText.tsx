import { Link, styled } from '@mui/material';
import { ArrowUpRight } from '../icons/ArrowUpRight';

interface ExternalLinkTextProps extends React.PropsWithChildren {
  href: string;
  asLi?: boolean;
  className?: string;
}

const ExternalLinkText: React.FC<ExternalLinkTextProps> = ({ href, asLi, children, className }) => {
  const link = (
    <StyledLink href={href} className={className} target="_blank">
      {children} <ArrowUpRight />
    </StyledLink>
  );

  if (asLi) {
    return <Li>{link}</Li>;
  }

  return link;
};

export default ExternalLinkText;

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 14,
  lineHeight: '18px',
  fontWeight: 500,
  color: theme.palette.colors.blue[700],
  textDecoration: 'none',

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },

  '&:hover': {
    color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[600],

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[600],
    },
  },
}));

const Li = styled('li')(({ theme }) => ({
  '&::before': {
    content: '""',
    display: 'block',
    width: 6,
    height: 6,
    borderRadius: 6,
    background: theme.palette.colors.blue[700],
    position: 'absolute',
    left: 0,
    marginTop: 9,
  },

  '&:hover': {
    '&::before': {
      background: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[600],
    },
  },
}));
