import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    try {
      const usuarioGuardado = localStorage.getItem("usuarioActivo");
      if (!usuarioGuardado) {
        setCargando(false);
        return;
      }

      const parsed = JSON.parse(usuarioGuardado);

      // Validación básica de estructura esperada
      if (
        !parsed ||
        typeof parsed !== "object" ||
        !parsed.email ||
        !parsed.rol
      ) {
        localStorage.removeItem("usuarioActivo");
        setUsuario(null);
      } else {
        setUsuario(parsed);
      }
    } catch (error) {
      console.warn("Error al leer usuarioActivo. Se limpia.");
      localStorage.removeItem("usuarioActivo");
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }, []);

  const registrar = async (nuevoUsuario) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoUsuario,
          rol: "Cliente", // 👈 Cliente por defecto
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
