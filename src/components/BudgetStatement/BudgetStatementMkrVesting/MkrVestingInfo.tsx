import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

const MkrVestingInfo: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <InfoContainer>
      <Text isLight={isLight}>This Overview is based on MIP40c3-SP17, SES’ MKR Incentive Proposal.</Text>

      <Text isLight={isLight}>
        The Difference column indicates any changes in the MKR vesting amounts compared to last month, with the
        Reason(s) column indicating why the amounts changed. Reasons may include: New hires, FTE changes, Promotions, or
        Terminations.
      </Text>
    </InfoContainer>
  );
};

export default MkrVestingInfo;

const InfoContainer = styled.div({
  '& > div:first-of-type': {
    marginBottom: 16,
  },
});

const Text = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
}));
