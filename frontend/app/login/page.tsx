"use client";

import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
    color: #1c1917;
  }

  .login-card {
    background: #fff;
    border: 1px solid #e5e0d8;
    border-radius: 12px;
    padding: 36px 32px 30px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .login-wordmark {
    font-family: 'Lora', Georgia, serif;
    font-size: 13px;
    font-weight: 400;
    color: #b5afa6;
    letter-spacing: 0.04em;
    margin-bottom: 26px;
  }

  .login-card h2 {
    font-family: 'Lora', Georgia, serif;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin: 0 0 4px;
    color: #1c1917;
    line-height: 1.2;
  }

  .login-lead {
    font-size: 13px;
    color: #a39e96;
    font-weight: 300;
    margin: 0 0 28px;
  }

  .login-field {
    margin-bottom: 16px;
  }

  .login-field label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #b5afa6;
    margin-bottom: 7px;
  }

  .login-field select,
  .login-field input {
    width: 100%;
    padding: 10px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #1c1917;
    background: #faf9f7;
    border: 1px solid #e0dbd3;
    border-radius: 7px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    appearance: none;
    -webkit-appearance: none;
  }

  .login-field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b5afa6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    cursor: pointer;
  }

  .login-field select:focus,
  .login-field input:focus {
    border-color: #c4bdb4;
    box-shadow: 0 0 0 3px rgba(180,170,158,0.12);
    background: #fff;
  }

  .login-field input::placeholder {
    color: #c8c2ba;
    font-style: italic;
    font-family: 'Lora', serif;
    font-size: 13px;
    font-weight: 400;
  }

  .login-divider {
    height: 1px;
    background: #f0ece6;
    margin: 8px 0 22px;
  }

  .login-btn {
    width: 100%;
    padding: 11px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #fff;
    background: #3d3530;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }

  .login-btn:hover  { background: #2c2420; }
  .login-btn:active { transform: scale(0.99); }

  .login-btn:disabled {
    background: #c8c2ba;
    cursor: not-allowed;
    transform: none;
  }

  .login-error {
    margin-top: 14px;
    padding: 10px 14px;
    background: #fdf1f1;
    color: #a85555;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
  }
`;

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole]         = useState("doctor");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const canSubmit = email.trim() && password && !loading;

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Incorrect email or password. Please try again.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("userId", data.id);

      if (data.role === "doctor")    window.location.href = "/doctor/dashboard";
      if (data.role === "insurance") window.location.href = "/insurance/dashboard";
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">
        <div className="login-card">
          <div className="login-wordmark">Medic</div>

          <h2>Welcome back</h2>
          <p className="login-lead">Sign in to your account to continue</p>

          <div className="login-field">
            <label>Signing in as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="doctor">Doctor</option>
              <option value="insurance">Insurance</option>
            </select>
          </div>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canSubmit && login()}
            />
          </div>

          <div className="login-divider" />

          <button className="login-btn" onClick={login} disabled={!canSubmit}>
            {loading ? "Signing in…" : "Sign in"}
          </button>

          {error && <div className="login-error">{error}</div>}
        </div>
      </div>
    </>
  );
}