import * as React from 'react';
import {Modal} from 'react-bootstrap';
import {Scrollbars} from 'react-custom-scrollbars';

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
      <Scrollbars
        autoHide
        // style={{height: '100vh'}}
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
      </Scrollbars>

    </Modal>
  );
};

export default ModalScreen;
