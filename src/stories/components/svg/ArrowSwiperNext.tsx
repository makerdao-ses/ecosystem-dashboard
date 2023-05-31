import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillCircle?: string;
  fillCircleDark?: string;
  fillDark?: string;
  onClick?: () => void;
  navigationNextRef?: React.LegacyRef<SVGSVGElement>;
  isDisable?: boolean;
}

const ArrowSwiperNext: React.FC<Props> = ({
  fillCircle = '#fff',
  height = 52,
  width = 52,
  fill = '#D4D9E1',
  fillDark = '#D2D4EF',
  fillCircleDark = '#787A9B',
  onClick,
  navigationNextRef,
  isDisable = false,
  ...props
}) => {
  const { isLight } = useThemeContext();
  return (
    <StyledSvg
      isDisable={isDisable}
      ref={navigationNextRef}
      isLight={isLight}
      cursor={isDisable ? 'default' : 'pointer'}
      onClick={onClick}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      {...props}
    >
      <g opacity={isDisable ? 0.3 : 0.6} filter="url(#filter0_d_19516_215550)">
        <circle cx={20} cy={20} r={20} transform="matrix(-1 0 0 1 46 0)" fill={isLight ? fillCircle : fillCircleDark} />
      </g>
      <path
        opacity={isLight ? (isDisable ? 0.3 : 0.8) : isDisable ? 0.2 : 0.8}
        d="M36.344 21.727c1.333-.77 1.333-2.695 0-3.464l-14-8.083c-1.334-.77-3 .192-3 1.732v16.166c0 1.54 1.666 2.502 3 1.732l14-8.083z"
        fill={isLight ? fill : fillDark}
      />
      <defs>
        <filter
          id="filter0_d_19516_215550"
          x={0}
          y={0}
          width={width}
          height={height}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy={6} />
          <feGaussianBlur stdDeviation={3} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_19516_215550" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_19516_215550" result="shape" />
        </filter>
      </defs>
    </StyledSvg>
  );
};

export default ArrowSwiperNext;

const StyledSvg = styled.svg<{ isLight: boolean; isDisable: boolean }>(({ isLight, isDisable }) => ({
  ...(!isDisable && {
    '&:hover circle': {
      fill: isLight ? 'rgba(231, 252, 250, 0.6)' : '#139D8D',
    },
  }),
  ...(!isDisable && {
    '&:hover path': {
      fill: isLight ? '#9FAFB9' : '#2DC1B1',
    },
  }),
  ...(!isDisable && {
    ':active circle': {
      fill: isLight ? '#E7FCFA' : '#027265',
    },
  }),
  ...(!isDisable && {
    ':active path': {
      fill: isLight ? '#9FAFB9' : '#1AAB9B',
    },
  }),
}));
