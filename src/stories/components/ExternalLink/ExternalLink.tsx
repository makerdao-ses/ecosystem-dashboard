import styled from '@emotion/styled';
import React from 'react';
import ExternalLinkArrow from '../svg/external-link-arrow';

interface ExternalLinkProps extends React.PropsWithChildren {
  href: string;
  target?: string;
  className?: string;
  showArrow?: boolean;
  wrapText?: boolean;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  target = '_blank',
  className,
  showArrow = true,
  wrapText = false,
}) => (
  <Link href={href} target={target} className={className}>
    {wrapText ? <span>{children}</span> : children}
    {showArrow && <ExternalLinkArrow renderLinkTag={false} />}
  </Link>
);

export default ExternalLink;

const Link = styled.a({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: '#447AFB',
  textDecoration: 'none',
  fontWeight: 500,
  lineHeight: '18px',
});
