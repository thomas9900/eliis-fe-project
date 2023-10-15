import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EventModal({
  isModalOpen,
  modalTitle,
  eventTitle,
  setEventTitle,
  closeEditModal,
  saveEvent,
}) {
  return (
    <Modal show={isModalOpen} onHide={closeEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeEditModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={saveEvent}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EventModal;
