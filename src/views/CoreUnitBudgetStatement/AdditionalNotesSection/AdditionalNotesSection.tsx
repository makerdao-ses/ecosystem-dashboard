import { styled } from '@mui/material';
import React from 'react';
import Container from '@/components/Container/Container';
import ExternalLinkButton from '@/components/ExternalLinkButton/ExternalLinkButton';
import type { CoreUnit } from '@/core/models/interfaces/coreUnit';
import type { FC } from 'react';

interface Props {
  coreUnit: CoreUnit;
}

const AdditionalNotesSection: FC<Props> = ({ coreUnit }) => (
  <Container>
    <NotesSection>
      <TitleAdditionalNotes>Additional Notes</TitleAdditionalNotes>

      <Paragraph>
        {coreUnit.auditors.length === 0 ? (
          <div>
            Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance with a
            detailed budget update. The Core Unit works <b>without auditor</b>, submitting its reports directly to the
            community.
          </div>
        ) : (
          <div>
            Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance with a
            detailed budget update. The Core Unit's reports are reviewed{' '}
            <b>
              by auditor(s){' '}
              {coreUnit.auditors.map((auditor, index, array) => (
                <span key={auditor.id}>
                  <b>{auditor.username}</b>
                  {array.length > 1 && index !== array.length - 1 ? (index !== array.length - 2 ? ', ' : ', and ') : ''}
                </span>
              ))}{' '}
            </b>
            before they are marked as final.
          </div>
        )}
      </Paragraph>
      {coreUnit.legacyBudgetStatementUrl && (
        <QuestionContainer>
          <Question>Is this your core unit?</Question>
          <ExternalLinkButtonStyled href={coreUnit.legacyBudgetStatementUrl || ''}>
            Learn how to submit your expenses
          </ExternalLinkButtonStyled>
        </QuestionContainer>
      )}
    </NotesSection>
  </Container>
);

export default AdditionalNotesSection;

const NotesSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
}));

const TitleAdditionalNotes = styled('div')(({ theme }) => ({
  marginTop: 32,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter ,sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '24px',
  [theme.breakpoints.up('tablet_768')]: {
    fontWeight: 700,
    lineHeight: '21.6px',
    fontSize: 18,
  },
}));

const Paragraph = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: '16px',
  },
}));

const QuestionContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Question = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '22px',
}));

const ExternalLinkButtonStyled = styled(ExternalLinkButton)(({ theme }) => ({
  padding: '0px 6px 0px 8px',
  borderWidth: 1.5,
  '& div': {
    width: 16,
    height: 16,
  },
  [theme.breakpoints.up('tablet_768')]: {
    padding: '4px 16px 4px 24px',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '0px',
    height: 32,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: '-0.32px',
  },
}));
