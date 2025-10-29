import { createContext, useReducer, useEffect } from "react";

export const ProductosContext = createContext();

// Reducer para manejar el estado de los productos
const productosReducer = (state, action) => {
  switch (action.type) {
    case "AGREGAR_PRODUCTO":
      return [...state, action.payload];

    case "SET_PRODUCTOS":
      return action.payload;

    case "ELIMINAR_PRODUCTO":
      return state.filter((_, index) => index !== action.payload);

    case "EDITAR_PRODUCTO":
      return state.map((producto, i) =>
        i === action.payload.index ? action.payload.productoActualizado : producto
      );

    case "DISMINUIR_KILOS":
      return state.map((producto, i) =>
        i === action.payload.index
          ? { ...producto, kilos: producto.kilos - action.payload.kilosVendidos }
          : producto
      );

    case "ACTUALIZAR_PRODUCTO_EN_BD":
      return state.map((producto) =>
        producto.id === action.payload.id ? action.payload : producto
      );

    default:
      return state;
  }
};

export const ProductosProvider = ({ children }) => {
  const [productos, dispatch] = useReducer(productosReducer, []);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        const data = await res.json();
        dispatch({ type: "SET_PRODUCTOS", payload: data });
      } catch (error) {
        console.error("Error al cargar productos desde el backend:", error);
      }
    };

    obtenerProductos();
  }, []);

  const agregarProducto = async (producto) => {
    try {
      const res = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      const nuevoProducto = await res.json();
      dispatch({ type: "AGREGAR_PRODUCTO", payload: nuevoProducto });
    } catch (error) {
      console.error("Error al agregar producto en la base de datos:", error);
    }
  };

  const eliminarProducto = async (index) => {
    const producto = productos[index];
    try {
      await fetch(`http://localhost:3001/api/productos/${producto.id}`, {
        method: "DELETE"
      });
  
      dispatch({ type: "ELIMINAR_PRODUCTO", payload: index });
    } catch (error) {
      console.error("Error al eliminar producto de la base de datos:", error);
    }
  };

  const editarProducto = async (index, productoActualizado) => {
    try {
      const res = await fetch(`http://localhost:3001/api/productos/${productoActualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });
      const data = await res.json();
      dispatch({ type: "EDITAR_PRODUCTO", payload: { index, productoActualizado: data } });
    } catch (error) {
      console.error("Error al editar producto en la base de datos:", error);
    }
  };

  const disminuirKilos = (index, kilosVendidos) => {
    dispatch({
      type: "DISMINUIR_KILOS",
      payload: { index, kilosVendidos }
    });
  };

  return (
    <ProductosContext.Provider value={{
      productos,
      agregarProducto,
      eliminarProducto,
      editarProducto,
      disminuirKilos
    }}>
      {children}
    </ProductosContext.Provider>
  );
};
