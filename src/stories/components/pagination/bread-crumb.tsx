import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ArrowRight from '../svg/ArrowRight';
import styled from '@emotion/styled';

interface Props {
  count?: number;
  breadcrumbs: string[];
  isCoreUnit?: boolean;
}

const BreadCrumb = ({ isCoreUnit = false, count, breadcrumbs }: Props) => {
  return (
    <Stack spacing={2}>
      <BreadcrumbsStyle separator={<ArrowRight fill='#D1DEE6' />} aria-label="breadcrumb">
        {isCoreUnit && <Typography key="1" color="inherit">
          {`Core Units (${count})`}
        </Typography>}

        {breadcrumbs && breadcrumbs.map((crumb, index) => {
          return <TypographyStyle key={index}>
            {crumb}
          </TypographyStyle>;
        })}

      </BreadcrumbsStyle>
    </Stack>
  );
};

const BreadcrumbsStyle = styled(Breadcrumbs)({
  '& .MuiBreadcrumbs-li': {
    '&:last-child p': {
      color: '#231536',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19px',
    }
  }
});

const TypographyStyle = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: ' #708390',
});

export default BreadCrumb;
