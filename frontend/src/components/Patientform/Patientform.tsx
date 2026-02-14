import React, { useState, useEffect } from "react";
import Button from "../Button/Button";

interface Doctor {
  id: number;
  name: string;
}

interface InsuranceProvider {
  id: number;
  providerName: string;
}

const PatientForm: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [doctorId, setDoctorId] = useState<number | "">("");
  const [insuranceId, setInsuranceId] = useState<number | "">("");

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [insurances, setInsurances] = useState<InsuranceProvider[]>([]);

  // Fetch doctors and insurance providers from backend
  useEffect(() => {
    fetch("http://localhost:8080/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));

    fetch("http://localhost:8080/insuranceproviders")
      .then((res) => res.json())
      .then((data) => setInsurances(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !doctorId || !insuranceId) {
      alert("All fields are required");
      return;
    }

    fetch(
      `http://localhost:8080/patients/doctor/${doctorId}/insurance/${insuranceId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create patient");
        return res.json();
      })
      .then((data) => {
        alert(`Patient created with ID: ${data.id}`);
        setName("");
        setAge("");
        setDoctorId("");
        setInsuranceId("");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Patient</h2>

      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Doctor:</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(Number(e.target.value))}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Insurance Provider:</label>
        <select
          value={insuranceId}
          onChange={(e) => setInsuranceId(Number(e.target.value))}
        >
          <option value="">Select Provider</option>
          {insurances.map((ins) => (
            <option key={ins.id} value={ins.id}>
              {ins.providerName}
            </option>
          ))}
        </select>
      </div>

      <Button text="Submit" type="primary" />
    </form>
  );
};

export default PatientForm;
