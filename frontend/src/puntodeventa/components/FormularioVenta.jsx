import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const FormularioVenta = ({ productos, seleccion, handleChange, agregarAlCarrito }) => {
  return (
    <div className="card p-4 mb-4">
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Producto</label>
          <select
            name="producto"
            className="form-select"
            value={seleccion.producto}
            onChange={handleChange}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((p, i) => (
              <option key={i} value={p.nombre}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            min="1"
            className="form-control"
            value={seleccion.cantidad}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={agregarAlCarrito}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioVenta;
