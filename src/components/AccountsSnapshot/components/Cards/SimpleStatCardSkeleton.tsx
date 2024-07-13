import { styled, useMediaQuery } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import EqualSign from '../SVG/Equals';
import type { Theme } from '@mui/material';

interface SimpleStatCardSkeletonProps {
  withEquals?: boolean;
}

const SimpleStatCardSkeleton: React.FC<SimpleStatCardSkeletonProps> = ({ withEquals = false }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));

  return (
    <CardStat>
      <CardTitle />
      <Content>
        {withEquals && (
          <EqualsWrapper>
            <EqualSign asSkeleton width={isTablet ? 16 : 24} height={isTablet ? 10 : 15} />
          </EqualsWrapper>
        )}

        <ContentWrapper>
          <Caption />
          <ValueContainer>
            <Value />
            <Currency />
          </ValueContainer>
        </ContentWrapper>
      </Content>
    </CardStat>
  );
};

export default SimpleStatCardSkeleton;

const CardStat = styled(Card)(({ theme }) => ({
  padding: 8,

  [theme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px',
    minWidth: 158,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: 16,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },
}));

const CardTitle = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 74,
  height: 18,
  marginBottom: 8,

  [theme.breakpoints.up('tablet_768')]: {
    marginBottom: 22,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginBottom: 26,
  },
}));

const Content = styled('div')({
  display: 'flex',
});

const EqualsWrapper = styled('div')(({ theme }) => ({
  marginTop: 14,
  marginRight: 4,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: -2,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: 7,
    marginRight: 15,
  },
}));

const ContentWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '3px 7px 7px',
  borderRadius: 12,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const ValueContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
});

const Value = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 81,
  height: 22,

  [theme.breakpoints.up('tablet_768')]: {
    height: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 103,
  },
}));

const Currency = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 24,
  height: 22,
  marginLeft: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 27,
    height: 24,
  },
}));

const Caption = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 103,
  height: 16,
  marginBottom: 4,

  [theme.breakpoints.up('desktop_1024')]: {
    maxWidth: 118,
  },
}));
