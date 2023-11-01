import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  href?: string;
  target?: string;
  renderLinkTag?: boolean; // allow backward compatibility
}

const ExternalLinkArrow = ({
  fill = '#447AFB',
  width = 10,
  target = '_blank',
  height = 11,
  href = '',
  renderLinkTag = true,
  ...props
}: Props) => {
  const LinkTag: React.FC<React.PropsWithChildren> = ({ children }) =>
    renderLinkTag ? (
      <a href={href} target={target}>
        {children}
      </a>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );

  return (
    <LinkTag>
      <svg width={width} height={height} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M1.22 10.29A.714.714 0 01.21 9.28L7.56 1.93H2.857a.714.714 0 010-1.429h6.431a.712.712 0 01.501.208l.003.003c.138.138.207.32.208.501v6.431a.714.714 0 11-1.429 0V2.939L1.22 10.29z"
          fill={fill}
        />
      </svg>
    </LinkTag>
  );
};

export default ExternalLinkArrow;
