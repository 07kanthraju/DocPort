import React from "react";
import TotalAppointment from "../../components/Cards/TotalAppointments";
function Overview() {
  return (

      <div style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  }}>
      <TotalAppointment title="Total Appointments" Appointments={1000} /> <br />
      <TotalAppointment title="Active Insurance Connection" Appointments={12} />
     
    </div>
    
  );
}

export default Overview;
