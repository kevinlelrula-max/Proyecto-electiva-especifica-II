import { useAuth } from "../../auth/context";
import { usePerfilCliente } from "../hooks/usePerfilCliente";
import { PerfilForm } from "../components/PerfilForm";

export const PerfilClientePage = () => {
  const { usuario } = useAuth();
  const { datos, setDatos, departamentos, municipios, handleChange } = usePerfilCliente(usuario);
const handleGuardar = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/personas`, {
 // <-- CAMBIO AQUÍ
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...datos, email: usuario.email }),
    });
    if (!res.ok) throw new Error("Error al guardar");
    alert("Perfil actualizado correctamente");
  } catch (err) {
    alert("Hubo un error al guardar");
  }
};

  return (
    <div className="container mt-5" style={{ marginLeft: "100px" }}>
      <PerfilForm
        datos={datos}
        departamentos={departamentos}
        municipios={municipios}
        handleChange={handleChange}
        usuario={usuario}
        handleGuardar={handleGuardar}
      />
    </div>
  );
}; 
 