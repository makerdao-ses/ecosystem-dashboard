import styled from '@emotion/styled';
import CircleWithArrow from '@ses/components/svg/CircleWithArrow';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  href: string;
}
const ReadMore: React.FC<Props> = ({ href }) => {
  const { isLight } = useThemeContext();
  return (
    <Link href={href} passHref legacyBehavior>
      <ContainerTag>
        <ContainerReadMoreLink isLight={isLight}>
          <ReadMoreText isLight={isLight}>Expore</ReadMoreText>
          <CircleWithArrow />
        </ContainerReadMoreLink>
      </ContainerTag>
    </Link>
  );
};

export default ReadMore;
const ContainerTag = styled.a({});
const ContainerReadMoreLink = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  background: isLight ? '#FFF' : 'transparent',
  padding: '5px 5px 5px 16px',
  ':hover': {
    border: `1px solid ${isLight ? '#231536' : '#405361'}`,
  },
}));

const ReadMoreText = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#9FAFB9',
  fontSize: 13,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '18px',
}));
