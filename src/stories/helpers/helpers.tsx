import React from 'react';
import { toast } from 'react-toastify';
import Notification from '../components/notification/notification';
import CheckMark from '../components/svg/check-mark';
import Warning from '../components/svg/warning';
import type { IconProps } from '@mui/material';
import type { ReactElement } from 'react';

interface Props {
  isSuccess: boolean;
  userName?: string;
}

export const notificationHelper = ({ isSuccess, userName = '' }: Props) => {
  toast(
    ({ closeToast }) =>
      isSuccess ? (
        <Notification
          icon={<CheckMark />}
          borderColor="#B6EDE7"
          handleClose={closeToast}
          message={`Account ${userName} has been deleted`}
        />
      ) : (
        <Notification
          icon={<Warning />}
          borderColor="#FBE1D9"
          handleClose={closeToast}
          message="There was some problem deleting your account"
        />
      ),
    {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: false,
    }
  );
};

export interface IToast {
  message: string;
  type?: 'success' | 'warning';
  autoClose?: number;
  closeButton?: boolean;
}

export const triggerToast = ({ message, type = 'success', autoClose = 3000, closeButton = false }: IToast) => {
  let borderColor: string;
  let icon: ReactElement<IconProps>;
  switch (type) {
    case 'warning':
      borderColor = '#FBE1D9';
      icon = <Warning />;
      break;
    default:
      // success
      borderColor = '#B6EDE7';
      icon = <CheckMark />;
  }
  return toast(
    ({ closeToast }) => (
      <Notification icon={icon} borderColor={borderColor} handleClose={closeToast} message={message} />
    ),
    {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose,
      hideProgressBar: true,
      closeButton,
    }
  );
};
