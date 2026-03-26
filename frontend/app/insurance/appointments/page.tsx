"use client";
import { useEffect, useState } from "react";
import { getAppointments } from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .page { font-family: 'DM Sans', sans-serif; color: #1c1917; padding: 36px 40px; max-width: 900px; }
  .page-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 4px; }
  .page-sub { font-size: 13px; color: #a39e96; font-weight: 300; margin: 0 0 28px; }
  .card { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; overflow: hidden; }
  .table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .table th { text-align: left; padding: 12px 18px; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #b5afa6; border-bottom: 1px solid #f0ece6; }
  .table td { padding: 13px 18px; border-bottom: 1px solid #f7f4f0; color: #3d3835; }
  .table tr:last-child td { border-bottom: none; }
  .badge { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-active   { background: #d1f0e0; color: #1a6b3a; }
  .badge-cancelled { background: #fde8e8; color: #9b2b2b; }
  .badge-pending  { background: #fef3cd; color: #856404; }
  .empty { padding: 48px 18px; text-align: center; color: #a39e96; font-size: 13px; font-style: italic; }
  .loading { padding: 32px 18px; text-align: center; color: #b5afa6; font-size: 13px; }
  .info-box { background: #faf9f7; border: 1px solid #ede8e1; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: #7a736b; }
`;

export default function InsuranceAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("userId")) { window.location.href = "/login"; return; }
    getAppointments()
      .then((a) => { setAppointments(Array.isArray(a) ? a : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <h1 className="page-title">Appointments</h1>
        <p className="page-sub">View appointments from doctors connected to your network.</p>

        <div className="info-box">
          These are appointments from doctors who have granted your organization access. This is a read-only view.
        </div>

        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : appointments.length === 0 ? (
            <div className="empty">No appointment data available yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Fees</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.doctor?.name || "—"}</td>
                    <td>{a.patientReference || "—"}</td>
                    <td>{a.appointmentTime || "—"}</td>
                    <td>{a.fees ? `₹${a.fees}` : "—"}</td>
                    <td>
                      <span className={`badge badge-${(a.status || "").toLowerCase()}`}>
                        {a.status || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}