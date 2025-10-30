import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export const ModalEditarCategoria = ({ show, onHide, categoriaId, onCategoriaActualizada }) => {
  const [categoria, setCategoria] = useState({ nombre: "" });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!categoriaId) return;

    const obtenerCategoria = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias/${categoriaId}`);
        if (!res.ok) throw new Error("No se pudo obtener la categoría");
        const data = await res.json();
        setCategoria({ nombre: data.nombre });
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la categoría", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerCategoria();
  }, [categoriaId]);

  const handleChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias/${categoriaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });

      if (!res.ok) throw new Error("Error al actualizar categoría");

      Swal.fire("¡Actualizado!", "Categoría actualizada correctamente", "success");
      onCategoriaActualizada(); // para recargar la lista
      onHide();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la categoría", "error");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cargando ? (
            <p>Cargando...</p>
          ) : (
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={categoria.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
