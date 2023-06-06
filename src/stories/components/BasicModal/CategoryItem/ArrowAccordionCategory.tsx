import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { Category } from '@ses/core/models/dto/coreUnitDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  style?: React.CSSProperties;
  category: Category;
}

const AccordionCategory: React.FC<Props> = ({ style, category }) => {
  const { isLight } = useThemeContext();
  return (
    <TransactionHistoryContainer style={style}>
      <Accordion>
        <AccordionSummary isLight={isLight}>{category.name}</AccordionSummary>

        <AccordionDetails>
          <ItemsStyle isLight={isLight}>
            {category?.subcategories?.map((category, index) => (
              <div key={index}>{category}</div>
            ))}
          </ItemsStyle>
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
    color: isLight ? '#231536' : '#D2D4EF',
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
  paddingLeft: 32,
  marginTop: 24,
});

const ItemsStyle = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 19,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  'div:last-of-type': {
    marginBottom: -4,
  },
}));
