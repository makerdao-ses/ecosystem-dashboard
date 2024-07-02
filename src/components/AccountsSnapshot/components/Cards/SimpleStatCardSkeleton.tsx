import { styled, useMediaQuery } from '@mui/material';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import EqualSign from '../SVG/Equals';
import type { Theme } from '@mui/material';

interface SimpleStatCardSkeletonProps {
  withEquals?: boolean;
}

const SimpleStatCardSkeleton: React.FC<SimpleStatCardSkeletonProps> = ({ withEquals = false }) => {
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1194'));

  return (
    <Card withEquals={withEquals}>
      <CardTitle withEquals={withEquals} />
      <Content>
        {withEquals && (
          <EqualsWrapper>
            <EqualSign asSkeleton width={isTablet ? 16 : 24} height={isTablet ? 10 : 15} />
          </EqualsWrapper>
        )}

        <ContentWrapper>
          <ValueContainer>
            <Value />
            <Currency />
          </ValueContainer>
          <Caption />
        </ContentWrapper>
      </Content>
    </Card>
  );
};

export default SimpleStatCardSkeleton;

const Card = styled('div')<{ withEquals: boolean }>(({ theme, withEquals }) => ({
  background: theme.palette.isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  boxShadow: theme.palette.isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  padding: withEquals ? '8px 16px 16px 16.5px' : '8px 34.5px 16px 16px',

  [theme.breakpoints.up('table_834')]: {
    padding: withEquals ? '16px 11px 16px 16px' : '16px 15px 16px 16px',
  },

  [theme.breakpoints.up('desktop_1194')]: {
    padding: withEquals ? '24px 13.5px 29px 16px' : '24px 16px 29px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    padding: withEquals ? '24px 32.5px 24px 24px' : '24px 32px 29px 24px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: withEquals ? '24px 32px 24px 32px' : '24px 32px 29px 32px',
  },
}));

const CardTitle = styled(BaseSkeleton)<{ withEquals: boolean }>(({ theme, withEquals }) => ({
  maxWidth: 71,
  height: 9.625,
  marginBottom: 19.38,
  ...(withEquals && {
    marginLeft: 'auto',
  }),

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 88,
    height: 10.5,
    marginBottom: 30.5,
    marginLeft: 0,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginBottom: 39.5,
  },
}));

const Content = styled('div')({
  display: 'flex',
});

const EqualsWrapper = styled('div')(({ theme }) => ({
  marginTop: -5,
  marginRight: 4,

  [theme.breakpoints.up('table_834')]: {
    marginTop: -2,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    marginTop: 7,
    marginRight: 15,
  },
}));

const ContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const ValueContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
});

const Value = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 89,
  height: 14,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 102,
    height: 17.5,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 152,
    height: 26.25,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 191,
    height: 26,
  },
}));

const Currency = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 22,
  height: 10.5,
  marginLeft: 4,
  marginBottom: -0.5,

  [theme.breakpoints.up('table_834')]: {
    maxWidth: 29,
    height: 14,
    marginBottom: 0,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: 36,
  },
}));

const Caption = styled(BaseSkeleton)(({ theme }) => ({
  maxWidth: 117,
  height: 9.63,
  marginTop: 9,
  marginBottom: 3.38,

  [theme.breakpoints.up('table_834')]: {
    marginTop: 13.5,
  },

  [theme.breakpoints.up('desktop_1194')]: {
    maxWidth: 110,
    height: 14,
    marginTop: 15.75,
  },
}));
