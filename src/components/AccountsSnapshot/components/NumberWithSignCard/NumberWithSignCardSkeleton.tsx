import { styled } from '@mui/material';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import { useThemeContext } from '@/core/context/ThemeContext';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import { Card } from './NumberWithSignCard';

interface NumberWithSignCardSkeletonProps {
  sign: 'positive' | 'negative';
}

const NumberWithSignCardSkeleton: React.FC<NumberWithSignCardSkeletonProps> = ({ sign }) => {
  const { isLight } = useThemeContext();
  const fill = isLight ? colorPalette.charcoal[100] : colorPalette.charcoal[800];

  return (
    <Container>
      <SignContainer>
        {sign === 'positive' ? (
          <PlusSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" width="4" height="24" rx="2" fill={fill} />
            <rect y="14" width="4" height="24" rx="2" transform="rotate(-90 0 14)" fill={fill} />
          </PlusSVG>
        ) : (
          <MinusSVG viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="4" height="24" rx="2" transform="rotate(-90 0 4)" fill={fill} />
          </MinusSVG>
        )}
      </SignContainer>
      <Card sign={sign}>
        <Caption />

        <ValueWrapper>
          <Value />
          <Currency />
        </ValueWrapper>
      </Card>
    </Container>
  );
};

export default NumberWithSignCardSkeleton;

const Container = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const SignContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: 4,
}));

const PlusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 24,
    height: 24,
  },
}));

const MinusSVG = styled('svg')(({ theme }) => ({
  width: 16,
  height: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 24,
    height: 4,
  },
}));

const ValueWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: 4,
  marginTop: 4,
}));

const Value = styled(BaseSkeleton)(({ theme }) => ({
  width: 79,
  height: 22,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 103,
    height: 24,
  },
}));

const Currency = styled(BaseSkeleton)(({ theme }) => ({
  width: 24,
  height: 22,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 27,
    height: 24,
  },
}));

const Caption = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 99,
  height: 16,

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 158,
  },
}));
