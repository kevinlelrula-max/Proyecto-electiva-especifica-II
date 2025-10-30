// src/inventario/hooks/useProductos.js
import { useContext } from "react";
import { ProductosContext } from "../context/ProductosContext";

export const useProductos = () => useContext(ProductosContext);
