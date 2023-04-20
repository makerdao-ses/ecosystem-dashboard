import styled from '@emotion/styled';
import React from 'react';
import { icons } from './IconNames';
import type { IconNames } from './IconNames';
import type { StyledComponentProps } from '@mui/material';

export interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

interface Props {
  name: IconNames;
  className?: string;
  styleIcon?: React.CSSProperties;
}

const Icon = React.memo(
  ({ name, width, height, fill, className, styleIcon, ...props }: Props & SvgProps & Partial<StyledComponentProps>) => {
    const svg = React.createElement(icons[name], {
      width,
      height,
      fill,
    });
    return (
      <ContainerIcon className={className} {...props} style={styleIcon}>
        {svg}
      </ContainerIcon>
    );
  }
);

export default Icon;

const ContainerIcon = styled.div({
  display: 'flex',
  alignItems: 'center',
});
