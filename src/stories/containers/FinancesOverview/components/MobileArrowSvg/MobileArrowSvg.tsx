import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

const MobileArrowSvg: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.5582 6.89376L19.668 7.00004L19.5582 7.10623L18.8793 7.76356L18.8784 7.76446L12.7641 13.6836C12.3283 14.1055 11.6217 14.1055 11.1859 13.6836C10.75 13.2616 10.75 12.5775 11.1859 12.1556L15.3954 8.0804H1.784C1.16764 8.0804 0.667969 7.59677 0.667969 7.00004C0.667969 6.40332 1.16764 5.91959 1.784 5.91959H15.3954L11.1859 1.84441C10.75 1.42248 10.75 0.738389 11.1859 0.316452C11.6217 -0.105484 12.3283 -0.105484 12.7641 0.316452L18.8784 6.23559L18.8793 6.2365L19.5582 6.89376Z"
        fill={isLight ? '#434358' : '#B7A6CD'}
      />
    </svg>
  );
};

export default MobileArrowSvg;
