import { createContext, useReducer, useEffect } from "react";

export const ProductosContext = createContext();

const productosReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTOS":
      return action.payload;

    case "AGREGAR_PRODUCTO":
      return [...state, action.payload];

    case "ACTUALIZAR_PRODUCTO_EN_BD":
      return state.map((producto) =>
        producto.id === action.payload.id ? action.payload : producto
      );

    case "ELIMINAR_PRODUCTO_POR_ID":
      return state.filter((producto) => producto.id !== action.payload);

    default:
      return state;
  }
};

export const ProductosProvider = ({ children }) => {
  const [productos, dispatch] = useReducer(productosReducer, []);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
      const data = await res.json();
      dispatch({ type: "SET_PRODUCTOS", payload: data });
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
    }
  };

  const agregarProducto = async (producto) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      const nuevo = await res.json();
      dispatch({ type: "AGREGAR_PRODUCTO", payload: nuevo });
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
    }
  };

  const editarProducto = async (id, productoActualizado) => {
    const idFinal = typeof id === "object" ? id.id || id.id_producto : id;

    if (!idFinal) {
      console.error("❌ ID inválido para editar producto:", id);
      return;
    }

    // 🔍 Depuración: mostrar qué se está enviando
    console.log("📦 ID Final:", idFinal);
    console.log("📤 Body que se enviará:", JSON.stringify(productoActualizado));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${idFinal}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`❌ Error ${res.status}:`, text);
      } else {
        console.log("✅ Producto actualizado correctamente");
      }

      cargarProductos();
    } catch (error) {
      console.error("❌ Error al editar producto:", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "ELIMINAR_PRODUCTO_POR_ID", payload: id });
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        cargarProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
