"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");

  const login = async () => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    // store user details in local storage
    localStorage.setItem("userId", data.id);
    // localStorage.setItem("email", data.email);
    // localStorage.setItem("role", data.role);

    // redirect based on role
    if (data.role === "doctor") {
      window.location.href = "/doctor/dashboard";
    }

    if (data.role === "insurance") {
      window.location.href = "/insurance/dashboard";
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border p-6 w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <select
          className="border p-2 w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="doctor">Doctor</option>
          <option value="insurance">Insurance</option>
        </select>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </div>
    </div>
  );
}
