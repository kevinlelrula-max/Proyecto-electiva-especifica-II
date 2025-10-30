import React from 'react';

const MetodoPagoForm = ({ nombre, setNombre, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="formulario-metodo">
      <div className="form-group">
        <label>Nombre del Método de Pago</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">Guardar</button>
    </form>
  );
};

export default MetodoPagoForm;
