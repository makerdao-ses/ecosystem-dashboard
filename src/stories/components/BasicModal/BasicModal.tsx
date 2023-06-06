import Modal from '@mui/material/Modal';
import * as React from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  className?: string;
  classNameModal?: string;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
}
const BasicModal: React.FC<Props> = ({ children, handleClose, open, className, classNameModal, backdropProps }) => (
  <div className={classNameModal}>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={backdropProps}
    >
      <div className={className}>{children}</div>
    </Modal>
  </div>
);
export default BasicModal;
