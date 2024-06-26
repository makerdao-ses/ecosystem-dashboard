import { Typography, styled } from '@mui/material';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import ToolTipsCU from '@/views/CoreUnitsIndexView/components/ToolTips/ToolTips';

interface Props {
  ftes: number;
}

const TeamMember = ({ ftes }: Props) => (
  <Container>
    <SESTooltipStyled content={<ToolTipsCU>Full-Time Equivalents</ToolTipsCU>}>
      <Data>
        <ContainerRow>
          <StyleTypography>{ftes}</StyleTypography>
        </ContainerRow>
        <Title>FTEs</Title>
      </Data>
    </SESTooltipStyled>
  </Container>
);
export default TeamMember;

const Container = styled('div')({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontWeight: 400,
  cursor: 'pointer',
});

const StyleTypography = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  borderBottom: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50]}`,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  lineHeight: '21.6px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginLeft: '8px',
  textAlign: 'center',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const Data = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const ContainerRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '4px 8px',
  borderRadius: '6px',
});

const SESTooltipStyled = styled(SESTooltip)({
  padding: 0,
  width: 'fit-content',
  '&.MuiTooltip-tooltip MuiTooltip-tooltipPlacementBottom': {
    backgroundColor: 'red',
  },
  '& div': {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,

    fontWeight: 500,
    lineHeight: '24px',
  },
});
