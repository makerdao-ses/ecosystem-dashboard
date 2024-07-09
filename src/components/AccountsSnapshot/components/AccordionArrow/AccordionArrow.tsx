import { styled } from '@mui/material';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import { useThemeContext } from '@/core/context/ThemeContext';

const AccordionArrow: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <SVG viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.50942 9.7718C7.76647 10.0761 8.23358 10.0761 8.49062 9.7718L15.8457 1.06587C16.2008 0.645583 15.9037 0 15.3551 0H0.644894C0.0963604 0 -0.200786 0.645583 0.154293 1.06587L7.50942 9.7718Z"
        fill={isLight ? colorPalette.gray[900] : colorPalette.gray[500]}
      />
    </SVG>
  );
};

export default AccordionArrow;

const SVG = styled('svg')(() => ({
  width: 10,
  height: 6,
  margin: '5px 3px',
}));
