import { styled } from '@mui/material';
import Link from 'next/link';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

interface ExternalLinkButtonProps extends React.PropsWithChildren {
  href: string;
  className?: string;
  showArrow?: boolean;
  wrapText?: boolean;
}

const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  href,
  children,
  className,
  showArrow = true,
  wrapText = true,
}) => (
  <ExternalButton href={href} target="_blank" className={className} wrapText={wrapText}>
    {wrapText ? children : <span>{children}</span>}
    {showArrow && <Icon />}
  </ExternalButton>
);

export default ExternalLinkButton;

const ExternalButton = styled(Link)<{ wrapText: boolean }>(({ theme, wrapText }) => ({
  display: 'flex',
  gap: 8,
  borderRadius: 6,
  padding: '2px 2px 2px 6px',
  color: theme.palette.colors.charcoal[400],
  border: `2px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: -0.3,

  ...(!wrapText && {
    maxWidth: '100%',
    whiteSpace: 'nowrap',

    '& > span': {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 'fit-content',
    },
  }),

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const Icon = styled(ExternalLinkIcon)(({ theme }) => ({
  '& > path': theme.palette.colors.charcoal[400],
}));
