import React from "react";
import OverviewCard from "../../components/Cards/OverviewCard";
function Overview() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <OverviewCard title="Total Appointments" count={1000} /> <br />
      <OverviewCard title="Active Insurance Connection" count={12} />
    </div>
  );
}

export default Overview;
