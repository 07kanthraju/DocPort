"use client";

import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/appointments/provider")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div>
      <h1>Appointments</h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a: any) => (
            <tr key={a.id}>
              <td>{a.doctor_id}</td>
              <td>{a.appointment_time}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
