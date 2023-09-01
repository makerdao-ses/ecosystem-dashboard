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
          <ContainerSpace>
            <MainCard>
              <ContainerData>
                <ContainerIcon>
                  <ContainerImage>{svgImage}</ContainerImage>
                  <Title>{title}</Title>
                </ContainerIcon>
                <CardInformation>
                  <ContainerTotal>
                    <Total isLight={isLight}>
                      {`${formatted}`}
                      <Coin isLight={isLight}>DAI</Coin>
                    </Total>
                  </ContainerTotal>
                  <ContainerBarPercent>
                    <ContainerBar>
                      <BarPercentRelativeToTotalStyled value={3456} total={23456} barColor={barColor} />
                    </ContainerBar>
                    <Percent>{Math.floor(percent)}%</Percent>
                  </ContainerBarPercent>
                </CardInformation>
              </ContainerData>
            </MainCard>
            <ArrowContainer isLight={isLight}>
              <ArrowNavigationForCards width={32} height={32} />
            </ArrowContainer>
          </ContainerSpace>
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
  position: 'relative',
});
const ContainerIcon = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1,
  gap: 8,
  marginBottom: 8,
});

const ContainerImage = styled.div({
  width: 32,
  height: 32,
});
const Title = styled.div({
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
});

const CardInformation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  width: '100%',
  height: 17,
});

const Total = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 'normal',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#EDEFFF',
  height: 17,
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

  lineHeight: 'normal',
}));

const ContainerBarPercent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 4,
});

const ContainerBar = styled.div({
  width: 97,
  borderRadius: 4,
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
});

const BarPercentRelativeToTotalStyled = styled(BarPercentRelativeToTotal)<{ barColor: string }>(({ barColor }) => ({
  borderRadius: 4,
  '& > div': {
    background: barColor,
  },
}));

const ContainerData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 8,
  paddingLeft: 8,
  paddingBottom: 8,
});

const LinkTag = styled.a({});
const ArrowContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  position: 'absolute',
  backgroundColor: isLight ? '#F9FAFF' : 'red',
  alignItems: 'center',
  height: '100%',
  right: 0,
  overflow: 'hidden',
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  justifyContent: 'center',
  width: 48,
  zIndex: 4,

  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
}));

const MainCard = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  // height: '100%',
});

const ContainerSpace = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const ContainerTotal = styled.div({});
