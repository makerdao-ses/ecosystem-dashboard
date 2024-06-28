import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { MAKER_BURN_LINK } from '@ses/core/utils/const';
import { getShortCode } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface CuHeadlineTextProps {
  cuLongCode: string;
}

const CuHeadlineText: React.FC<CuHeadlineTextProps> = ({ cuLongCode }) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));

  return (
    <LinkDescription isLight={isLight}>
      <span> Visit makerburn.com to</span>
      <CustomLink
        href={`${MAKER_BURN_LINK}/${cuLongCode}`}
        style={{
          color: '#447AFB',
          letterSpacing: '0.3px',
          lineHeight: '18px',
          marginBottom: isMobile ? '0px' : '32px',
          marginLeft: 0,
          whiteSpace: 'break-spaces',
          display: 'inline-block',
        }}
        fontSize={16}
        fontWeight={500}
        iconWidth={10}
        iconHeight={10}
        marginLeft="7px"
      >
        {`view the ${getShortCode(cuLongCode)} Core Unit On-Chain transaction history`}
      </CustomLink>
    </LinkDescription>
  );
};

export default CuHeadlineText;

export const LinkDescription = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',

  span: {
    marginRight: 4,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
}));
