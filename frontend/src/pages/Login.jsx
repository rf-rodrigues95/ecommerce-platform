
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  
  const { token } = useAuth();
  
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      login(data.token);
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleRegister = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: username, password, role: "USER" }),
    });

    if (res.ok) {
        alert("Registration successful! Please login.");
        setIsRegister(false);
        setUsername("");
        setPassword("");
        setError("");
        
    } else {
        setError("Invalid username or password");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) handleRegister();
    else handleLogin();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {error && (
          <p style={{ color: "red", textAlign: "center", margin: 0 }}>{error}</p>
        )}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.25rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        </label>

        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
            <button
                type="submit"
                style={{
                flex: 1,
                padding: "0.65rem",
                backgroundColor: "#1e90ff",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: "20px", // rounder
                cursor: "pointer",
                transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                onClick={() => setIsRegister(false)}
            >
                Iniciar sessão
            </button>

            <button
                type="submit"
                style={{
                flex: 1,
                padding: "0.65rem",
                backgroundColor: "#32cd32",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: "20px", // rounder
                cursor: "pointer",
                transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#28a428")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#32cd32")}
                onClick={() => setIsRegister(true)}
            >
                Criar nova conta
            </button>
        </div>

      </form>
    </div>
  );
}
