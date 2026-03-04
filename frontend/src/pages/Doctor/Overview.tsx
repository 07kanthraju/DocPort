import React, { useState } from "react";
import OverviewCard from "../../components/Cards/OverviewCard";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
};

function Overview() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState<Doctor[]>();

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/doctor/all");
      const data: Doctor[] = await response.json();

      setDoctors(data);
      setSpecialization(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchDoctors}>
        {loading ? "Loading..." : "Load Doctors"}
      </button>

      <OverviewCard title="Total Doctors" count={doctors.length} />

      <div style={{ marginTop: "20px" }}>
        <h3>Doctor List</h3>
        {doctors.map((doctor) => (
          <p key={doctor.id}>{doctor.name}</p>
        ))}
        <h3>Doctor specialization</h3>
        {doctors.map((doctor) => (
          <p key={doctor.id}>{doctor.specialization}</p>
        ))}
      </div>
    </div>
  );
}

export default Overview;
