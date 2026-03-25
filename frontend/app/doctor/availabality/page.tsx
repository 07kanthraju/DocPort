"use client";

import { useState } from "react";
// import Sidebar from "../../components/Sidebar";

export default function Availability() {
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const save = async () => {
    await fetch("http://localhost:8080/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        day_of_week: day,
        start_time: start,
        end_time: end,
        slot_duration_minutes: 30,
      }),
    });
  };

  return (
    <div className="flex">
      {/* <Sidebar /> */}

      <div className="p-6">
        <h1 className="text-xl mb-4">Availability</h1>

        <input
          placeholder="Day"
          className="border p-2 mb-2"
          onChange={(e) => setDay(e.target.value)}
        />

        <input
          placeholder="Start Time"
          className="border p-2 mb-2"
          onChange={(e) => setStart(e.target.value)}
        />

        <input
          placeholder="End Time"
          className="border p-2 mb-2"
          onChange={(e) => setEnd(e.target.value)}
        />

        <button onClick={save} className="bg-blue-500 text-white p-2">
          Save
        </button>
      </div>
    </div>
  );
}
