import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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
  marginBottom: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 32,
  },
});

export const TotalFte = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',

  '> u': {
    fontStyle: 'normal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 800,
    fontSize: '16px',
    lineHeight: '19px',
    paddingBottom: '2px',
    textDecoration: 'none',
    color: isLight ? '#25273D' : '#708390',
    marginLeft: 8,

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: '20px',
      lineHeight: '24px',
      marginLeft: 16,
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      fontSize: '22px',
      lineHeight: '27px',
    },
  },

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
    lineHeight: '19px',
    fontWeight: 700,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));
