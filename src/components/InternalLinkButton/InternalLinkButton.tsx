import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowInternalLink from './ArrowInternalLink/ArrowInternalLink';

interface Props {
  label?: string;
  showIcon?: boolean;
  href: string;
  className?: string;
}

const InternalLinkButton: React.FunctionComponent<Props> = ({ label, showIcon = true, href, className }) => (
  <ContainerLink href={href ?? ''} className={className}>
    <Text>{label}</Text>
    {showIcon && (
      <IconContainer>
        <ArrowInternalLink />
      </IconContainer>
    )}
  </ContainerLink>
);

export default InternalLinkButton;

const ContainerLink = styled(Link)<{ background?: string }>(({ theme }) => ({
  height: 32,
  display: 'flex',
  borderRadius: 8,
  padding: '4px 16px 4px 24px',
  width: 'fit-content',
  alignItems: 'center',
  background: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.charcoal[800],
  gap: 8,
  border: '1px solid transparent',
  ':hover': {
    gap: 16,
    padding: '4px 8px 4px 24px',
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.gray[300]}`
      : `1px solid ${theme.palette.colors.charcoal[600]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[700] : theme.palette.colors.charcoal[200],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[700] : theme.palette.colors.charcoal[200],
    },
  },
  ':active': {
    background: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[700],
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.charcoal[400]}`
      : `1px solid ${theme.palette.colors.charcoal[500]}`,
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
