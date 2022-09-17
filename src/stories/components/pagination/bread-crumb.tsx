import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import { BreadcrumbSeparator } from '../svg/breadcrumb-separator';

interface Props {
  count?: number;
  breadcrumbs: string[];
  isCoreUnit?: boolean;
}

const BreadCrumb = ({ isCoreUnit = false, count, breadcrumbs }: Props) => {
  return (
    <Stack direction="row">
      <BreadcrumbsStyle separator={<BreadcrumbSeparator />} aria-label="breadcrumb">
        {isCoreUnit && (
          <Typography key="1" color="#708390" fontFamily={'FT Base, sans-serif'}>
            {`Core Units (${count})`}
          </Typography>
        )}

        {breadcrumbs &&
          breadcrumbs.map((crumb, index) => {
            return <TypographyStyle key={index}>{crumb}</TypographyStyle>;
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
      fontFamily: 'FT Base, sans-serif',
    },
  },
  '& .MuiBreadcrumbs-separator': {
    marginLeft: '15px',
    marginRight: '15px',
  },
});

const TypographyStyle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: ' #708390',
  fontFamily: 'FT Base, sans-serif',
});

export default BreadCrumb;
