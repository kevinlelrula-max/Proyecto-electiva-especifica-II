import React, { useContext, useEffect } from "react";
import { ProductosContext } from "../context/ProductosContext.jsx";
import ProductoFila from "../components/ProductoFila.jsx";

const Inventario = () => {
  const { productos, eliminarProducto } = useContext(ProductosContext);

  useEffect(() => {
    console.log("Productos en Inventario:", productos);
  }, [productos]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inventario de Productos</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Kilos en stock</th> {/* 👈 CAMBIO AQUÍ */}
              <th>Precio por kilo</th> {/* opcionalmente ajustado para claridad */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No hay productos en el inventario.
                </td>
              </tr>
            ) : (
              productos.map((producto, index) => (
                <ProductoFila 
                  key={index}
                  producto={producto}
                  index={index}
                  eliminarProducto={eliminarProducto}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;
