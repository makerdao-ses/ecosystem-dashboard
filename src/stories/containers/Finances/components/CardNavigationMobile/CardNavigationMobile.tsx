import styled from '@emotion/styled';
import ArrowNavigationForCards from '@ses/components/svg/ArrowNavigationForCards';
import HorizontalBudgetBar from '@ses/containers/FinancesOverview/components/HorizontalBudgetBar/HorizontalBudgetBar';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CardNavigationGeneric from '../CardNavigationGeneric';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  budgetCap: number;
  image: string;
  title: string;
  totalDai: number;
  valueDai: number;
  href: string;
  barColor: string;
  width?: number;
  height?: number;
  code: string;
  percent: number;
  maxValue: number;
}

const CardNavigationMobile: React.FC<Props> = ({
  budgetCap,
  image,
  title,
  valueDai,
  href,
  barColor,
  code,
  percent,
  maxValue,
}) => {
  const { isLight } = useThemeContext();
  const budgetCapFormatted = threeDigitsPrecisionHumanization(budgetCap);
  const valueFormatted = threeDigitsPrecisionHumanization(valueDai);

  const showCode = code && code.length > 0;
  const showCodeBelow =
    showCode &&
    (code.toLocaleLowerCase() === code ||
      (code.includes('-') && code.toUpperCase() !== code) ||
      /[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?/.test(code));

  const maxPercentage =
    percentageRespectTo(Math.max(budgetCap, valueDai), maxValue) > 97
      ? 97
      : percentageRespectTo(Math.max(budgetCap, valueDai), maxValue);

  return (
    <StyleCardNavigationGeneric>
      <Link href={href} legacyBehavior passHref>
        <LinkTag>
          <ContainerSpace>
            <MainCard>
              <ContainerData>
                <ContainerIcon>
                  <ContainerImage>
                    <Image src={image} width={32} height={32} alt="Picture" unoptimized />
                  </ContainerImage>
                  <TitleContainer>
                    <Title isLight={isLight}>
                      {showCode && !showCodeBelow && <span>{code}</span>} {title}
                    </Title>
                    {showCodeBelow && (
                      <Title isLight={isLight}>
                        <span>{code}</span>
                      </Title>
                    )}
                  </TitleContainer>
                </ContainerIcon>
                <CardInformation>
                  <ContainerTotal>
                    <Value isLight={isLight}>
                      {valueFormatted.value}
                      <Suffix isLight={isLight}>{valueFormatted.suffix}</Suffix>
                    </Value>
                    <Value isLight={isLight}>/</Value>
                    <Value isLight={isLight}>
                      {budgetCapFormatted.value}
                      <Suffix isLight={isLight}>{budgetCapFormatted.suffix}</Suffix>
                    </Value>
                  </ContainerTotal>
                  <ContainerBarPercent>
                    <ContainerBar>
                      <BarPercentRelativeToTotalStyled
                        barColor={barColor}
                        isLight={isLight}
                        budgetCap={budgetCap}
                        actuals={valueDai}
                        prediction={0}
                        maxPercentage={maxPercentage}
                      />
                    </ContainerBar>
                    <Percent isLight={isLight} isRightPartZero={budgetCap === 0}>
                      {budgetCap === 0
                        ? '-- '
                        : percent === 0
                        ? 0
                        : percent < 0.1
                        ? '<0.1'
                        : percent < 1
                        ? usLocalizedNumber(percent, 2)
                        : Math.round(percent)}
                      %
                    </Percent>
                  </ContainerBarPercent>
                </CardInformation>
              </ContainerData>
            </MainCard>
            <ArrowContainer isLight={isLight}>
              <ArrowNavigationForCards width={32} height={32} fill={isLight ? '#434358' : '#B7A6CD'} />
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

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  color: isLight ? '#231536' : '#D2D4EF',

  '& span': {
    color: isLight ? '#B6BCC2' : '#546978',
    fontWeight: 600,
    lineHeight: 'normal',
  },
}));

const CardInformation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  flex: 1,
  width: '100%',
  height: 17,
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 'normal',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#D2D4EF',
  height: 17,
  textTransform: 'uppercase',
  textAlign: 'center',
  display: 'flex',
}));

const Suffix = styled.span<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: 'normal',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : '#9FAFB9',
  marginLeft: 4,
  textTransform: 'uppercase',
  width: 'fit-content',
  display: 'flex',
}));

const ContainerBarPercent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: 4,
  marginRight: 8,
});

const ContainerBar = styled.div({
  width: 97,
  borderRadius: 4,
});

const Percent = styled.div<WithIsLight & { isRightPartZero: boolean }>(({ isLight, isRightPartZero }) => ({
  textAlign: 'right',
  fontVariantNumeric: 'lin',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  width: 34,
  color: isRightPartZero ? (isLight ? '#9FAFB9' : '#708390') : isLight ? '#231536' : '#D2D4EF',
}));

const BarPercentRelativeToTotalStyled = styled(HorizontalBudgetBar)<WithIsLight & { barColor: string }>(
  ({ barColor, isLight }) => ({
    borderRadius: 4,
    backgroundColor: isLight ? '#ECF1F3' : '#10191F',
    height: 16,

    '& > div[data-type="actuals"]': {
      background: barColor,
    },

    ...((barColor === '#F99374' || barColor === '#F77249') && {
      '& > div[data-type="budget"]': {
        background: isLight ? '#2DC1B1' : '#098C7D',
      },
    }),
  })
);

const ContainerData = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 8,
  paddingLeft: 8,
  paddingBottom: 8,
  flex: 1,
});

const LinkTag = styled.a({});
const ArrowContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  position: 'absolute',
  backgroundColor: isLight ? '#F9FAFF' : 'rgba(60, 62, 100, 0.50);',
  alignItems: 'center',
  height: '100%',
  right: 0,
  overflow: 'hidden',
  borderTopRightRadius: 6,
  borderBottomRightRadius: 6,
  justifyContent: 'center',
  width: 48,
  zIndex: 4,

  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const MainCard = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'calc(100% - 48px)',
});

const ContainerSpace = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const ContainerTotal = styled.div({
  display: 'flex',
  gap: 4,
});
