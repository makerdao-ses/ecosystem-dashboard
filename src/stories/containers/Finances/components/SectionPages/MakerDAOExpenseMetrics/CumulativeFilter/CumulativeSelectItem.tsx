import { styled } from '@mui/material';
import RadioInputSVG from '@ses/components/svg/RadioInputSVG';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

type ItemType = 'relative' | 'absolute';

interface CumulativeSelectItemProps {
  type: ItemType;
  selected: boolean;
  onClick: () => void;
}

const RelativeIcon: React.FC<WithIsLight> = ({ isLight }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      x1="1.3999"
      y1="15.5858"
      x2="14.1278"
      y2="2.85786"
      stroke={isLight ? '#546978' : '#405361'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 4"
    />
    <path d="M1 1L0.999999 17" stroke={isLight ? '#231536' : '#D2D4EF'} strokeWidth="2" strokeLinecap="round" />
    <path d="M1 17L17 17" stroke={isLight ? '#231536' : '#D2D4EF'} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AbsoluteIcon: React.FC<WithIsLight> = ({ isLight }) => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.11719 11.9424L15.2593 4.20025"
      stroke={isLight ? '#546978' : '#405361'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="4 4"
    />
    <path
      d="M1 1.02539L0.999999 17.0254"
      stroke={isLight ? '#231536' : '#D2D4EF'}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M1 17.0254L17 17.0254" stroke={isLight ? '#231536' : '#D2D4EF'} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CumulativeSelectItem: React.FC<CumulativeSelectItemProps> = ({ type, selected, onClick }) => {
  const { isLight } = useThemeContext();

  return (
    <Item type={type} onClick={onClick}>
      <Content>
        <Icon>{type === 'relative' ? <RelativeIcon isLight={isLight} /> : <AbsoluteIcon isLight={isLight} />}</Icon>
        <TextContainer>
          <Title>{type === 'relative' ? 'Relative' : 'Absolute'} Cumulative</Title>
          <Description>
            {type === 'relative'
              ? 'Aggregated expense metrics relative to the start of the year'
              : 'A continuous aggregation of expenses over the entire dataset'}
          </Description>
        </TextContainer>
      </Content>
      <CheckIcon>
        <RadioInput checked={selected} />
      </CheckIcon>
    </Item>
  );
};

export default CumulativeSelectItem;

const Item = styled('div')<{ type: ItemType }>(({ theme, type }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  padding: type === 'relative' ? '24px 16px 20px' : '20px 16px 24px',
  gap: 16,

  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? '#F6F8F9' : '#25273D',
  },
}));

const Content = styled('div')({
  display: 'flex',
  gap: 8,
});

const Icon = styled('div')({
  width: 16,
  height: 16,
});

const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const Title = styled('div')(({ theme }) => ({
  fontSize: 14,
  lineHeight: '17px',
  fontWeight: 400,
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
}));

const Description = styled('div')(({ theme }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: theme.palette.mode === 'light' ? '#708390' : '#546978',
}));

const CheckIcon = styled('div')(() => ({
  width: 16,
  height: 16,
}));

const RadioInput = styled(RadioInputSVG)(({ theme }) => ({
  '& > circle:first-of-type': {
    stroke: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  },

  '& > circle:nth-child(2)': {
    fill: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  },
}));
