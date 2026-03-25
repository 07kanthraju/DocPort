"use client";

import { useEffect, useState } from "react";

export default function Doctors(){

  const [doctors,setDoctors] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:8080/api/insurance/doctors")
      .then(res=>res.json())
      .then(data=>setDoctors(data))

  },[])

  return(

    <div>

      <h1 className="text-2xl mb-6">Doctors</h1>

      <table className="border w-full">

        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {doctors.map((d:any)=>(
            <tr key={d.doctor_id}>
              <td>{d.full_name}</td>
              <td>{d.specialization}</td>
              <td>{d.status}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}