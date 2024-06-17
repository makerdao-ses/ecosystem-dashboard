import { styled } from '@mui/material';
import React, { useState } from 'react';
import CardSheetMobile from '@/components/CardSheetMobile/CardSheetMobile';
import CustomSheet from '@/components/CustomSheet/CustomSheet';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import { siteRoutes } from '@/config/routes';
import type { AuditorDto } from '@/core/models/dto/coreUnitDTO';
import { ResourceType } from '@/core/models/interfaces/types';
import { MAKER_BURN_LINK } from '@/core/utils/const';
import Auditors from '../EAAbout/components/Auditors/Auditors';
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

const CustomSheetFinances: FC<Props> = ({
  className,
  budgetPath,
  queryStrings,
  shortCode,
  code,
  type,
  auditors,
  auditorTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const textDescription = type === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor.';
  const handleOpenSheet = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Container type={type}>
      <ButtonOpenMenuStyled title="Finances" onClick={handleOpenSheet} />
      <CustomSheetStyled
        snapPoints={type === ResourceType.CoreUnit ? [600, 350] : (auditors?.length || 0) > 0 ? [600, 300] : [600, 250]}
        className={className}
        children={
          <CardSheetMobile title="Finances" description={`View all expenses of the ${shortCode} ${textDescription}`}>
            <ContainerChildren>
              {type === ResourceType.CoreUnit && (
                <InternalLinkButton
                  href={`/core-unit/${shortCode}/activity-feed${queryStrings}`}
                  label="Activity Feed"
                  showIcon
                />
              )}
              <StyledBudgetButton
                href={`${siteRoutes.coreUnitReports(shortCode)}${queryStrings}`}
                label="Budget Statements"
                showIcon
              />
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
        }
        handleClose={handleClose}
        isOpen={isOpen}
      />
    </Container>
  );
};

export default CustomSheetFinances;

const CustomSheetStyled = styled(CustomSheet)({
  '& .react-modal-sheet-container': {
    padding: '0px 16px 0px 16px',
  },
  '& .react-modal-sheet-header': {
    height: '0px!important',
  },
  '.react-modal-sheet-content': {},
});

const ContainerChildren = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Line = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : theme.palette.colors.charcoal[800]}`,
  marginTop: '8px',
  marginBottom: '16px',
  width: '100%',
}));

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  paddingLeft: '16px',
  paddingRight: '16px',
  [theme.breakpoints.up('tablet_768')]: {
    padding: 8,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: 16,
  },
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

const ButtonOpenMenuStyled = styled(SecondaryButton)({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
});

const Container = styled('div')<{ type: ResourceType }>(({ type }) => ({
  display: 'flex',
  width: type === ResourceType.CoreUnit ? undefined : '100%',
}));

const StyledBudgetButton = styled(InternalLinkButton)({
  padding: '4px 13px 4px 13px',
});

const StyledBudgetFinances = styled(InternalLinkButton)({
  padding: '4px 14.5px 4px 14.5px',
});
