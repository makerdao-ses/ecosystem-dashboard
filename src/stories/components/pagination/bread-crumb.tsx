import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  count?: number;
  breadcrumbs: string[];
  isCoreUnit?: boolean;
}

const CustomSeparator = ({ isCoreUnit = false, count, breadcrumbs }: Props) => {
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{
        '&last-child': {
        }
      }}>
        {isCoreUnit && <Typography key="1" color="inherit">
          {`Core Units (${count})`}
        </Typography>}

        {breadcrumbs.map((crumb, index) => {
          return <Typography key={index} color="inherit" >
            {crumb}
          </Typography>;
        })}

      </Breadcrumbs>
    </Stack>
  );
};

export default CustomSeparator;
