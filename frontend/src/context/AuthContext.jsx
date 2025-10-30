import { createContext, useContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuarioGuardado) setUsuario(usuarioGuardado);
    setCargando(false);
  }, []);

  const registrar = async (nuevoUsuario) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: nuevoUsuario.email,
          password: nuevoUsuario.password,
          rol_id: 2, // Cliente por defecto
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje);

      const usuarioAutenticado = {
        id: data.id,
        email: data.email,
        rol: data.rol,
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioAutenticado));
      setUsuario(usuarioAutenticado);
      return usuarioAutenticado;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, registrar, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
