import { Typography, styled } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { ResourceType } from '@ses/core/models/interfaces/types';
import React from 'react';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import Auditors from '@/views/EAAbout/components/Auditors/Auditors';
import { MAKER_BURN_LINK } from '../../../core/utils/const';
import InformationCard from './InformationCard';
import type { AuditorDto } from '../../../core/models/dto/coreUnitDTO';

interface Props {
  code: string;
  shortCode: string;
  resource?: ResourceType;
  auditors?: AuditorDto[];
  isTitlePresent?: boolean;
  buttonWidth?: string;
  queryStrings: string;
  titleCard?: string;
  auditorMessage?: string;
  makerburnCustomMessage?: string;
  showMakerburnLink?: boolean;
  budgetPath: string;
  className?: string;
}

const CardExpenses = ({
  code,
  shortCode,
  resource = ResourceType.CoreUnit,
  auditors,
  isTitlePresent = true,

  queryStrings,
  titleCard,
  auditorMessage,
  showMakerburnLink = true,
  budgetPath,
  className,
}: Props) => {
  const title = titleCard ?? `View all expenses of the ${shortCode} Core Unit.`;
  const auditorTitle = auditorMessage ?? `${shortCode} Core Unit is currently working without auditor.`;

  return (
    <InformationCardStyled title="Finances" isTitlePresent={isTitlePresent} className={className}>
      <ContainerData>
        <TypographyDescription variant="subtitle1">{title}</TypographyDescription>

        <ContainerButton>
          {resource === ResourceType.CoreUnit && (
            <ButtonLinkStyledCard
              href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
              label="Activity Feed"
              showIcon
            />
          )}
          <StyledBudgetButton
            href={`${
              resource === ResourceType.CoreUnit
                ? siteRoutes.coreUnitReports(shortCode)
                : siteRoutes.ecosystemActorReports(shortCode)
            }${queryStrings}`}
            label="Budget Statements"
            showIcon
          />
          <ButtonLinkStyledCard href={`/finances/${budgetPath}/${queryStrings}`} label="Finances" showIcon />
        </ContainerButton>
      </ContainerData>
      <Line />

      {showMakerburnLink ? (
        <ContainerLinks>
          <LabelLinks>Important Links</LabelLinks>
          <ButtonLinkStyled href={`${MAKER_BURN_LINK}/${code}`}>Makerburn</ButtonLinkStyled>
        </ContainerLinks>
      ) : (
        <div />
      )}

      {resource === ResourceType.EcosystemActor ? (
        <ContainerAuditors>
          <Auditors auditors={auditors || []} auditorTitle={auditorTitle} />
        </ContainerAuditors>
      ) : (
        <div />
      )}
    </InformationCardStyled>
  );
};

export default CardExpenses;

const InformationCardStyled = styled(InformationCard)(() => ({
  '& > div': {
    padding: 0,
  },
}));

const ContainerData = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  [theme.breakpoints.up('tablet_768')]: {
    padding: '8px 8px 0px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 0px 16px',
  },
}));

const TypographyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '15px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#546978' : theme.palette.colors.gray[500],
}));

const ContainerButton = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingLeft: '16px',
  paddingRight: '16px',
  [theme.breakpoints.up('tablet_768')]: {
    padding: '0px 8px 8px 8px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '0px 16px 16px 16px',
  },
}));

const Line = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : theme.palette.colors.charcoal[800]}`,
  marginTop: '12px',
  marginBottom: '12px',
  width: '100%',
}));

const LabelLinks = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 700,
  lineHeight: '19.36px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.gray[50],
}));

const ButtonLinkStyled = styled(ExternalLinkButton)(() => ({
  padding: '4px 16px 4px 24px',
  height: 32,
  borderWidth: 2,
  fontSize: 16,
  width: 154,
  alignItems: 'center',
}));

const ContainerAuditors = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: 16,
  },
}));

const ButtonLinkStyledCard = styled(InternalLinkButton)(() => ({
  padding: '4px  15.5px 4px 15.5px',
  height: 32,
  '& > div': {
    letterSpacing: '-0.32px',
  },
  ':hover': {
    padding: '4px  15.5px 4px 15.5px',
  },
}));

const StyledBudgetButton = styled(InternalLinkButton)({
  padding: '4px  16px 4px 16px',
  height: 32,
  '& > div': {
    letterSpacing: '-0.32px',
  },
  ':hover': {
    padding: '4px  16px 4px 16px',
  },
});
