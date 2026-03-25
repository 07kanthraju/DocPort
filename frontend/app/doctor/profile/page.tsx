"use client";

import { useEffect, useState } from "react";

export default function DoctorProfile() {

  const [doctor, setDoctor] = useState<any>(null);

  const doctorId =
    typeof window !== "undefined"
      ? localStorage.getItem("userId")
      : null;

  useEffect(() => {

    if (!doctorId) return;

    fetch(`http://localhost:8080/api/doctors/${doctorId}`)
      .then(res => res.json())
      .then(data => {
        setDoctor(data);
      });

  }, [doctorId]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (

    <div>

      <h1>Doctor Profile</h1>

      <div>

        <h3>{doctor.name}</h3>

        <p>{doctor.name}</p>

        <p>Hospital: {doctor.hospital}</p>

        <p>Status: {doctor.status}</p>

      </div>

    </div>
  );
}