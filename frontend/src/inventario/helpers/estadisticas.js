export const agruparDatos = (data, campo, sumarCampo) => {
    return data.reduce((acc, item) => {
      const key = item[campo];
      const valor = parseFloat(item[sumarCampo]);
      if (!acc[key]) acc[key] = 0;
      acc[key] += valor;
      return acc;
    }, {});
  };
  
  export const agruparVentasPorMes = (data) => {
    return data.reduce((acc, item) => {
      const fecha = new Date(item.fecha);
      const mes = fecha.toLocaleString('default', { month: 'short', year: 'numeric' });
      const valor = parseFloat(item.subtotal);
      if (!acc[mes]) acc[mes] = 0;
      acc[mes] += valor;
      return acc;
    }, {});
  };
  