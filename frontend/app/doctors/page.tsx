"use client";

import { useEffect, useState } from "react";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

const API = "http://localhost:8080/api/doctors";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewDoctor, setViewDoctor] = useState<Doctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);

  // ── Fetch all doctors ──────────────────────────────────────────────────────
  const loadDoctors = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // ── Save (Create or Update) ────────────────────────────────────────────────
  const saveDoctor = async () => {
    if (!name || !specialization) return alert("Fill all fields");

    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, specialization }),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, specialization }),
      });
    }

    setName("");
    setSpecialization("");
    setEditingId(null);
    loadDoctors();
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deleteDoctor) return;
    await fetch(`${API}/${deleteDoctor.id}`, { method: "DELETE" });
    setDeleteDoctor(null);
    loadDoctors();
  };

  // ── Start editing ──────────────────────────────────────────────────────────
  const startEdit = (doctor: Doctor) => {
    setName(doctor.name);
    setSpecialization(doctor.specialization);
    setEditingId(doctor.id);
  };

  const cancelEdit = () => {
    setName("");
    setSpecialization("");
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Doctors Management
      </h1>

      {/* ── Form ── */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">
          {editingId ? "Edit Doctor" : "Add Doctor"}
        </h2>
        <div className="flex gap-3 flex-wrap">
          <input
            className="border p-2 rounded flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border p-2 rounded flex-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
          <button
            onClick={saveDoctor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              onClick={cancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((doc, i) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-400">{i + 1}</td>
                  <td className="p-3 font-medium text-gray-800">{doc.name}</td>
                  <td className="p-3 text-gray-600">{doc.specialization}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => setViewDoctor(doc)}
                      className="text-gray-500 border px-3 py-1 rounded hover:bg-gray-50"
                    >
                      View
                    </button>
                    <button
                      onClick={() => startEdit(doc)}
                      className="text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteDoctor(doc)}
                      className="text-red-600 border border-red-200 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── View Modal ── */}
      {viewDoctor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Doctor Details
            </h2>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">ID:</span> #{viewDoctor.id}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Name:</span> {viewDoctor.name}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Specialization:</span>{" "}
              {viewDoctor.specialization}
            </p>
            <button
              onClick={() => setViewDoctor(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteDoctor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Delete Doctor?
            </h2>
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {deleteDoctor.name}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteDoctor(null)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
