import React, { useState, useContext } from "react";
import { ProductosContext } from "../context/ProductosContext";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const PuntoDeVenta = () => {
  const { productos } = useContext(ProductosContext);
  const { usuario } = useAuth();

  const [seleccion, setSeleccion] = useState({ producto: "", kilos: 1 });
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState({ nombre: "", telefono: "" });

  const handleSeleccionChange = (e) => {
    setSeleccion({ ...seleccion, [e.target.name]: e.target.value });
  };

  const handleClienteChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const agregarAlCarrito = () => {
    if (!seleccion.producto || seleccion.kilos <= 0) return;

    const productoInfo = productos.find((p) => p.nombre === seleccion.producto);
    if (!productoInfo) return;

    const precio = Number(productoInfo.precio);
    const kilos = parseFloat(seleccion.kilos);
    const subtotal = precio * kilos;

    setCarrito([
      ...carrito,
      {
        nombre: productoInfo.nombre,
        kilos,
        precio,
        subtotal,
      },
    ]);

    setSeleccion({ producto: "", kilos: 1 });
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.subtotal, 0);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  const finalizarVenta = async () => {
    try {
      for (const item of carrito) {
        const venta = {
          usuario_id: usuario.id,
          producto: item.nombre,
          kilos: item.kilos,
          precio_unitario: item.precio
        };

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(venta)
        });

        if (!res.ok) {
          throw new Error("Error al guardar una de las ventas");
        }
      }

      alert(`Venta finalizada para ${cliente.nombre}. Total: $${calcularTotal().toFixed(2)}`);
      setCarrito([]);
      setCliente({ nombre: "", telefono: "" });
    } catch (error) {
      console.error("Error al finalizar la venta:", error);
      alert("Hubo un error al registrar la venta.");
    }
  };

  return (
    <div className="d-flex">
      {/* Barra lateral moderna */}
      <div
        className="bg-dark text-white d-flex flex-column justify-content-between p-4"
        style={{
          width: "240px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <div>
          <h4 className="text-center mb-4">Menú</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/punto-de-venta">Punto de Venta</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/historial-compras">Historial de Compras</a>
            </li>
            <li className="nav-item mb-2">
              <a className="nav-link text-white" href="/perfil">Perfil</a>
            </li>
          </ul>
        </div>
        <button onClick={() => window.location.href = "/logout"} className="btn btn-outline-light w-100">
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="container mt-4" style={{ marginLeft: "260px" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="card p-4 mb-3">
              <h5 className="mb-3">Agregar producto al carrito</h5>
              <div className="mb-3">
                <label className="form-label">Producto</label>
                <select
                  name="producto"
                  className="form-select"
                  value={seleccion.producto}
                  onChange={handleSeleccionChange}
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((p, i) => (
                    <option key={i} value={p.nombre}>{p.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Kilos</label>
                <input
                  type="number"
                  name="kilos"
                  min="0.1"
                  step="0.1"
                  className="form-control"
                  value={seleccion.kilos}
                  onChange={handleSeleccionChange}
                />
              </div>
              <button className="btn btn-primary w-100" onClick={agregarAlCarrito}>Agregar</button>
            </div>

            <div className="card p-4">
              <h5 className="mb-3">Información del cliente</h5>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del cliente"
                className="form-control mb-2"
                value={cliente.nombre}
                onChange={handleClienteChange}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono (opcional)"
                className="form-control mb-2"
                value={cliente.telefono}
                onChange={handleClienteChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4">
              <h5>Carrito de Venta</h5>
              {carrito.length === 0 ? (
                <p className="text-muted">No hay productos en el carrito</p>
              ) : (
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Kilos</th>
                      <th>Precio/Kg</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, index) => (
                      <tr key={index}>
                        <td>{item.nombre}</td>
                        <td>{item.kilos}</td>
                        <td>${Number(item.precio).toFixed(2)}</td>
                        <td>${Number(item.subtotal).toFixed(2)}</td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(index)}>X</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <h4 className="text-end">Total: ${calcularTotal().toFixed(2)}</h4>
              <div className="text-end">
                <button className="btn btn-success mt-3" onClick={finalizarVenta}>Finalizar Venta</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuntoDeVenta;
