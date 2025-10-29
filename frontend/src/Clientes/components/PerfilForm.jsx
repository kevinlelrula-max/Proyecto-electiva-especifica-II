// src/clientes/components/PerfilForm.jsx
import {
    FaEnvelope, FaIdCard, FaUser, FaPhoneAlt, FaMapMarkedAlt,
    FaCity, FaMap, FaSave
  } from "react-icons/fa";
  
  export const PerfilForm = ({ datos, departamentos, municipios, handleChange, usuario, handleGuardar }) => (
    <div className="card shadow-lg p-4">
            <h3 className="text-center mb-4 fw-bold">🧾 Perfil del Cliente</h3>
    
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label"><FaEnvelope className="me-2" />Correo electrónico</label>
                <input type="email" value={usuario?.email || ""} className="form-control" disabled />
              </div>
    
              <div className="col-md-6">
                <label className="form-label"><FaIdCard className="me-2" />Tipo de documento</label>
                <select
                  name="tipo_documento_id"
                  value={datos.tipo_documento_id}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="1">Tarjeta de identidad</option>
                  <option value="2">Cédula de ciudadanía</option>
                  <option value="3">Cédula de extranjería</option>
                  <option value="4">Pasaporte</option>
                </select>
              </div>
    
              <div className="col-md-6">
                <label className="form-label">Número de documento</label>
                <input
                  type="text"
                  name="numero_documento"
                  value={datos.numero_documento}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: 1023456789"
                />
              </div>
    
              <div className="col-md-6">
                <label className="form-label"><FaUser className="me-2" />Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ingresa tu nombre"
                />
              </div>
    
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={datos.apellido}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ingresa tu apellido"
                />
              </div>
    
              <div className="col-md-6">
                <label className="form-label"><FaPhoneAlt className="me-2" />Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: 3001234567"
                />
              </div>
    
              <div className="col-12">
                <label className="form-label"><FaMapMarkedAlt className="me-2" />Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={datos.direccion}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ej: Calle 123 #45-67"
                />
              </div>
    
              <div className="col-md-6">
                <label className="form-label"><FaMap className="me-2" />Departamento</label>
                <select
                  className="form-select"
                  name="id_departamento"
                  value={datos.id_departamento}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un departamento</option>
                  {departamentos.map((d) => (
                    <option key={d.id} value={d.id}>{d.nombre}</option>
                  ))}
                </select>
              </div>
    
              <div className="col-md-6">
                <label className="form-label"><FaCity className="me-2" />Municipio</label>
                <select
                  className="form-select"
                  name="id_municipio"
                  value={datos.id_municipio}
                  onChange={handleChange}
                  disabled={!datos.id_departamento}
                >
                  <option value="">Seleccione un municipio</option>
                  {municipios.map((m) => (
                    <option key={m.municipio_id} value={m.municipio_id}>{m.nombre}</option>
                    ))}
                
                </select>
              </div>
            </div>
    
            <div className="d-grid mt-4">
              <button className="btn btn-primary btn-lg" onClick={handleGuardar}>
                <FaSave className="me-2" />Guardar cambios
              </button>
            </div>
          </div>
  );
  