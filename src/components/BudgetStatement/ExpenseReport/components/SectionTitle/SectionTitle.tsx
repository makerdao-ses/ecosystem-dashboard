import { styled } from '@mui/material';
import { toKebabCase } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
import Info from 'public/assets/svg/info_outlined.svg';
import React from 'react';
import {
  ContainerToolTip,
  IconContainer,
} from '@/components/BudgetStatement/BudgetStatementMkrVesting/BudgetStatementMkrVestingSection/BudgetStatementMkrVestingTableSection';
import SESTooltip from '@/components/SESTooltip/SESTooltip';

interface SectionTitleProps extends React.PropsWithChildren {
  level?: 1 | 2;
  hasIcon?: boolean;
  hasExternalIcon?: boolean;
  idPrefix?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, level = 1, hasIcon = false, idPrefix = '' }) => (
  <Container>
    <Title level={level} as={level === 1 ? 'h2' : 'h3'} id={`#${idPrefix}-${toKebabCase(children as string)}`}>
      {children}
    </Title>
    {hasIcon && (
      <ContainerTitle>
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
    )}
  </Container>
);

export default SectionTitle;

const Title = styled('h2')<{ level: number }>(({ theme, level }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 16,
  lineHeight: level === 1 ? '24px' : 'normal',

  fontWeight: level === 1 ? 600 : 700,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  margin: 0,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 18,
    lineHeight: '21.6px',
    letterSpacing: '0.4px',
    fontWeight: 700,
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

const SESTooltipStyled = styled(SESTooltip)(({ theme }) => ({
  padding: 0,
  marginTop: 0,
  width: '100%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  minWidth: 327,
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
}));

const Container = styled('div')({
  display: 'flex',
  gap: 12.5,
});
