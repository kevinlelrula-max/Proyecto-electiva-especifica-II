export const eliminarCategoria = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
  }
};
