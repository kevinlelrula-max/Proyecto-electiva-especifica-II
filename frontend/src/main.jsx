import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './AppPlantilla.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./auth/context";
import { ProductosProvider } from "./inventario/context";
import { VentasProvider } from "./puntodeventa/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductosProvider>
        <VentasProvider> {/* ✅ ahora sí se incluye */}
          
          <App />
        </VentasProvider>
      </ProductosProvider>
    </AuthProvider>
  </React.StrictMode>
);
