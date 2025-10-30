import React from "react";
import { Routes, Route } from "react-router-dom";
import { AgregarCategoria } from "../pages/AgregarCategoria";
import { HistorialCategorias } from "../pages/HistorialCategorias";
import {ModalEditarCategoria}  from "../components/ModalEditarCategoria";

export const CategoriaRouter = () => {
  return (
    <Routes>
      <Route path="agregar" element={<AgregarCategoria />} />
      <Route path="historial" element={<HistorialCategorias />} />
      <Route path="editar/:id" element={<ModalEditarCategoria  />} /> 
    </Routes>
  );
};
