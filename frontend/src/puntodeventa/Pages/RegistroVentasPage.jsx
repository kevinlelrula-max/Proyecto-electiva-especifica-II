import React, { useContext } from "react";
import RegistroVenta from "../components/RegistroVenta";
import { ProductosContext } from "../../inventario/context";

export const RegistroVentasPage = () => {
  const { productos } = useContext(ProductosContext);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RegistroVenta productos={productos} />
    </div>
  );
};

