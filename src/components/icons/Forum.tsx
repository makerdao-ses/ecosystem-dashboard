import { useTheme } from '@mui/material';
import * as React from 'react';
interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const Forum = ({ width = 20, height = 20, fill = '#C4C4C4', fillDark = '#D1DEE6' }: Props) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  return (
    <svg width={width} height={height} viewBox={'0 0 20 21'} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.002 4.00098H17.002V13.001H4.00195V15.001C4.00195 15.2662 4.10731 15.5205 4.29485 15.7081C4.48238 15.8956 4.73674 16.001 5.00195 16.001H16.002L20.002 20.001V5.00098C20.002 4.73576 19.8966 4.48141 19.7091 4.29387C19.5215 4.10633 19.2672 4.00098 19.002 4.00098ZM15.002 10.001V1.00098C15.002 0.73576 14.8966 0.481406 14.7091 0.29387C14.5215 0.106333 14.2672 0.000976562 14.002 0.000976562H1.00195C0.736737 0.000976562 0.482383 0.106333 0.294846 0.29387C0.10731 0.481406 0.00195312 0.73576 0.00195312 1.00098V15.001L4.00195 11.001H14.002C14.2672 11.001 14.5215 10.8956 14.7091 10.7081C14.8966 10.5205 15.002 10.2662 15.002 10.001Z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default Forum;
