import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ViewAllButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  viewAll: boolean;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = (props) => {
  const { isLight } = useThemeContext();

  return (
    <Button isLight={isLight} {...props}>
      <span>{props.children}</span>
      <svg
        style={{ transform: `rotate(${props.viewAll ? '180' : 0}deg)` }}
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.19339 10.8631C8.35404 11.0456 8.64598 11.0456 8.80664 10.8631L13.4036 5.63952C13.6255 5.38735 13.4398 5 13.097 5H3.90306C3.56023 5 3.37451 5.38735 3.59643 5.63952L8.19339 10.8631Z"
          fill="#25273D"
        />
      </svg>
    </Button>
  );
};

export default ViewAllButton;

const Button = styled.button<WithIsLight>(({ isLight }) => ({
  marginTop: 'auto',
  padding: '8px 7px 8px 15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  alignSelf: 'stretch',
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  background: isLight ? '#fff' : 'red',
  cursor: 'pointer',

  '& > span': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '18px',
    color: isLight ? '#31424E' : 'red',
  },

  '&:hover': {
    border: `1px solid ${isLight ? '#25273D' : 'red'}`,

    '& > span': {
      color: isLight ? '#231536' : 'red',
    },
  },
}));
