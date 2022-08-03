import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import { Divider, Typography } from '@mui/material';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  fte: number,
}

const TeamMember = ({ fte }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container>
    <CustomPopover
      title={'FTE = Permanent contributor fulltime equivalent'}
      id={'popover-fulltime equivalent'}
    >
      <Data>
        <ContainerRow> <StyleTypography isLight={isLight}>{fte}</StyleTypography> <Divider sx={{ bgcolor: isLight ? '#231536' : '#D2D4EF' }} /></ContainerRow>
        <Title isLight={isLight}>FTEs</Title>
      </Data>
    </CustomPopover>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontWeight: 400,
  cursor: 'pointer',

});

const StyleTypography = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontFamily: 'Inter,sanserif',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const Title = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginLeft: '8px',
  textAlign: 'center',
  fontFamily: 'FT Base, sans-serif',
  letterSpacing: '0.4px',
}));

const Data = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '4px 8px',
  borderRadius: '6px',
});

export default TeamMember;
