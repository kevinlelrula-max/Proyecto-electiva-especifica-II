import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProductosProvider } from "./context/ProductosContext.jsx";
//import RegistroVenta from './pages/RegistroVentas.jsx'; // Importa el componente



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductosProvider> {/* Asegúrate de que App esté dentro del provider */}
      <App />
    </ProductosProvider>
  </React.StrictMode>
);