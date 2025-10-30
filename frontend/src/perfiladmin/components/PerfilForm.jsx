import React from "react";

export const PerfilForm = ({
  datos,
  handleChange,
  departamentos,
  municipios,
  handleGuardar,
  usuario
}) => {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">🧑‍💼 Perfil del Administrador</h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">📧 Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={usuario.email}
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">🪪 Tipo de documento</label>
            <input
              type="text"
              className="form-control"
              name="tipo_documento"
              value={datos.tipo_documento}
              onChange={handleChange}
              placeholder="Cédula de ciudadanía"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">🆔 Número de documento</label>
            <input
              type="text"
              className="form-control"
              name="numero_documento"
              value={datos.numero_documento}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">🧍 Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">🧍 Apellido</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={datos.apellido}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">📞 Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">📍 Dirección</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={datos.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label">🏙 Departamento</label>
            <select
              className="form-select"
              name="id_departamento"
              value={datos.id_departamento}
              onChange={handleChange}
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">🏘 Municipio</label>
            <select
              className="form-select"
              name="id_municipio"
              value={datos.id_municipio}
              onChange={handleChange}
              disabled={!datos.id_departamento}
            >
              <option value="">Seleccione un municipio</option>
              {municipios.map((mun) => (
                <option key={mun.id} value={mun.id}>
                  {mun.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleGuardar}>
          💾 Guardar Cambios
        </button>
      </div>
    </div>
  );
};
