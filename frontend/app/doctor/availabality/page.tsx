"use client";

import { useState } from "react";

export default function AvailabilityPage() {

  const doctorId =
    typeof window !== "undefined" ? localStorage.getItem("doctorId") : null;

  const [form, setForm] = useState({
    doctor_id: doctorId || "",
    day_of_week: "",
    start_time: "",
    end_time: "",
    slot_duration_minutes: "",
    is_active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch("http://localhost:8080/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error("Failed to save");
      }

      const data = await res.json();

      console.log(data);
      alert("Availability saved successfully");

    } catch (error) {

      console.error(error);
      alert("Error saving availability");

    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>

      <h2>Doctor Availability</h2>

      <form onSubmit={handleSubmit}>

        <label>Day</label>
        <br />

        <select
          name="day_of_week"
          value={form.day_of_week}
          onChange={handleChange}
          required
        >
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>

        <br /><br />

        <label>Start Time</label>
        <br />

        <input
          type="time"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>End Time</label>
        <br />

        <input
          type="time"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>Slot Duration (minutes)</label>
        <br />

        <input
          type="number"
          name="slot_duration_minutes"
          value={form.slot_duration_minutes}
          onChange={handleChange}
          required
        />

        <br /><br />

        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Active
        </label>

        <br /><br />

        <button type="submit">
          Save Availability
        </button>

      </form>

    </div>
  );
}