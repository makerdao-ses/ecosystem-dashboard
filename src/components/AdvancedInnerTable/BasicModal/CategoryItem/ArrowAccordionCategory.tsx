import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { pascalCaseToNormalString } from '@ses/core/utils/string';
import ArrowSelect from 'public/assets/svg/arrow_select.svg';
import React from 'react';
import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import type { ParsedExpenseCategoryWithExpanded } from '@ses/core/models/dto/expenseCategoriesDTO';

interface Props {
  style?: React.CSSProperties;
  category: ParsedExpenseCategoryWithExpanded;
  expanded: boolean;
  handleChangeItemAccordion: (categoryId: string, expanded: boolean) => void;
}

const AccordionCategory: React.FC<Props> = ({ style, category, expanded, handleChangeItemAccordion }) => {
  const handleOnchange = (event: React.SyntheticEvent, newExpanded: boolean) => {
    handleChangeItemAccordion(category.id, newExpanded);
  };

  return (
    <TransactionHistoryContainer style={style}>
      <StyledAccordion expanded={expanded} onChange={handleOnchange}>
        <StyledAccordionSummary>{pascalCaseToNormalString(category.name)}</StyledAccordionSummary>

        <StyledAccordionDetails>
          <ItemsStyle>
            {category?.subcategories?.map((subcategory) => (
              <div key={subcategory.name}>{pascalCaseToNormalString(subcategory.name)}</div>
            ))}
          </ItemsStyle>
        </StyledAccordionDetails>
      </StyledAccordion>
    </TransactionHistoryContainer>
  );
};

export default AccordionCategory;

const TransactionHistoryContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('tablet_768')]: {
    width: '100%',
  },
}));

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: 'transparent',
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 310,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 416,
  },
}));

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <IconContainer>
        <ArrowSelect />
      </IconContainer>
    }
    {...props}
  />
))(({ theme }) => ({
  minHeight: 'auto',
  padding: 0,

  '& .MuiAccordionSummary-content': {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    color: theme.palette.mode === 'light' ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    [theme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: 0,
  },
}));

const StyledAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  paddingLeft: 24,
  marginTop: 8,

  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
  },
}));

const ItemsStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  textTransform: 'capitalize',
  color: theme.palette.mode === 'light' ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  gap: 11,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  [theme.breakpoints.up('desktop_1024')]: {
    fontSize: 16,
    lineHeight: '24px',
  },
}));

const IconContainer = styled('div')(({ theme }) => ({
  color: theme.palette.colors.gray[600],
  width: 16,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  transform: 'scaleY(1)',
}));
