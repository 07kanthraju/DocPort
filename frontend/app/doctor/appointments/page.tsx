"use client";
import { useEffect, useState } from "react";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .page { font-family: 'DM Sans', sans-serif; color: #1c1917; padding: 36px 40px; max-width: 900px; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 32px; }
  .page-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 4px; }
  .page-sub { font-size: 13px; color: #a39e96; font-weight: 300; margin: 0; }
  .btn { padding: 10px 22px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #fff; background: #3d3530; border: none; border-radius: 7px; cursor: pointer; transition: background 0.15s; }
  .btn:hover { background: #2c2420; }
  .btn-ghost { padding: 8px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: #6b6560; background: transparent; border: 1px solid #e0dbd3; border-radius: 6px; cursor: pointer; transition: all 0.12s; }
  .btn-ghost:hover { border-color: #3d3530; color: #1c1917; }
  .btn-danger { color: #a85555; border-color: #f0d0d0; }
  .btn-danger:hover { border-color: #a85555; background: #fdf1f1; }
  .card { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; overflow: hidden; }
  .table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .table th { text-align: left; padding: 12px 18px; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #b5afa6; border-bottom: 1px solid #f0ece6; }
  .table td { padding: 13px 18px; border-bottom: 1px solid #f7f4f0; color: #3d3835; vertical-align: middle; }
  .table tr:last-child td { border-bottom: none; }
  .badge { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-active   { background: #d1f0e0; color: #1a6b3a; }
  .badge-cancelled { background: #fde8e8; color: #9b2b2b; }
  .badge-pending  { background: #fef3cd; color: #856404; }
  .actions { display: flex; gap: 8px; }
  .empty { padding: 48px 18px; text-align: center; color: #a39e96; font-size: 13px; font-style: italic; }
  .loading { padding: 32px 18px; text-align: center; color: #b5afa6; font-size: 13px; }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(28,25,23,0.35); display: flex; align-items: center; justify-content: center; z-index: 100; }
  .modal { background: #fff; border-radius: 12px; padding: 30px 28px; width: 100%; max-width: 420px; border: 1px solid #ede8e1; }
  .modal h3 { font-family: 'Lora', serif; font-size: 18px; font-weight: 500; margin: 0 0 20px; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #b5afa6; margin-bottom: 7px; }
  .field input, .field select { width: 100%; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #1c1917; background: #faf9f7; border: 1px solid #e0dbd3; border-radius: 7px; outline: none; transition: border-color 0.15s; }
  .field input:focus, .field select:focus { border-color: #c4bdb4; background: #fff; }
  .modal-actions { display: flex; gap: 10px; margin-top: 22px; justify-content: flex-end; }
`;

type Appointment = {
  id: number;
  patientReference: string;
  appointmentTime: string;
  fees: string;
  status: string;
  doctor?: any;
};

const empty = (): Omit<Appointment, "id"> => ({
  patientReference: "",
  appointmentTime: "",
  fees: "",
  status: "active",
  doctor: null,
});

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [form, setForm] = useState(empty());

  const load = () => {
    getAppointments()
      .then((a) => {
        setAppointments(Array.isArray(a) ? a : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      window.location.href = "/login";
      return;
    }
    load();
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => {
    setEditing(null);
    setForm(empty());
    setModal(true);
  };
  const openEdit = (a: Appointment) => {
    setEditing(a);
    setForm({
      patientReference: a.patientReference,
      appointmentTime: a.appointmentTime,
      fees: a.fees,
      status: a.status,
      doctor: a.doctor,
    });
    setModal(true);
  };

  const save = async () => {
    try {
      if (editing) await updateAppointment(editing.id, form);
      else await createAppointment(form);
      setModal(false);
      load();
    } catch {
      alert("Failed to save.");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Cancel Appointment?")) return;
    try {
      await deleteAppointment(id);
      load();
    } catch {
      alert("Failed to delete.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Appointments</h1>
            <p className="page-sub">Manage your patient appointments.</p>
          </div>
        </div>

        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : appointments.length === 0 ? (
            <div className="empty">
              No appointments yet. Create your first one.
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Fees</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.patientReference || "—"}</td>
                    <td>{a.appointmentTime || "—"}</td>
                    <td>{a.fees ? `₹${a.fees}` : "—"}</td>
                    <td>
                      <span
                        className={`badge badge-${(a.status || "").toLowerCase()}`}
                      >
                        {a.status || "—"}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-ghost"
                          onClick={() => openEdit(a)}
                        >
                          Reschedule
                        </button>
                        <button
                          className="btn-ghost btn-danger"
                          onClick={() => remove(a.id)}
                        >
                          Reject Appointment
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <div
          className="modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && setModal(false)}
        >
          <div className="modal">
            <h3>{editing ? "Edit appointment" : "New appointment"}</h3>
            <div className="field">
              <label>Patient reference</label>
              <input
                value={form.patientReference}
                onChange={(e) => set("patientReference", e.target.value)}
                placeholder="Patient name or ID"
              />
            </div>
            <div className="field">
              <label>Appointment time</label>
              <input
                value={form.appointmentTime}
                onChange={(e) => set("appointmentTime", e.target.value)}
                placeholder="e.g. 2024-06-15 10:00 AM"
              />
            </div>
            <div className="field">
              <label>Fees (₹)</label>
              <input
                value={form.fees}
                onChange={(e) => set("fees", e.target.value)}
                placeholder="500"
              />
            </div>
            <div className="field">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="btn" onClick={save}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
