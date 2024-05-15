import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowInternalLink from './ArrowInternalLink/ArrowInternalLink';

interface Props {
  label?: string;
  showIcon?: boolean;
  href: string;
  className?: string;
  buttonType?: 'primary' | 'secondary';
}

const InternalLinkButton: React.FunctionComponent<Props> = ({
  label,
  showIcon = true,
  href,
  className,
  buttonType = 'primary',
}) => (
  <ContainerLink href={href ?? ''} className={className} buttonType={buttonType}>
    <Text>{label}</Text>
    {showIcon && (
      <IconContainer>
        <ArrowInternalLink />
      </IconContainer>
    )}
  </ContainerLink>
);

export default InternalLinkButton;

const ContainerLink = styled(Link)<{ buttonType?: string }>(({ theme, buttonType = 'primary' }) => ({
  height: 32,
  display: 'flex',
  borderRadius: 8,
  padding: '4px 16px 4px 24px',
  width: 'fit-content',
  alignItems: 'center',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  gap: 8,
  border: '1px solid transparent',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  },
  ':hover': {
    gap: 16,
    padding: '4px 8px 4px 24px',
    border: '1px solid transparent',
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    },
  },
  ':active': {
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.slate[100]}`
      : `1px solid ${theme.palette.colors.charcoal[700]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.charcoal[100],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.charcoal[100],
    },
  },
  ...(buttonType === 'secondary' && {
    background: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[800],

    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[300],
      fontWeight: 600,
    },

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[300],
    },
    ':hover': {
      padding: '4px 8px 4px 24px',
      background: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.charcoal[800],
      border: theme.palette.isLight
        ? `1px solid ${theme.palette.colors.charcoal[700]}`
        : `1px solid ${theme.palette.colors.charcoal[600]}`,
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[200],
        fontWeight: 600,
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[200],
      },
    },
    ':active': {
      background: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.charcoal[700],
      border: theme.palette.isLight
        ? `1px solid ${theme.palette.colors.charcoal[600]}`
        : `1px solid ${theme.palette.colors.charcoal[500]}`,
      '& div': {
        color: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[300],
      },
      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[300],
      },
    },
  }),
}));
const Text = styled('div')(({ theme }) => ({
  fontWeight: 600,
  size: 16,
  flexDirection: 'row',
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
}));

const IconContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
