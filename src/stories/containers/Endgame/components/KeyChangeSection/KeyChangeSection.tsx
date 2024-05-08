import styled from '@emotion/styled';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { AccordionProps } from '@mui/material/Accordion';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface KeyChangeSectionProps extends React.PropsWithChildren {
  title: string;
  expanded: boolean;
  onExpand: () => void;
}

const KeyChangeSection: React.FC<KeyChangeSectionProps> = ({ children, title, expanded, onExpand }) => {
  const { isLight } = useThemeContext();

  return (
    <Accordion expanded={expanded} onChange={onExpand}>
      <AccordionSummary
        isLight={isLight}
        expandIcon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path
              d="M11.5094 17.2718C11.7665 17.5761 12.2336 17.5761 12.4906 17.2718L19.8457 8.56587C20.2008 8.14558 19.9037 7.5 19.3551 7.5H4.64489C4.09636 7.5 3.79921 8.14558 4.15429 8.56587L11.5094 17.2718Z"
              fill="#546978"
            />
          </svg>
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default KeyChangeSection;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  backgroundColor: 'transparent',

  '&:before': {
    display: 'none',
  },
});

const AccordionSummary = styled(MuiAccordionSummary)<WithIsLight>(({ isLight }) => ({
  minHeight: 'auto',
  padding: 8,
  marginLeft: -8,
  marginRight: -8,
  borderRadius: 6,

  '&:hover': {
    background: isLight ? '#F6F8F9' : '#10191F',
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 600,
    letterSpacing: 0.4,
    color: isLight ? '#231536' : '#D2D4EF',

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 24,
      lineHeight: '29px',
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
  marginTop: 24,
});
