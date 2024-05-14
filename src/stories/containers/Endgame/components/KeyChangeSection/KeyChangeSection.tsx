import { styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { AccordionProps } from '@mui/material/Accordion';

interface KeyChangeSectionProps extends React.PropsWithChildren {
  title: string;
  expanded: boolean;
  onExpand: () => void;
}

const KeyChangeSection: React.FC<KeyChangeSectionProps> = ({ children, title, expanded, onExpand }) => (
  <Accordion expanded={expanded} onChange={onExpand}>
    <AccordionSummary
      expanded={expanded}
      expandIcon={
        <SVG xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
          <path d="M11.5094 17.2718C11.7665 17.5761 12.2336 17.5761 12.4906 17.2718L19.8457 8.56587C20.2008 8.14558 19.9037 7.5 19.3551 7.5H4.64489C4.09636 7.5 3.79921 8.14558 4.15429 8.56587L11.5094 17.2718Z" />
        </SVG>
      }
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      {title}
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </Accordion>
);

export default KeyChangeSection;

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
  () => ({
    backgroundColor: 'transparent',

    '&:before': {
      display: 'none',
    },
  })
);

const AccordionSummary = styled(MuiAccordionSummary)<{ expanded: boolean }>(({ theme, expanded }) => ({
  minHeight: 'auto',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  padding: 16,
  borderRadius: expanded ? '12px 12px 0 0' : 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  outline: 'none',

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[700],
  },

  '& .MuiAccordionSummary-content': {
    margin: 0,
    width: '100%',
    fontSize: 18,
    lineHeight: '22px',
    fontWeight: 700,
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

    [lightTheme.breakpoints.up('tablet_768')]: {
      fontSize: 20,
      lineHeight: '24px',
    },

    [lightTheme.breakpoints.up('desktop_1280')]: {
      fontSize: 24,
      lineHeight: '29px',
      fontWeight: 600,
      letterSpacing: 0.4,
    },
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)({
  padding: 0,
  marginTop: 24,
});

const SVG = styled('svg')(({ theme }) => ({
  '& > path': {
    fill: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[400],
  },
}));
