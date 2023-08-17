import styled from '@emotion/styled';
import BarPercentRelativeToTotal from '@ses/components/BarPercentRelativeToTotal/BarPercentRelativeToTotal';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import Link from 'next/link';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

import type { PropsWithChildren } from 'react';

interface Props {
  svgImage: JSX.Element;
  title: string;
  totalDai: number;
  valueDai: number;
  href: string;
  barColor: string;
}

const CardNavigationMobile: React.FC<Props> = ({ svgImage, title, totalDai, valueDai, href, barColor }) => {
  const { isLight } = useThemeContext();
  const formatted = usLocalizedNumber(valueDai);
  const percent = percentageRespectTo(valueDai, totalDai);
  const ActorAboutLink: React.FC<PropsWithChildren> = ({ children }) => (
    <ContainerLinkColum>
      <Link href={href} legacyBehavior passHref>
        <LinkColum>{children}</LinkColum>
      </Link>
    </ContainerLinkColum>
  );

  return (
    <StyleCardNavigationGeneric>
      <ActorAboutLink>
        <ContainerIcon>
          <ContainerImage>{svgImage}</ContainerImage>
          <Title>{title}</Title>
        </ContainerIcon>
      </ActorAboutLink>
      <CardInformation>
        <ActorAboutLink>
          <Total isLight={isLight}>
            {`${formatted}`}
            <Coin isLight={isLight}>DAI</Coin>
          </Total>
        </ActorAboutLink>
        <ContainerBarPercent>
          <ActorAboutLink>
            <ContainerBar>
              <BarPercentRelativeToTotalStyled value={3456} total={23456} barColor={barColor} />
            </ContainerBar>
          </ActorAboutLink>
          <ActorAboutLink>
            <Percent>{percent}%</Percent>
          </ActorAboutLink>
        </ContainerBarPercent>
      </CardInformation>
    </StyleCardNavigationGeneric>
  );
};

export default CardNavigationMobile;
const StyleCardNavigationGeneric = styled(CardNavigationGeneric)({
  padding: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',
});
const ContainerIcon = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  gap: 8,
  paddingTop: 8,
  paddingLeft: 8,
  paddingRight: 8,
});

const ContainerImage = styled.div({});
const Title = styled.div({
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  marginTop: -4,
});

const CardInformation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  width: '100%',
  paddingRight: 8,
  paddingLeft: 8,
});

const ContainerLinkColum = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  width: '100%',
});

const LinkColum = styled.a({
  display: 'flex',

  flex: 1,
});

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 'normal',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#EDEFFF',

  textTransform: 'uppercase',
  textAlign: 'center',
}));

const Coin = styled.span<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 'normal',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : '#708390',
  marginLeft: 4,
  textTransform: 'uppercase',
  width: 58,
}));

const ContainerBarPercent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 4,
  height: 25,
});

const ContainerBar = styled.div({
  width: 138,
  height: 25,
});

const Percent = styled.div({
  textAlign: 'right',
  fontVariantNumeric: 'lin',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  width: 34,
  height: 25,
});

const BarPercentRelativeToTotalStyled = styled(BarPercentRelativeToTotal)<{ barColor: string }>(({ barColor }) => ({
  '& > div': {
    background: barColor,
  },
}));
