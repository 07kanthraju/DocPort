"use client";

import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .signup-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
    color: #1c1917;
  }

  .signup-card {
    background: #fff;
    border: 1px solid #e5e0d8;
    border-radius: 12px;
    padding: 36px 32px 30px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .signup-wordmark {
    font-family: 'Lora', Georgia, serif;
    font-size: 13px;
    font-weight: 400;
    color: #b5afa6;
    letter-spacing: 0.04em;
    margin-bottom: 26px;
  }

  .signup-card h2 {
    font-family: 'Lora', Georgia, serif;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin: 0 0 4px;
    color: #1c1917;
    line-height: 1.2;
  }

  .signup-lead {
    font-size: 13px;
    color: #a39e96;
    font-weight: 300;
    margin: 0 0 28px;
  }

  .signup-field {
    margin-bottom: 16px;
  }

  .signup-field label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #b5afa6;
    margin-bottom: 7px;
  }

  .signup-field select,
  .signup-field input {
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

  .signup-field select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23b5afa6' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    cursor: pointer;
  }

  .signup-field select:focus,
  .signup-field input:focus {
    border-color: #c4bdb4;
    box-shadow: 0 0 0 3px rgba(180,170,158,0.12);
    background: #fff;
  }

  .signup-field input::placeholder {
    color: #c8c2ba;
    font-style: italic;
    font-family: 'Lora', serif;
    font-size: 13px;
    font-weight: 400;
  }

  .signup-divider {
    height: 1px;
    background: #f0ece6;
    margin: 8px 0 22px;
  }

  .signup-btn {
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

  .signup-btn:hover  { background: #2c2420; }
  .signup-btn:active { transform: scale(0.99); }

  .signup-btn:disabled {
    background: #c8c2ba;
    cursor: not-allowed;
    transform: none;
  }

  .signup-footer {
    margin-top: 18px;
    text-align: center;
    font-size: 13px;
    color: #a39e96;
    font-weight: 300;
  }

  .signup-footer a {
    color: #3d3530;
    font-weight: 400;
    text-decoration: none;
    border-bottom: 1px solid #d0c9c0;
  }

  .signup-footer a:hover {
    border-bottom-color: #3d3530;
  }

  .signup-error {
    margin-top: 14px;
    padding: 10px 14px;
    background: #fdf1f1;
    color: #a85555;
    border-radius: 7px;
    font-size: 13px;
    text-align: center;
  }
`;

export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]         = useState("");
  const [role, setRole]         = useState("doctor");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const canSubmit = name.trim() && email.trim() && password && !loading;

  const signup = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });

      if (!res.ok) {
        setError("Something went wrong. Please check your details and try again.");
        return;
      }

      window.location.href = "/login";
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-wordmark">Medic</div>

          <h2>Create an account</h2>
          <p className="signup-lead">Get started — it only takes a moment</p>

          <div className="signup-field">
            <label>I am a</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="doctor">Doctor</option>
              <option value="insurance">Insurance</option>
            </select>
          </div>

          <div className="signup-field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Dr. Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canSubmit && signup()}
            />
          </div>

          <div className="signup-divider" />

          <button className="signup-btn" onClick={signup} disabled={!canSubmit}>
            {loading ? "Creating account…" : "Create account"}
          </button>

          {error && <div className="signup-error">{error}</div>}

          <p className="signup-footer">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </>
  );
}