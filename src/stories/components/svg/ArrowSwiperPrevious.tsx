import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fillArrow?: string;
  fillCircleDark?: string;
  fillCircle?: string;
  fillArrowDark?: string;
  onClick?: () => void;
  navigationPrevRef: React.LegacyRef<SVGSVGElement> | null;
  isDisable?: boolean;
}

export const ArrowSwiperPrevious: React.FC<Props> = ({
  fillCircle = '#fff',
  height = 52,
  width = 52,
  fillArrow = '#D4D9E1',
  fillArrowDark = '#D2D4EF',
  fillCircleDark = '#787A9B',
  onClick,
  isDisable = false,
  navigationPrevRef,
  ...props
}) => {
  const { isLight } = useThemeContext();
  return (
    <StyledSvg
      ref={navigationPrevRef}
      isLight={isLight}
      isDisable={isDisable}
      cursor={isDisable ? 'default' : 'pointer'}
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      {...props}
    >
      <g opacity={isDisable ? 0.3 : 0.6} filter="url(#filter0_d_17842_226132)">
        <circle cx={26} cy={20} r={20} fill={isLight ? fillCircle : fillCircleDark} />
      </g>
      <path
        opacity={isLight ? (isDisable ? 0.3 : 0.8) : isDisable ? 0.2 : 0.8}
        d="M15.656 21.727c-1.333-.77-1.333-2.695 0-3.464l14-8.083c1.334-.77 3 .192 3 1.732v16.166c0 1.54-1.666 2.502-3 1.732l-14-8.083z"
        fill={isLight ? fillArrow : fillArrowDark}
      />
      <defs>
        <filter
          id="filter0_d_17842_226132"
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
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17842_226132" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_17842_226132" result="shape" />
        </filter>
      </defs>
    </StyledSvg>
  );
};

export default ArrowSwiperPrevious;

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
