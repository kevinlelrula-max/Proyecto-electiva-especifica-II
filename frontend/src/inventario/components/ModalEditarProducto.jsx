import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const ModalEditarProducto = ({ producto, show, onHide, onGuardar }) => {
  const [formData, setFormData] = useState(producto);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    setFormData(producto);
  }, [producto]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias`);
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...formData,
      kilos: parseFloat(formData.kilos),
      precio: parseFloat(formData.precio),
      categoria_id: parseInt(formData.categoria_id),
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kilos</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="kilos"
              value={formData.kilos || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria_id"
              value={formData.categoria_id || ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="text-end">
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
