import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowInternalLink from '../../stories/components/svg/ArrowInternalLink';

interface Props {
  label?: string;
  icon?: boolean;
  href: string;
  className?: string;
  iconFill?: string;
  iconWith?: number;
  iconHeight?: number;
  iconClassName?: string;
  background?: string;
}

const InternalLinkButton: React.FunctionComponent<Props> = ({
  label,
  icon,
  href,
  className,
  iconFill = '#5B667E',
  iconWith = 24,
  iconHeight = 23,
  background,
  iconClassName,
}) => (
  <Link href={href ?? ''} passHref legacyBehavior>
    <Container className={className} background={background}>
      <Text>{label}</Text>
      {icon && (
        <IconContainer>
          <ArrowInternalLink fill={iconFill} height={iconHeight} width={iconWith} className={iconClassName} />
        </IconContainer>
      )}
    </Container>
  </Link>
);

export default InternalLinkButton;

const Container = styled('a')<{ background?: string }>(({ theme, background }) => ({
  height: 32,
  display: 'flex',
  borderRadius: 8,
  padding: '4px 16px 4px 24px',
  width: 'fit-content',
  alignItems: 'center',
  background:
    background || (theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800]),
  gap: 8,

  ':hover': {
    gap: 16,
    padding: '4px 8px 4px 24px',
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.gray[300]}`
      : `1px solid ${theme.palette.colors.charcoal[100]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[700] : theme.palette.colors.charcoal[200],
    },
    '& path': {
      fill: theme.palette.colors.charcoal[700],
    },
  },
  ':active': {
    background: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[900],
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.charcoal[400]}`
      : `1px solid ${theme.palette.colors.charcoal[200]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[300],
    },
  },
}));
const Text = styled('div')(({ theme }) => ({
  fontWeight: 600,
  size: 16,
  flexDirection: 'row',
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[300],
}));

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
