"use client";

import { useState } from "react";

export default function AvailabilityPage() {

  const [formData, setFormData] = useState({
    doctorId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    slotDurationMinutes: "",
    isActive: true
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doctorId: Number(formData.doctorId),
          dayOfWeek: formData.dayOfWeek,
          startTime: formData.startTime,
          endTime: formData.endTime,
          slotDurationMinutes: Number(formData.slotDurationMinutes),
          isActive: formData.isActive
        })
      });

      if (!response.ok) {
        throw new Error("Failed to save availability");
      }

      alert("Availability saved successfully");

      setFormData({
        doctorId: "",
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        slotDurationMinutes: "",
        isActive: true
      });

    } catch (error) {
      console.error(error);
      alert("Error saving availability");
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-lg font-semibold mb-4">
        Doctor Availability
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Doctor ID</label>
          <input
            type="number"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Day of Week</label>
          <select
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
            className="border p-2 w-full"
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
        </div>

        <div>
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Slot Duration (minutes)</label>
          <input
            type="number"
            name="slotDurationMinutes"
            value={formData.slotDurationMinutes}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          <label>Active</label>
        </div>

        <button
          type="submit"
          className="border px-4 py-2"
        >
          Save Availability
        </button>

      </form>

    </div>
  );
}