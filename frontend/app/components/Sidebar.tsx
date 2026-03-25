"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const r = localStorage.getItem("role");
    setRole(r);
  }, []);

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>Hospital Panel</h2>

      {role === "doctor" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/doctor/dashboard">Dashboard</Link>

          <Link href="/doctor/appointments">Appointments</Link>

          <Link href="/doctor/availabality">Availability</Link>

          <Link href="/doctor/profile">Profile</Link>
        </div>
      )}

      {role === "insurance" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/insurance/dashboard">Dashboard</Link>

          <Link href="/insurance/doctors">Doctors</Link>

          <Link href="/insurance/appointments">Appointments</Link>
        </div>
      )}
    </div>
  );
}
