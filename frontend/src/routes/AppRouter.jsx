import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/context";
import Barradenavegacion from "../ui/components/barradenavegacion";
import BarraLateralVentas from "../ui/components/BarraLateralVentas";

import { LoginPage, RegisterPage } from "../auth/Pages";
import { InventarioPage, ProductosPage, GraficasPage } from "../inventario/Pages";
import {
  RegistroVentasPage,
  HistorialVentasPage,
  PuntoDeVentaPage,
  FacturasPage,
  FacturasAdminPage,
} from "../puntodeventa/Pages";
import {
  PerfilClientePage,
  ClientesPage,
  HistorialVentasClientePage,
} from "../Clientes/Pages";
import { PerfilAdminPage } from "../perfiladmin/pages";

// ✅ Categoría
import { AgregarCategoria, HistorialCategorias } from "../categoria";
import { ModalEditarCategoria } from "../categoria/components/ModalEditarCategoria";

// ✅ Métodos de Pago
import HistorialMetodoPago from "../metodospago/pages/HistorialMetodoPago";
// Si usas una página de edición separada, importa aquí:
// import EditarMetodoPago from "../metodospago/pages/EditarMetodoPago";

const PrivateRoute = ({ element: Element }) => {
  const { usuario } = useAuth();
  return usuario ? <Element /> : <Navigate to="/login" replace />;
};

const ClienteRoute = ({ element: Element }) => {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div>Cargando...</div>;
  return usuario?.rol === "Cliente" ? <Element /> : <Navigate to="/login" replace />;
};

const AdminRoute = ({ element: Element }) => {
  const { usuario, cargando } = useAuth();
  if (cargando) return <div>Cargando...</div>;
  return usuario?.rol === "Administrador" ? <Element /> : <Navigate to="/login" replace />;
};

const RutasConLayout = () => {
  const { usuario } = useAuth();
  const location = useLocation();
  const esRutaPublica = location.pathname === "/login" || location.pathname === "/registro";

  return (
    <>
      {!esRutaPublica && usuario?.rol === "Administrador" && <Barradenavegacion />}
      {!esRutaPublica && usuario?.rol === "Cliente" && <BarraLateralVentas />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />

        {!usuario && <Route path="*" element={<Navigate to="/login" replace />} />}

        {usuario && (
          <>
            <Route path="/punto-de-venta" element={<ClienteRoute element={PuntoDeVentaPage} />} />
            <Route path="/perfil" element={<ClienteRoute element={PerfilClientePage} />} />
            <Route path="/historial-compras" element={<ClienteRoute element={HistorialVentasClientePage} />} />
            <Route path="/facturas" element={<ClienteRoute element={FacturasPage} />} />

            <Route path="/inventario" element={<AdminRoute element={InventarioPage} />} />
            <Route path="/productos" element={<AdminRoute element={ProductosPage} />} />
            <Route path="/registro-ventas" element={<AdminRoute element={RegistroVentasPage} />} />
            <Route path="/historial-ventas" element={<AdminRoute element={HistorialVentasPage} />} />
            <Route path="/clientes" element={<AdminRoute element={ClientesPage} />} />
            <Route path="/graficas" element={<AdminRoute element={GraficasPage} />} />
            <Route path="/admin/facturas" element={<AdminRoute element={FacturasAdminPage} />} />
            <Route path="/perfil-admin" element={<AdminRoute element={PerfilAdminPage} />} />

            <Route path="/categorias/agregar" element={<AdminRoute element={AgregarCategoria} />} />
            <Route path="/categorias/historial" element={<AdminRoute element={HistorialCategorias} />} />
            <Route path="/categorias/editar/:id" element={<AdminRoute element={ModalEditarCategoria} />} />

            <Route path="/metodospago/historial" element={<AdminRoute element={HistorialMetodoPago} />} />

            <Route path="*" element={<Navigate to="/inventario" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export const AppRouter = () => {
  const { cargando } = useAuth();

  if (cargando) return <div>Cargando...</div>;

  return (
    <Router>
      <RutasConLayout />
    </Router>
  );
};
