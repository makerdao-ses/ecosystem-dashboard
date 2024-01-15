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
  isShowSwiper: boolean;
}

const CardLegend: React.FC<Props> = ({
  changeAlignment,
  isCoreThirdLevel = true,
  doughnutSeriesData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
  isShowSwiper,
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
              <NameOrCode isLight={isLight} isCoreThirdLevel={isCoreThirdLevel} isShowSwiper={isShowSwiper}>
                {isCoreThirdLevel ? getShortCode(data?.code || '') : data.name}
              </NameOrCode>
            </IconWithName>
            <Value isLight={isLight} isCoreThirdLevel={isCoreThirdLevel}>
              <span>{`(${data.percent}%)`}</span>
              <div>{valueRounded.value}</div>
              <span>{valueRounded.suffix}</span>
            </Value>
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
    gap: isCoreThirdLevel ? 4 : 4,
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
    color: isLight ? '#43435' : '#EDEFFF',
    cursor: 'pointer',
    minWidth: 190,
    ...(changeAlignment && {
      minWidth: 0,
    }),
    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 8,
    },
  })
);
const Value = styled.div<WithIsLight & { isCoreThirdLevel: boolean }>(({ isLight, isCoreThirdLevel }) => ({
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
  '& span': {
    display: 'inline-block',
    marginLeft: isCoreThirdLevel ? 2 : 4,
  },
}));

const IconWithName = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  alignItems: 'center',
});

const NameOrCode = styled.div<WithIsLight & { isCoreThirdLevel: boolean; isShowSwiper: boolean }>(
  ({ isLight, isCoreThirdLevel, isShowSwiper }) => ({
    color: isLight ? (isCoreThirdLevel ? '#708390' : '#434358') : '#EDEFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: 400,

    lineHeight: 'normal',
    ...(!isShowSwiper && {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),

    width: isCoreThirdLevel ? 'fit-content' : 170,
  })
);

const ContainerLegend = styled.div<{ isCoreThirdLevel: boolean; changeAlignment: boolean }>(
  ({ isCoreThirdLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: isCoreThirdLevel && changeAlignment ? 'flex-start' : changeAlignment ? 'flex-start' : 'center',
    gap: isCoreThirdLevel ? 16 : 14,
    maxWidth: '100%',
    maxHeight: 210,

    overflow: 'hidden',
    ...(changeAlignment && {
      flex: 1,
    }),

    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 16,
    },
  })
);
