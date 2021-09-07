import * as React from 'react';
import {Button, Modal} from 'react-bootstrap';

/*
 * Yes No question modal (allow, deny).
 */
const QuestionModal = ({
  questionOpen,
  setQuestionOpen,
  title,
  question,
  handleAccept,
  handleRefuse,
}: {
    questionOpen: boolean;
    setQuestionOpen: (value: boolean) => void;
    title: string;
    question: string;
    handleAccept: React.MouseEventHandler<HTMLButtonElement>;
    handleRefuse: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Modal show={questionOpen} onHide={() => setQuestionOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {question}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleRefuse}>No</Button>
        <Button variant="primary" onClick={handleAccept}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
