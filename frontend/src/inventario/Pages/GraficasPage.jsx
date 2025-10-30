import React, { useContext, useEffect } from "react";
import { VentasContext } from "../../puntodeventa/context/VentasContext";
import { GraficaBarras } from "../components/GraficaBarras";
import { GraficaLineas } from "../components/GraficaLineas";
import { GraficaPie } from "../components/GraficaPie";
import { agruparDatos, agruparVentasPorMes } from "../helpers/estadisticas";

export const GraficasPage = () => {
  const { ventasDetalle, cargarVentasDetalle } = useContext(VentasContext);

  useEffect(() => {
    cargarVentasDetalle(); // 🔄 carga los datos al montar
  }, []);

  // 🧪 debug temporal
  console.log("📊 ventasDetalle:", ventasDetalle);

  if (!ventasDetalle || ventasDetalle.length === 0) {
    return <p className="text-center mt-5">Cargando datos de ventas...</p>;
  }

  // 📦 Agrupar datos
  const kilosPorProducto = agruparDatos(ventasDetalle, "producto", "kilos");
  const ingresosPorProducto = agruparDatos(ventasDetalle, "producto", "subtotal");
  const ventasPorMes = agruparVentasPorMes(ventasDetalle);

  // 📊 Formato para las gráficas
  const datosKilos = Object.entries(kilosPorProducto).map(([producto, kilos]) => ({ producto, kilos }));
  const datosIngresos = Object.entries(ingresosPorProducto).map(([producto, subtotal]) => ({ producto, subtotal }));
  const datosVentasMes = Object.entries(ventasPorMes).map(([mes, total]) => ({ mes, total }));
  const datosPie = Object.entries(ingresosPorProducto).map(([producto, subtotal]) => ({ name: producto, value: subtotal }));

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Gráficas de Ventas</h2>

      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="text-center">Kilos Vendidos por Producto</h4>
        <div className="d-flex justify-content-center">
          <GraficaBarras data={datosKilos} dataKey="kilos" label="producto" color="#8884d8" />
        </div>
      </div>

      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="text-center">Ingresos por Producto</h4>
        <div className="d-flex justify-content-center">
          <GraficaBarras data={datosIngresos} dataKey="subtotal" label="producto" color="#82ca9d" />
        </div>
      </div>

      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="text-center">Ventas Totales por Mes</h4>
        <div className="d-flex justify-content-center">
          <GraficaLineas data={datosVentasMes} />
        </div>
      </div>

      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="text-center">Participación en Ingresos por Producto</h4>
        <div className="d-flex justify-content-center">
          <GraficaPie data={datosPie} />
        </div>
      </div>
    </div>
  );
};

export default GraficasPage;
