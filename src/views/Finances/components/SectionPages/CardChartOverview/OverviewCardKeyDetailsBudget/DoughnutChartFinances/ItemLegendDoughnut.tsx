import { styled } from '@mui/material';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@ses/core/utils/humanization';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import { getShortCode } from '../../utils';

interface Props {
  isCoreThirdLevel?: boolean;
  changeAlignment: boolean;
  doughnutData: DoughnutSeries;
  toggleSeriesVisibility: (seriesName: string) => void;
  onLegendItemLeave: (legendName: string) => void;
  onLegendItemHover: (legendName: string) => void;
}

const ItemLegendDoughnut: React.FC<Props> = ({
  changeAlignment,
  isCoreThirdLevel = true,
  doughnutData,
  onLegendItemHover,
  onLegendItemLeave,
  toggleSeriesVisibility,
}) => {
  const valueRounded = threeDigitsPrecisionHumanization(doughnutData?.value, true);

  return (
    <LegendItem
      key={doughnutData.name}
      changeAlignment={changeAlignment}
      isCoreThirdLevel={isCoreThirdLevel}
      onClick={() => toggleSeriesVisibility(doughnutData.name)}
      onMouseEnter={() => onLegendItemHover(doughnutData.name)}
      onMouseLeave={() => onLegendItemLeave(doughnutData.name)}
    >
      <IconWithName>
        <LegendIcon backgroundColor={doughnutData.color || 'blue'} />
        <NameOrCode isCoreThirdLevel={isCoreThirdLevel}>
          {isCoreThirdLevel ? getShortCode(doughnutData?.code || '') : doughnutData.name}
        </NameOrCode>
      </IconWithName>
      <ValueDescription isCoreThirdLevel={isCoreThirdLevel}>
        <Percent>{`(${
          doughnutData.percent === 0
            ? 0
            : doughnutData.percent < 0.1
            ? '<0.1'
            : doughnutData.percent < 1
            ? usLocalizedNumber(doughnutData.percent, 2)
            : usLocalizedNumber(doughnutData.percent, 1)
        }%)`}</Percent>
        <ContainerValue>
          <Value>
            {valueRounded.value} {valueRounded.suffix}
          </Value>
        </ContainerValue>
      </ValueDescription>
    </LegendItem>
  );
};

export default ItemLegendDoughnut;

const LegendIcon = styled('div')<{ backgroundColor: string }>(({ backgroundColor }) => ({
  backgroundColor,
  minWidth: 8,
  maxWidth: 8,
  maxHeight: 8,
  minHeight: 8,
  borderRadius: '50%',
}));
const LegendItem = styled('div')<{ isCoreThirdLevel: boolean; changeAlignment: boolean }>(
  ({ isCoreThirdLevel, changeAlignment }) => ({
    display: 'flex',
    flexDirection: isCoreThirdLevel ? 'row' : 'column',
    gap: 2,
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    minWidth: 190,
    ...(changeAlignment && {
      minWidth: 0,
    }),
  })
);

const ValueDescription = styled('div')<{ isCoreThirdLevel: boolean }>(({ theme, isCoreThirdLevel }) => ({
  color: theme.palette.isLight ? '#9FAFB9' : '#546978',
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 'normal',
  display: 'flex',
  marginLeft: isCoreThirdLevel ? 4 : 14,
  ...(isCoreThirdLevel && {
    whiteSpace: 'revert',
    overflow: 'revert',
    textOverflow: 'revert',
  }),

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
  },
}));

const IconWithName = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 6,
  alignItems: 'center',
});

const NameOrCode = styled('div')<{ isCoreThirdLevel: boolean }>(({ theme, isCoreThirdLevel }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontSize: 12,
  fontWeight: 600,
  lineHeight: isCoreThirdLevel ? '15px' : '18px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: isCoreThirdLevel ? 'fit-content' : 170,

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 14,
    lineHeight: '24px',
  },
}));

const Percent = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[700],
}));

const Value = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[400],
}));

const ContainerValue = styled('div')({
  display: 'flex',
  marginLeft: 4,
});
