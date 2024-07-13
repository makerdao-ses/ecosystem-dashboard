import { styled } from '@mui/material';
import React from 'react';
import { BaseSkeleton } from '../BaseSkeleton/BaseSkeleton';
import NumberWithSignCardSkeleton from '../NumberWithSignCard/NumberWithSignCardSkeleton';
import {
  Arrow,
  CardStat,
  ChangeContainer,
  ChangeContent,
  FillSpace,
  LeftArrowContainer,
  RightArrowContainer,
} from './FundChangeCard';

const FundChangeCardSkeleton: React.FC = () => (
  <CardStat>
    <ChangeContainer>
      <LeftArrowContainer>
        <FillSpace position="left" />
        <Arrow direction="left" />
      </LeftArrowContainer>
      <ChangeContent>
        <NetChangeValue />
        <NetChangeCaption />
      </ChangeContent>
      <RightArrowContainer>
        <Arrow direction="right" />
        <FillSpace position="right" />
      </RightArrowContainer>
    </ChangeContainer>

    <ValuesContainer>
      <NumberWithSignCardSkeleton sign="positive" />
      <NumberWithSignCardSkeleton sign="negative" />
    </ValuesContainer>
  </CardStat>
);

export default FundChangeCardSkeleton;

const NetChangeValue = styled(BaseSkeleton)(() => ({
  width: 94,
  height: 20,
  marginBottom: 4,
}));

const NetChangeCaption = styled(BaseSkeleton)(() => ({
  width: 69,
  height: 16,
}));

const ValuesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 8,
  flexDirection: 'row',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },
}));
