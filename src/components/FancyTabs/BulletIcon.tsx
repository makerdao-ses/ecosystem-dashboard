import { styled } from '@mui/material';
import { colorPalette } from '@ses/styles/theme/colorPalette';

const colors: Record<string, string> = {
  charcoal: colorPalette.charcoal[300],
  gray: colorPalette.gray[300],
  green: colorPalette.green[600],
  purple: colorPalette.purple[600],
  orange: colorPalette.orange[600],
  blue: colorPalette.blue[600],
};

interface BulletIconProps {
  color: keyof typeof colors;
}

const BulletIcon: React.FC<BulletIconProps> = ({ color }) => <Bullet color={color} />;

export default BulletIcon;

const Bullet = styled('div')<{ color: string }>(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: colors[color],
}));
