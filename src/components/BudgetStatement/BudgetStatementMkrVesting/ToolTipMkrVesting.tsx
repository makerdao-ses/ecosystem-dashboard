import { styled } from '@mui/material';
import Info from 'public/assets/svg/info_outlined.svg';
import React from 'react';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { FC } from 'react';

interface Props {
  title: string;
}

const ToolTipMkrVesting: FC<Props> = ({ title }) => (
  <Container>
    <div>{title}</div>

    <SESTooltipStyled
      showAsModal
      content={
        <ContainerToolTip>
          The Difference column indicates any changes in the MKR vesting amounts compared to last month, with the
          Reason(s) column indicating why the amounts changed. Reasons may include: New hires, FTE changes, Promotions,
          or Terminations.
        </ContainerToolTip>
      }
    >
      <IconContainer>
        <Info />
      </IconContainer>
    </SESTooltipStyled>
  </Container>
);

export default ToolTipMkrVesting;

const Container = styled('div')({
  display: 'flex',
  gap: 4.5,
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const SESTooltipStyled = styled(SESTooltip)(({ theme }) => ({
  padding: 0,
  marginTop: 0,
  width: '100%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  minWidth: 327,
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
}));

const IconContainer = styled('div')(({ theme }) => ({
  width: 15,
  height: 15,
  display: 'flex',
  cursor: 'pointer',
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  },
  ':hover': {
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.slate[100],
    },
  },
}));

const ContainerToolTip = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '24px',
  padding: 0,
  [theme.breakpoints.up('tablet_768')]: {
    padding: 16,
  },
}));
