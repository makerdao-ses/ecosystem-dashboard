import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  style?: React.CSSProperties;
  category: string;
  subCategory?: string;
}

const AccordionCategory: React.FC<Props> = ({ style, category, subCategory }) => {
  const { isLight } = useThemeContext();

  return (
    <TransactionHistoryContainer style={style}>
      <Accordion>
        <AccordionSummary isLight={isLight}>{category}</AccordionSummary>
        <AccordionDetails>
          <ItemsStyle>{subCategory}</ItemsStyle>
        </AccordionDetails>
      </Accordion>
    </TransactionHistoryContainer>
  );
};

export default AccordionCategory;

const TransactionHistoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  alignItems: 'center',
});

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
  width: 416,
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <SelectChevronDown
        fill="#1AAB9B"
        width={10}
        height={6}
        style={{
          transform: 'scaleY(-1)',
          marginRight: 2,
        }}
      />
    }
    {...props}
  />
))<WithIsLight>(({ isLight }) => ({
  minHeight: 'auto',
  padding: 0,

  '& .MuiAccordionSummary-content': {
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 18,
    lineHeight: '22px',
    letterSpacing: '0.4px',
    color: isLight ? '#231536' : 'red',
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
});

const ItemsStyle = styled.div({
  background: '#FBFBFB',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  padding: 64,
  borderRadius: '0px 0px 6px 6px',
  textAlign: 'center',
});
