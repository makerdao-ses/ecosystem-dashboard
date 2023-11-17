import styled from '@emotion/styled';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Link from 'next/link';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const GlobalActivityFeedBtn: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Link href={siteRoutes.globalActivityFeed} legacyBehavior>
      <Button isLight={isLight}>
        <svg
          width="20"
          height="20"
          style={{ marginRight: -1 }}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9986 7.41111C19.9986 7.68725 19.7748 7.91111 19.4986 7.91111H13.6483C13.2063 7.91111 12.9817 7.37968 13.2897 7.06268L15.5098 4.77778C12.4764 1.77778 7.56532 1.66667 4.53198 4.66667C1.49865 7.67778 1.49865 12.5333 4.53198 15.5444C7.56532 18.5556 12.4764 18.5556 15.5098 15.5444C16.7578 14.3147 17.4905 12.9107 17.7077 11.2196C17.7859 10.6109 18.2739 10.1111 18.8875 10.1111C19.5012 10.1111 20.0034 10.6103 19.9225 11.2186C19.6583 13.2071 18.7059 15.4781 17.0653 17.1C13.1653 20.9667 6.83198 20.9667 2.93198 17.1C-0.956907 13.2444 -0.990241 6.97778 2.90976 3.12222C6.80976 -0.733333 13.0653 -0.733333 16.9653 3.12222L19.14 0.883783C19.4529 0.561783 19.9986 0.783253 19.9986 1.23219V7.41111ZM9.72087 5.55556C10.1811 5.55556 10.5542 5.92865 10.5542 6.38889V10.2778L13.7701 12.1889C14.1417 12.4098 14.2638 12.8902 14.0427 13.2617C13.8219 13.6328 13.3423 13.7548 12.971 13.5345L8.88754 11.1111V6.38889C8.88754 5.92865 9.26063 5.55556 9.72087 5.55556Z"
            fill={isLight ? '#231536' : '#EDEFFF'}
          />
        </svg>
      </Button>
    </Link>
  );
};

export default GlobalActivityFeedBtn;

const Button = styled.a<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 35,
  height: 35,
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: `1px solid ${isLight ? '#D4D9E1' : '#31424E'}`,
  borderRadius: '50%',
  cursor: 'pointer',
  marginRight: 0,
  marginLeft: 24,

  [lightTheme.breakpoints.down('table_834')]: {
    display: 'none',
  },
}));
