import { useState, useContext, useEffect } from "react";
import { ProductosContext } from "../context/ProductosContext.jsx";
import { FaFish, FaWeight, FaDollarSign, FaPlusCircle } from "react-icons/fa";

export const Productos = () => {
  const { agregarProducto } = useContext(ProductosContext);

  const [producto, setProducto] = useState({
    nombre: "",
    kilos: "",
    precio: "",
    categoria_id: ""
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categorias`);
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, kilos, precio, categoria_id } = producto;

    if (!nombre || !kilos || !precio || !categoria_id) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoProducto = {
      nombre,
      kilos: parseFloat(kilos),
      precio: parseFloat(precio),
      categoria_id: parseInt(categoria_id)
    };

    agregarProducto(nuevoProducto);
    setProducto({ nombre: "", kilos: "", precio: "", categoria_id: "" });
  };

  return (
    <div className="container mt-1" style={{ marginLeft: "0px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          <FaPlusCircle className="me-2 text-primary" />
          Añadir Producto
        </h2>

        <form className="row g-3 w-75 mx-auto" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label className="form-label fw-bold">
              <FaFish className="me-2" />
              Nombre del producto:
            </label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: Dorado, Bagre..."
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              <FaWeight className="me-2" />
              Kilos en stock:
            </label>
            <input
              type="number"
              step="0.01"
              name="kilos"
              value={producto.kilos}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 10.5"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">
              <FaDollarSign className="me-2" />
              Precio por kilo:
            </label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              className="form-control"
              placeholder="Ej: 1450"
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label fw-bold">Categoría:</label>
            <select
              name="categoria_id"
              value={producto.categoria_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              <FaPlusCircle className="me-2" />
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
