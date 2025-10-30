import { createContext, useState } from "react";
 
export const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);

  const registrarVenta = (venta) => {
    setVentas([...ventas, venta]);
  };

  return (
    <VentasContext.Provider value={{ ventas, registrarVenta }}>
      {children}
    </VentasContext.Provider>
  );
};
