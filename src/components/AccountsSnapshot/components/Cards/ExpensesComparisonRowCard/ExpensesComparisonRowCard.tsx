import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useState } from 'react';
import BasicTHCell from '@/components/AdvanceTable/BuiltIn/Cells/BasicTHCell';
import type { GenericCell, RowProps } from '@/components/AdvanceTable/types';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';

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

          {expandable && (
            <SVG
              expanded={expanded}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.69339 10.8631C7.85404 11.0456 8.14598 11.0456 8.30664 10.8631L12.9036 5.63952C13.1255 5.38735 12.9398 5 12.597 5H3.40306C3.06023 5 2.87451 5.38735 3.09643 5.63952L7.69339 10.8631Z"
                fill="#343839"
              />
            </SVG>
          )}
        </Summary>
        <AccordionDetails>
          <Reported>
            <Item>
              <Label
                as="div"
                cell={{
                  value: 'Reported Actuals',
                  cellPadding: 0,
                }}
              />
              <Value isTotal={isTotalCard}>{row.cells[1].value as React.ReactNode}</Value>
            </Item>
            {hasOffChainData && <NetExpenseTransactions>Net Expense Transactions</NetExpenseTransactions>}
          </Reported>
          <BorderedContainer>
            {/* on chain only */}
            <Item paddingBottom={3}>
              <Label
                as="div"
                cell={{
                  ...(row.cells[2].inherit ?? ({} as GenericCell)),
                  cellPadding: 0,
                }}
              />
              <Value isTotal={isTotalCard}>{row.cells[2].value as React.ReactNode}</Value>
            </Item>
            {/* difference */}
            <Item marginTop={4}>
              <Label
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
                <Item paddingBottom={3}>
                  <Label
                    as="div"
                    cell={{
                      ...(row.cells[4].inherit ?? ({} as GenericCell)),
                      cellPadding: 0,
                    }}
                  />
                  <Value isTotal={isTotalCard}>{row.cells[4].value as React.ReactNode}</Value>
                </Item>
                {/* difference */}
                <Item marginTop={4}>
                  <Label
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
    borderRadius: 12,
    boxShadow: theme.palette.isLight ? theme.fusionShadows.modules : theme.fusionShadows.darkMode,

    backgroundColor: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  })
);

const Summary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)<{ isExpandable: boolean }>(
  ({ isExpandable }) => ({
    minHeight: 'auto',

    '&[aria-expanded="true"]': {
      padding: isExpandable ? '8.5px 10px 8.5px 16px' : '8px 16px',
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

const SVG = styled('svg')<{ expanded: boolean }>(({ theme, expanded }) => ({
  transform: `rotate(${expanded ? 180 : 0}deg)`,
  transition: 'transform 0.3s',

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 0 8px',
}));

const Totals = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const MonthHeader = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Reported = styled('div')({
  margin: '0 8px 8px',
});

const Item = styled('div')<{ marginTop?: number; paddingBottom?: number }>(
  ({ theme, marginTop = 0, paddingBottom = 0 }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 8px ${paddingBottom}px`,
    marginTop,

    '& > div': {
      whiteSpace: 'nowrap',
    },

    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
    },
  })
);

const Label = styled(BasicTHCell, {
  shouldForwardProp: () => true,
})(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  textTransform: 'initial',
  letterSpacing: 'normal',
}));

const Value = styled('div')<{ isTotal: boolean }>(({ theme, isTotal }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight
    ? isTotal
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[500]
    : isTotal
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.gray[600],
}));

const NetExpenseTransactions = styled('div')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  lineHeight: '22px',
  textAlign: 'center',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginTop: 8,
}));

const BorderedContainer = styled('div')(({ theme }) => ({
  margin: '0 8px',
  padding: '9px 0px 7px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,

  '& > div:nth-of-type(1), & > div:nth-of-type(4)': {
    borderBottom: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
    }`,
  },
}));

const HorizontalDivider = styled('div')(({ theme }) => ({
  width: '100%',
  borderTop: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[700]
  }`,
  margin: '3px 0 6px',
}));
