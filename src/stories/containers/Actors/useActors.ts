import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';

export const useActors = () => {
  const phone = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const [readMore, setReadMore] = useState<boolean>(false);
  const showTextDesk = phone || readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
  };
};
