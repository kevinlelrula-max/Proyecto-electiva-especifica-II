import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditarMetodoPagoModal = ({
  metodo,
  nuevoNombre,
  setNuevoNombre,
  onGuardar,
  onClose
}) => {
  return (
    <Modal show onHide={onClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Método de Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Nuevo nombre</Form.Label>
          <Form.Control
            type="text"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            placeholder="Ingrese el nuevo nombre"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onGuardar();
            onClose(); 
          }}
        >
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditarMetodoPagoModal;
