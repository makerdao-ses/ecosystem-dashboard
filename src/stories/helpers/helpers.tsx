import React from 'react';
import { toast } from 'react-toastify';
import Notification from '../components/notification/notification';
import CheckMark from '../components/svg/check-mark';
import Warning from '../components/svg/warning';

export const notificationHelper = (isSuccess: boolean) => {
  toast(
    ({ closeToast }) =>
      isSuccess ? (
        <Notification icon={<CheckMark />} borderColor="#B6EDE7" handleClose={closeToast} />
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
