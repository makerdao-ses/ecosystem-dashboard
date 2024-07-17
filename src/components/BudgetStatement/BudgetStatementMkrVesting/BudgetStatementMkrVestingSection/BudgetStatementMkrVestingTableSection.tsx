import { styled } from '@mui/material';
import Info from 'public/assets/svg/info_outlined.svg';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import SESTooltip from '@/components/SESTooltip/SESTooltip';
import type { ResourceType } from '@/core/models/interfaces/types';
import MkrVestingTotalFTE from '../MkrVestingTotalFTE';
import type { FC } from 'react';

interface Props {
  fTEs: string | number;
  mainTableColumns: InnerTableColumn[];
  mainTableItems: InnerTableRow[];
  longCode: string;
  shortCode: string;
  resource: ResourceType;
}

const BudgetStatementMkrVestingTableSection: FC<Props> = ({
  fTEs,
  mainTableColumns,
  mainTableItems,
  longCode,
  shortCode,
  resource,
}) => (
  <Container>
    <ContainerTitle marginBottom={16}>
      <Title>MKR Vesting Overview</Title>

      <SESTooltipStyled
        content={
          <ContainerToolTip>This Overview is based on MIP40c3-SP17, SES’MKR Incentive Proposal.</ContainerToolTip>
        }
      >
        <IconContainer className="advance-table--transparency-card_icon_hidden">
          <Info />
        </IconContainer>
      </SESTooltipStyled>
    </ContainerTitle>
    <MkrVestingTotalFTE totalFTE={fTEs} />
    <AdvancedInnerTable
      columns={mainTableColumns}
      items={mainTableItems}
      longCode={longCode}
      cardSpacingSize="small"
      tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={shortCode} resource={resource} />}
    />
  </Container>
);

export default BudgetStatementMkrVestingTableSection;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled('div')<{
  responsiveMarginBottom?: number;
}>(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize: 20,
  lineHeight: '24px',

  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

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

const ContainerTitle = styled('div')<{ marginBottom?: number; responsiveMarginBottom?: number; marginTop?: number }>(
  ({ marginBottom = 24, responsiveMarginBottom, theme, marginTop = 24 }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12.5,
    marginTop,
    marginBottom: `${marginBottom}px`,
    [theme.breakpoints.up('tablet_768')]: {
      marginBottom: `${responsiveMarginBottom || marginBottom}px`,
    },
  })
);

const ContainerToolTip = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '24px',
  padding: 16,
}));
