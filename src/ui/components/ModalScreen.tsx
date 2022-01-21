import * as React from 'react';
import {Modal} from 'react-bootstrap';

/*
 * Full screen modal.
 */
const ModalScreen = ({modalOpen, setModalOpen, title, children, footer=null}: {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) => {
  return (
    <Modal show={modalOpen} fullscreen onHide={() => setModalOpen(false)}>
      <div
        className='scrollbar'
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5 mb-1">
          {children}
        </Modal.Body>
        {footer ? (
          <Modal.Footer>
            {footer}
          </Modal.Footer>
        ) : null}
      </div>
    </Modal>
  );
};

export default ModalScreen;
