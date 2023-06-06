import Modal from '@mui/material/Modal';
import * as React from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  className?: string;
}
const BasicModal: React.FC<Props> = ({ children, handleClose, open, className }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className={className}>{children}</div>
  </Modal>
);
export default BasicModal;
