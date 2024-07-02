import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import BasicTHCell from '@ses/components/AdvanceTable/BuiltIn/Cells/BasicTHCell';
import { useState } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { GenericCell, RowProps } from '@ses/components/AdvanceTable/types';

interface ExpensesComparisonRowCardProps {
  row: RowProps;
  hasOffChainData: boolean;
  expandable?: boolean;
}

const ExpensesComparisonRowCard: React.FC<ExpensesComparisonRowCardProps> = ({
  row,
  hasOffChainData,
  expandable = true,
}) => {
  const { isLight } = useThemeContext();
  const [expanded, setExpanded] = useState<boolean>(!expandable);
  const isTotalCard = row.cells[0].value === 'Totals';

  return (
    <Container>
      <Accordion expanded={expanded} onChange={() => expandable && setExpanded(!expanded)}>
        <Summary isExpandable={expandable}>
          {isTotalCard ? (
            <Totals>3 Month Totals</Totals>
          ) : (
            <MonthHeader>{row.cells[0].value as React.ReactNode}</MonthHeader>
          )}

          {expandable &&
            (expanded ? (
              <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.25729 1.70945C5.25729 1.70945 5.58837 1.70945 5.99678 1.70945C6.40521 1.70945 6.73628 1.70945 6.73628 1.70945V1.71373H10.4338C10.8422 1.71373 11.1733 1.39394 11.1733 0.999442C11.1733 0.604956 10.8422 0.285156 10.4338 0.285156H6.73628V0.289442C6.73628 0.289442 6.40521 0.289442 5.99678 0.289442C5.58837 0.289442 5.25729 0.289442 5.25729 0.289442V0.285156H1.55981C1.1514 0.285156 0.820312 0.604956 0.820312 0.999442C0.820312 1.39394 1.1514 1.71373 1.55981 1.71373H5.25729V1.70945Z"
                  fill={isLight ? '#546978' : '#D2D4EF'}
                />
              </svg>
            ) : (
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.25729 9.28571C5.25729 9.68021 5.58837 10 5.99678 10C6.40521 10 6.73628 9.68021 6.73628 9.28571V5.71429H10.4338C10.8422 5.71429 11.1733 5.3945 11.1733 5C11.1733 4.60551 10.8422 4.28571 10.4338 4.28571H6.73628V0.714286C6.73628 0.3198 6.40521 0 5.99678 0C5.58837 0 5.25729 0.3198 5.25729 0.714286V4.28571H1.55981C1.1514 4.28571 0.820312 4.60551 0.820312 5C0.820312 5.3945 1.1514 5.71429 1.55981 5.71429H5.25729V9.28571Z"
                  fill={isLight ? '#546978' : '#D2D4EF'}
                />
              </svg>
            ))}
        </Summary>
        <AccordionDetails>
          <Reported>
            <Item>
              <BasicTHCell
                as="div"
                cell={{
                  value: 'Reported actuals',
                  cellPadding: 0,
                }}
              />
              <Value isTotal={isTotalCard}>{row.cells[1].value as React.ReactNode}</Value>
            </Item>
            {hasOffChainData && <NetExpenseTransactions>Net Expense Transactions</NetExpenseTransactions>}
          </Reported>
          <BorderedContainer>
            {/* on chain only */}
            <Item>
              <BasicTHCell
                as="div"
                cell={{
                  ...(row.cells[2].inherit ?? ({} as GenericCell)),
                  cellPadding: 0,
                }}
              />
              <Value isTotal={isTotalCard}>{row.cells[2].value as React.ReactNode}</Value>
            </Item>
            {/* difference */}
            <Item marginTop={21}>
              <BasicTHCell
                as="div"
                cell={{
                  ...(row.cells[3].inherit ?? ({} as GenericCell)),
                  border: undefined,
                  cellPadding: 0,
                }}
              />
              <Value isTotal={isTotalCard}>{row.cells[3].value as React.ReactNode}</Value>
            </Item>
            {hasOffChainData && (
              <>
                <HorizontalDivider />
                {/* including off-chain */}
                <Item>
                  <BasicTHCell
                    as="div"
                    cell={{
                      ...(row.cells[4].inherit ?? ({} as GenericCell)),
                      cellPadding: 0,
                    }}
                  />
                  <Value isTotal={isTotalCard}>{row.cells[4].value as React.ReactNode}</Value>
                </Item>
                {/* difference */}
                <Item marginTop={20}>
                  <BasicTHCell
                    as="div"
                    cell={{
                      ...(row.cells[5].inherit ?? ({} as GenericCell)),
                      cellPadding: 0,
                    }}
                  />
                  <Value isTotal={isTotalCard}>{row.cells[5].value as React.ReactNode}</Value>
                </Item>
              </>
            )}
          </BorderedContainer>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ExpensesComparisonRowCard;

const Container = styled('div')({
  marginBottom: 8,
});

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  ({ theme }) => ({
    borderRadius: '6px',
    boxShadow: theme.palette.isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

    backgroundColor: theme.palette.isLight ? '#FFFFFF' : '#1E2C37',
  })
);

const Summary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)<{ isExpandable: boolean }>(
  ({ isExpandable }) => ({
    minHeight: 'auto',

    '&[aria-expanded="true"]': {
      padding: isExpandable ? '8.5px 10px 8.5px 16px' : 16,
    },

    '&[aria-expanded="false"]': {
      padding: '8.5px 10px 8.5px 16px',
    },

    '& .MuiAccordionSummary-content': {
      margin: 0,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 0 14px',
}));

const Totals = styled('div')(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const MonthHeader = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: theme.palette.isLight ? '#434358' : '#D2D4EF',
}));

const Reported = styled('div')({
  margin: '8px 8px 16px',
});

const Item = styled('div')<{ marginTop?: number }>(({ marginTop = 0 }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 8px',
  marginTop,

  '& > div': {
    whiteSpace: 'nowrap',
  },
}));

const Value = styled('div')<{ isTotal: boolean }>(({ theme, isTotal }) => ({
  fontWeight: isTotal ? 700 : 400,
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.3,
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const NetExpenseTransactions = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '17px',
  textAlign: 'center',
  color: theme.palette.isLight ? '#231536' : '#E2D8EE',
  marginTop: 16,
}));

const BorderedContainer = styled('div')(({ theme }) => ({
  margin: '0 8px',
  padding: '12px 0px 7px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 6,
  border: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,

  '& > div': {
    // items
    padding: '0 7px',
  },
}));

const HorizontalDivider = styled('div')(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${theme.palette.isLight ? '#D4D9E1' : '#405361'}`,
  margin: '14px 0 22px',
}));
