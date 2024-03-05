import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { threeDigitsPrecisionHumanization } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { getShortCode } from '../../SectionPages/CardChartOverview/utils';
import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  isCoreThirdLevel?: boolean;
  changeAlignment: boolean;
  doughnutSeriesData: DoughnutSeries[];
  toggleSeriesVisibility: (seriesName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  onLegendItemHover: (legendName: string) => void;
}

const CardLegend: React.FC<Props> = ({
  changeAlignment,
  isCoreThirdLevel = true,
  doughnutSeriesData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}) => {
  const { isLight } = useThemeContext();

  return (
    <ContainerLegend isCoreThirdLevel={isCoreThirdLevel} changeAlignment={changeAlignment}>
      {doughnutSeriesData.map((data, index) => {
        const valueRounded = threeDigitsPrecisionHumanization(data?.value);

        return (
          <LegendItem
            key={index}
            changeAlignment={changeAlignment}
            isCoreThirdLevel={isCoreThirdLevel}
            isLight={isLight}
            onClick={() => toggleSeriesVisibility(data.name)}
            onMouseEnter={() => onLegendItemHover(data.name)}
            onMouseLeave={() => onLegendItemLeave(data.name)}
          >
            <IconWithName>
              <LegendIcon backgroundColor={data.color || 'blue'} />
              <NameOrCode isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
                {isCoreThirdLevel ? getShortCode(data?.code || '') : data.name}
              </NameOrCode>
            </IconWithName>
            <ValueDescription isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
              <Percent isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>{`(${data.percent}%)`}</Percent>
              <ContainerValue>
                <Value isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
                  {valueRounded.value}
                </Value>
                <Suffix isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
                  {valueRounded.suffix}
                </Suffix>
              </ContainerValue>
            </ValueDescription>
          </LegendItem>
        );
      })}
    </ContainerLegend>
  );
};

export default CardLegend;

const LegendIcon = styled.div<{ backgroundColor: string }>(({ backgroundColor }) => ({
  backgroundColor,
  minWidth: 8,
  maxWidth: 8,
  maxHeight: 8,
  minHeight: 8,
  borderRadius: '50%',
}));
const LegendItem = styled.div<WithIsLight & { isCoreThirdLevel: boolean; changeAlignment: boolean }>(
  ({ isLight, isCoreThirdLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: isCoreThirdLevel ? 'row' : 'column',
    gap: isCoreThirdLevel ? 0 : 4,
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
    color: isLight ? '#43435' : '#EDEFFF',
    cursor: 'pointer',
    minWidth: 190,
    ...(changeAlignment && {
      minWidth: 0,
    }),
    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: isCoreThirdLevel ? 0 : 8,
    },
  })
);
const ValueDescription = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
  color: isLight ? '#9FAFB9' : '#546978',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  display: 'flex',
  marginLeft: isCoreThirdLevel ? 4 : 14,
  ...(isCoreThirdLevel && {
    whiteSpace: 'revert',
    overflow: 'revert',
    textOverflow: 'revert',
  }),
}));

const IconWithName = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  alignItems: 'center',
});

const NameOrCode = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
  color: isLight ? (isCoreThirdLevel ? '#B6BCC2' : '#434358') : '#EDEFFF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: isCoreThirdLevel ? 700 : 600,

  lineHeight: 'normal',

  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  width: isCoreThirdLevel ? 'fit-content' : 170,
}));

const ContainerLegend = styled.div<{ isCoreThirdLevel: boolean; changeAlignment: boolean }>(
  ({ isCoreThirdLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isCoreThirdLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isCoreThirdLevel ? 16 : 14,
    maxWidth: '100%',
    maxHeight: isCoreThirdLevel ? 180 : 210,
    overflow: 'hidden',
    ...(changeAlignment && {
      flex: 1,
    }),

    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 16,
    },
  })
);

const Percent = styled.span<WithIsLight & { isCoreThirdLevel: boolean }>(({ isCoreThirdLevel, isLight }) => ({
  color: isLight ? (isCoreThirdLevel ? '#6F7A85' : '#B6BCC2') : '#6F7A85',
}));

const Value = styled.span<WithIsLight & { isCoreThirdLevel: boolean }>(({ isCoreThirdLevel, isLight }) => ({
  color: isLight ? (isCoreThirdLevel ? '#0E1010' : '#6F7A85') : '#B6BCC2',
}));

const Suffix = styled.span<WithIsLight & { isCoreThirdLevel: boolean }>(({ isCoreThirdLevel, isLight }) => ({
  color: isLight ? (isCoreThirdLevel ? '#0E1010' : '#6F7A85') : '#B6BCC2',
}));

const ContainerValue = styled.div({
  display: 'flex',
  marginLeft: 4,
});
