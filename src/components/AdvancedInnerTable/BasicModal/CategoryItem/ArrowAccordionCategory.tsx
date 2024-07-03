import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { SelectChevronDown } from '@ses/components/svg/select-chevron-down';

import { pascalCaseToNormalString } from '@ses/core/utils/string';
import lightTheme from '@ses/styles/theme/themes';
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
  const handleOnchange = (event: React.SyntheticEvent, expanded: boolean) => {
    handleChangeItemAccordion(category.id, expanded);
  };

  return (
    <TransactionHistoryContainer style={style}>
      <Accordion expanded={expanded} onChange={handleOnchange}>
        <AccordionSummary>{pascalCaseToNormalString(category.name)}</AccordionSummary>

        <AccordionDetails>
          <ItemsStyle>
            {category?.subcategories?.map((category) => (
              <div key={category.name}>{pascalCaseToNormalString(category.name)}</div>
            ))}
          </ItemsStyle>
        </AccordionDetails>
      </Accordion>
    </TransactionHistoryContainer>
  );
};

export default AccordionCategory;

const TransactionHistoryContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  [lightTheme.breakpoints.down('tablet_768')]: {
    width: '100%',
  },
});

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',
  width: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 310,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 416,
  },
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <SelectChevronDown
        fill="#1AAB9B"
        width={10}
        height={6}
        style={{
          transform: 'scaleY(1)',
          marginRight: 2,
        }}
      />
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
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : 'blue',
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    [lightTheme.breakpoints.up('desktop_1024')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },

  '& .MuiAccordionSummary-expandIconWrapper': {
    marginRight: 0,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
  paddingLeft: 24,
  marginTop: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 24,
    paddingLeft: 32,
  },
});

const ItemsStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  textTransform: 'capitalize',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',
  gap: 16,
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
}));
