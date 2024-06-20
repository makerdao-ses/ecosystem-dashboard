import { styled } from '@mui/material';
import React from 'react';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import { siteRoutes } from '@/config/routes';
import type { AuditorDto } from '@/core/models/dto/coreUnitDTO';
import { ResourceType } from '@/core/models/interfaces/types';
import { MAKER_BURN_LINK } from '@/core/utils/const';
import Auditors from '@/views/EAAbout/components/Auditors/Auditors';
import type { FC } from 'react';

interface Props {
  className?: string;
  budgetPath: string;
  shortCode: string;
  queryStrings: string;
  code: string;
  type: ResourceType;
  auditors?: AuditorDto[];
  auditorTitle?: string;
}

const ItemFinancesSheet: FC<Props> = ({
  className,
  budgetPath,
  code,
  queryStrings,
  shortCode,
  type,
  auditorTitle,
  auditors,
}) => {
  const textDescription = type === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor.';
  const route =
    type === ResourceType.CoreUnit
      ? `${siteRoutes.coreUnitReports(shortCode)}/${queryStrings}`
      : `${siteRoutes.ecosystemActorReports(shortCode)}/${queryStrings}`;
  return (
    <CardSheetMobile
      title="Finances"
      description={`View all expenses of the ${shortCode} ${textDescription}`}
      className={className}
    >
      <ContainerChildren>
        {type === ResourceType.CoreUnit && (
          <StyledActivityButton
            href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
            label="Activity Feed"
            showIcon
          />
        )}
        <StyledBudgetButton href={route} label="Budget Statements" showIcon />
        <StyledBudgetFinances href={`/finances/${budgetPath}/${queryStrings}`} label="Finances" showIcon />

        {type === ResourceType.CoreUnit && <Line />}
        {type === ResourceType.CoreUnit && (
          <ContainerLinks>
            <LabelLinks>Important Links</LabelLinks>
            <ButtonLinkStyled href={`${MAKER_BURN_LINK}/${code}`}>Makerburn</ButtonLinkStyled>
          </ContainerLinks>
        )}
        {type === ResourceType.EcosystemActor ? (
          (auditors || []).length > 0 ? (
            <AuditorsContainer>
              <Auditors auditors={auditors || []} auditorTitle={auditorTitle ?? ''} />
            </AuditorsContainer>
          ) : (
            <NoAuditorsMessage>{auditorTitle}</NoAuditorsMessage>
          )
        ) : (
          <div />
        )}
      </ContainerChildren>
    </CardSheetMobile>
  );
};

export default ItemFinancesSheet;

const ContainerChildren = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
});

const Line = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : theme.palette.colors.charcoal[800]}`,
  marginTop: 4,
  marginBottom: 4,
  width: '100%',
}));

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: 16,
  },
}));

const LabelLinks = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.slate[300] : theme.palette.colors.gray[50],
}));

const ButtonLinkStyled = styled(ExternalLinkButton)(() => ({
  padding: '2px 16px 2px 22px',

  fontSize: 16,
  lineHeight: '24px',
  '& div': {
    width: 21,
    height: 21,
    display: 'flex',
  },
}));

const AuditorsContainer = styled('div')({
  padding: '8px 16px 24px',
  marginTop: 16,
});

const NoAuditorsMessage = styled('div')(({ theme }) => ({
  padding: '8px 16px 24px',
  fontFamily: 'Inter, sans serif',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  color: theme.palette.isLight ? '#546978 ' : '#9FAFB9',
  letterSpacing: '0px',
}));

const StyledBudgetButton = styled(InternalLinkButton)({
  padding: '4px 13px 4px 13px',
  ':hover': {
    padding: '4px 13px 4px 13px',
  },
});

const StyledBudgetFinances = styled(InternalLinkButton)({
  padding: '4px 14.5px 4px 14.5px',
  ':hover': {
    padding: '4px 13px 4px 13px',
  },
});

const StyledActivityButton = styled(InternalLinkButton)({
  padding: '4px 13px 4px 13px',
  ':hover': {
    padding: '4px 13px 4px 13px',
  },
});
