import React, { useContext } from "react";
import RegistroVenta from "../components/RegistroVenta";
import { ProductosContext } from "../context/ProductosContext";

const RegistroVentas = () => {
  const { productos } = useContext(ProductosContext);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <RegistroVenta productos={productos} />
    </div>
  );
};

export default RegistroVentas;
