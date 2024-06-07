import { styled } from '@mui/material';
import Link from 'next/link';
import ExternalLinkIcon from 'public/assets/svg/external_link.svg';

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
    {showArrow && (
      <IconWrapper>
        <ExternalLinkIcon />
      </IconWrapper>
    )}
  </ExternalButton>
);

export default ExternalLinkButton;

const ExternalButton = styled(Link)<{ wrapText: boolean }>(({ theme, wrapText }) => ({
  display: 'flex',
  gap: 8,
  borderRadius: 6,
  padding: `2px ${wrapText ? 6 : 2}px 2px 6px`,
  color: theme.palette.isLight ? theme.palette.colors.charcoal[400] : theme.palette.colors.charcoal[400],
  border: `2px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '24px',
  letterSpacing: -0.3,

  ...(wrapText
    ? {
        width: 'fit-content',
      }
    : {
        maxWidth: '100%',
        whiteSpace: 'nowrap',

        '& > span': {
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: 'fit-content',
        },
      }),
  ':hover': {
    border: `2px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
    }`,
    color: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[300],
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[300],
    },
  },
  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 16,
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.colors.charcoal[400],
  width: 16,
  height: 16,
  display: 'flex',
  alignSelf: 'center',
}));
