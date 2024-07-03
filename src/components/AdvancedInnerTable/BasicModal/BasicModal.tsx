import Modal from '@mui/material/Modal';
import * as React from 'react';
import type { ModalOwnProps } from '@mui/material/Modal';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
  className?: string;
  classNameModal?: string;
  backdropProps?: React.HTMLAttributes<HTMLDivElement>;
  slotProps?: ModalOwnProps['slotProps'];
}
const BasicModal: React.FC<Props> = ({
  children,
  handleClose,
  open,
  className,
  classNameModal,
  backdropProps,
  slotProps,
}) => (
  <div className={classNameModal}>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={backdropProps}
      slotProps={slotProps}
    >
      <div className={className}>{children}</div>
    </Modal>
  </div>
);
export default BasicModal;
