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
    <div
      className="container-fluid py-4"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9", // ✅ FONDO PROFESIONAL CLARO
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 mx-auto"
        style={{
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.98)",
        }}
      >
        {/* Encabezado */}
        <div
          className="card-header border-0 rounded-top-4"
          style={{
            background:
              "linear-gradient(135deg, #0ea5e9 0%, #22c55e 50%, #0f766e 100%)",
            color: "#ffffff",
          }}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <FaPlusCircle size={28} />
            <h2 className="mb-0 fw-bold text-center">Añadir producto</h2>
          </div>
          <p className="text-center mb-0 mt-2" style={{ fontSize: "0.9rem" }}>
            Registra nuevos productos pesqueros con su stock, precio y categoría.
          </p>
        </div>

        {/* Cuerpo */}
        <div className="card-body p-4 p-md-5">
          <form className="row g-4" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary">
                <FaFish className="me-2 text-primary" />
                Nombre del producto
              </label>
              <input
                type="text"
                name="nombre"
                value={producto.nombre}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm"
                placeholder="Ej: Dorado, Bagre..."
                required
              />
            </div>

            {/* Kilos y Precio */}
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">
                <FaWeight className="me-2 text-primary" />
                Kilos en stock
              </label>
              <input
                type="number"
                step="0.01"
                name="kilos"
                value={producto.kilos}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm"
                placeholder="Ej: 10.5"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">
                <FaDollarSign className="me-2 text-success" />
                Precio por kilo
              </label>
              <div className="input-group shadow-sm">
                <span className="input-group-text fw-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  name="precio"
                  value={producto.precio}
                  onChange={handleChange}
                  className="form-control form-control-lg"
                  placeholder="Ej: 1450"
                  required
                />
              </div>
            </div>

            {/* Categoría */}
            <div className="col-12">
              <label className="form-label fw-semibold text-secondary">
                Categoría
              </label>
              <select
                name="categoria_id"
                value={producto.categoria_id}
                onChange={handleChange}
                className="form-select form-select-lg shadow-sm"
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

            {/* Botón */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-success btn-lg w-100 shadow-sm d-flex align-items-center justify-content-center gap-2"
                style={{ borderRadius: "999px" }}
              >
                <FaPlusCircle />
                <span className="fw-semibold">Agregar producto</span>
              </button>
            </div>
          </form>
        </div>

        <div className="card-footer bg-transparent border-0 text-center pb-4">
          <small className="text-muted">
            Asegúrate de que los datos sean correctos antes de guardar.
          </small>
        </div>
      </div>
    </div>
  );
};
