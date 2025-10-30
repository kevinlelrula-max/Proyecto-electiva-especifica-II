import React, { useEffect, useState } from "react";
import { FacturasAdminTable } from "../components/FacturasAdminTable";
import './FacturasAdminPage.css';

export const FacturasAdminPage = () => {
  const [facturas, setFacturas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ventas/facturas`);
        const data = await res.json();
        setFacturas(data);
      } catch (error) {
        console.error("Error al cargar facturas:", error);
      }
    };

    fetchFacturas();
  }, []);

  const facturasFiltradas = facturas.filter((factura) => {
    const cliente = factura.cliente?.toLowerCase() || "";
    const idFactura = factura.factura_id?.toString() || "";
    return cliente.includes(busqueda.toLowerCase()) || idFactura.includes(busqueda);
  });

  return (
    <div className="container my-4">
      <div className="shadow-box">
        <h2 className="text-center text-primary mb-4">📄 Facturas Emitidas</h2>

        <div className="input-group mb-4">
          <span className="input-group-text">🔍</span>
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por cliente o ID de factura..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar facturas"
          />
        </div>

        {facturasFiltradas.length === 0 ? (
          <div className="alert alert-info text-center">
            No hay facturas que coincidan con la búsqueda.
          </div>
        ) : (
          <FacturasAdminTable facturas={facturasFiltradas} />
        )}
      </div>
    </div>
  );
};

export default FacturasAdminPage;
