import styled from '@emotion/styled';
import * as React from 'react';
interface Props {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  target?: string;
  fill?: string;
}

const ArrowLink = ({ width = 16, height = 16, href, target, fill = '#626472', className, ...props }: Props) => {
  const Wrapper = href ? Link : Container;

  return (
    <Wrapper href={href} target={target} className={className}>
      <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M10.36 2c-.35 0-.525.404-.278.64l1.13 1.08-6.275 6a.727.727 0 000 1.06.81.81 0 001.109 0l6.274-6 1.13 1.08c.246.236.669.069.669-.265v-3.22A.384.384 0 0013.727 2H10.36z"
          fill={fill}
        />
        <path
          d="M8.735 4h-4.68c-1.2 0-2.172 1.033-2.172 2.308v5.384c0 1.275.972 2.308 2.172 2.308h5.068c1.2 0 2.172-1.033 2.172-2.308V6.72L9.847 8.258v3.434c0 .425-.325.77-.724.77H4.055c-.4 0-.724-.345-.724-.77V6.308c0-.425.324-.77.724-.77h3.232L8.735 4z"
          fill={fill}
        />
      </svg>
    </Wrapper>
  );
};

export default ArrowLink;

const Link = styled.a({
  '&:hover *': {
    fill: '#447AFB',
  },
});
const Container = styled.div({});
