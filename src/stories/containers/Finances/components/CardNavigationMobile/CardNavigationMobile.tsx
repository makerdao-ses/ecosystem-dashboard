import styled from '@emotion/styled';
import BarPercentRelativeToTotal from '@ses/components/BarPercentRelativeToTotal/BarPercentRelativeToTotal';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import Link from 'next/link';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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

  return (
    <StyleCardNavigationGeneric>
      <Link href={href} legacyBehavior passHref>
        <LinkTag>
          <MainCard>
            <ContainerData>
              <ContainerIcon>
                <ContainerImage>{svgImage}</ContainerImage>
                <Title>{title}</Title>
              </ContainerIcon>
              <CardInformation>
                <Total isLight={isLight}>
                  {`${formatted}`}
                  <Coin isLight={isLight}>DAI</Coin>
                </Total>
                <ContainerBarPercent>
                  <ContainerBar>
                    <BarPercentRelativeToTotalStyled value={3456} total={23456} barColor={barColor} />
                  </ContainerBar>
                  <Percent>{percent}%</Percent>
                </ContainerBarPercent>
              </CardInformation>
            </ContainerData>
            <ArrowContainer isLight={isLight}>
              <ArrowNavigationForCards width={32} height={32} />
            </ArrowContainer>
          </MainCard>
        </LinkTag>
      </Link>
    </StyleCardNavigationGeneric>
  );
};

export default CardNavigationMobile;
const StyleCardNavigationGeneric = styled(CardNavigationGeneric)({
  padding: 0,
  flex: 1,
  border: 'none',
  flexDirection: 'column',
});
const ContainerIcon = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  gap: 8,
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
  display: 'flex',
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
  display: 'flex',
  marginRight: 8,
}));

const ContainerBarPercent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 4,
  height: 25,
});

const ContainerBar = styled.div({
  width: 97,
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
  marginTop: 2,
});

const BarPercentRelativeToTotalStyled = styled(BarPercentRelativeToTotal)<{ barColor: string }>(({ barColor }) => ({
  '& > div': {
    background: barColor,
  },
}));

const ContainerData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 8,
  paddingLeft: 8,
  width: 279,
});

const LinkTag = styled.a({});
const ArrowContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  backgroundColor: isLight ? 'rgba(236, 239, 249, 0.80)' : 'red',
  alignItems: 'center',
  height: 76,
  overflow: 'hidden',
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  justifyContent: 'center',
  width: 48,
}));

const MainCard = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
