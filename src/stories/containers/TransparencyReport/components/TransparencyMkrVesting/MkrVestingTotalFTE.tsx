import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

interface MkrVestingTotalFTEProps {
  totalFTE: string | number;
}

const MkrVestingTotalFTE: React.FC<MkrVestingTotalFTEProps> = ({ totalFTE }) => {
  const { isLight } = useThemeContext();

  return (
    <ContainerPopover>
      <CustomPopover
        title={'Full-Time Equivalents'}
        id={'popover-fulltime equivalent'}
        popupStyle={{
          color: isLight ? '#231536' : '#D2D4EF',
        }}
      >
        <TotalFte isLight={isLight}>
          <span>Total FTEs</span>
          <u>{totalFTE}</u>
        </TotalFte>
      </CustomPopover>
    </ContainerPopover>
  );
};

export default MkrVestingTotalFTE;

export const ContainerPopover = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '36px',
});

export const TotalFte = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#D2D4EF',
  '> span': {
    marginRight: '16px',
  },
  '> u': {
    fontStyle: 'normal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 800,
    fontSize: '22px',
    lineHeight: '27px',
    paddingBottom: '2px',
    textDecoration: 'none',
    color: isLight ? '#25273D' : '#708390',
  },
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));
