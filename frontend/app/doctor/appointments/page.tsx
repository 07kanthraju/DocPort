"use client";

import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/doctor/appointment")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAppointments(data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-xl mb-4">Appointments</h1>

      <table className="border w-full">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(appointments) &&
            appointments.map((a: any) => (
              <tr key={a.id}>
                <td>{a.patientReference}</td>
                <td>{a.status}</td>
                <td>{a.appointmentTime}</td>
              </tr>
            ))}
        </tbody>
        
      </table>
    </div>
  );
}
