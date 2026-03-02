import React, { useState, useEffect } from "react";
import OverviewCard from "../../components/Cards/OverviewCard";

function Overview() {
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8080/doctor/all");
        const data = await response.json();

        setTotalDoctors(data.length); // count doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        backgroundColor: "#33443",
      }}
    >
      <OverviewCard title="Total Doctors" count={totalDoctors} />
    </div>
  );
}

export default Overview;