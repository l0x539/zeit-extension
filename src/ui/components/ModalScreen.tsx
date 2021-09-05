import * as React from 'react';
import {Modal} from 'react-bootstrap';

const ModalScreen = ({modalOpen, setModalOpen, title, children, footer=null}: {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) => {
  return (
    <Modal show={modalOpen} fullscreen onHide={() => setModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}

      </Modal.Body>
      {
                footer?
                <Modal.Footer>
                  {footer}
                </Modal.Footer> :
                null
      }
    </Modal>
  );
};

export default ModalScreen;
