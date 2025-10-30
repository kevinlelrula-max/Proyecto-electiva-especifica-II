// src/inventario/Pages/ProductosPage.jsx

import React from "react";
import { InventoryTable } from "../../inventario/components/InventoryTable";
import { Productos } from "../../inventario/components/Productos";

export const ProductosPage = () => {
  return (
    <div className="container mt-4">

      {}
      <div className="card p-4 mb-4">
        <Productos /> {}
      </div>

      {}
      
    </div>
  );
};

