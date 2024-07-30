import { styled } from '@mui/material';
import { threeDigitsPrecisionHumanization, usLocalizedNumber } from '@/core/utils/humanization';

interface LegendItemProps {
  inline: boolean;
  name: string;
  code?: string;
  color: string;
  value: number;
  percentage: number;
}

const LegendItem: React.FC<LegendItemProps> = ({ inline = false, name, code, color, value, percentage }) => {
  const valueFormatted = threeDigitsPrecisionHumanization(value);
  const formattedPercentage = `${
    percentage === 0
      ? 0
      : percentage < 0.1
      ? '<0.1'
      : percentage < 1
      ? usLocalizedNumber(percentage, 2)
      : usLocalizedNumber(percentage, 1)
  }%`;

  return (
    <LegendContainer inline={inline} color={color}>
      <Name>{inline ? code ?? name : name}</Name>
      {inline ? (
        <Line>
          <Value>{usLocalizedNumber(value, 2)}</Value>
          <Percentage>({formattedPercentage})</Percentage>
        </Line>
      ) : (
        <Line>
          <Percentage>({formattedPercentage})</Percentage>
          <Value>
            {valueFormatted.value} {valueFormatted.suffix}
          </Value>
        </Line>
      )}
    </LegendContainer>
  );
};

export default LegendItem;

const LegendContainer = styled('div')<{ inline: boolean; color: string }>(({ inline, color }) => ({
  display: 'flex',
  flexDirection: inline ? 'row' : 'column',
  gap: 4,
  position: 'relative',
  paddingLeft: 14,
  lineHeight: inline ? '15px' : '18px',

  '&::before': {
    content: '""',
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: color,
    position: 'absolute',
    left: 0,
    top: inline ? 3.5 : 8,
  },
}));

const Name = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Line = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 'normal',
}));

const Percentage = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[200],
}));

const Value = styled('span')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[400],
}));
