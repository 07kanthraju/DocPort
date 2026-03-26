"use client";
import { useEffect, useState } from "react";
import { getDoctorProfile, getAppointments, getConsentsByDoctor } from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .dash { font-family: 'DM Sans', sans-serif; color: #1c1917; padding: 36px 40px; max-width: 900px; }
  .dash-greeting { font-family: 'Lora', serif; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 4px; }
  .dash-sub { font-size: 13px; color: #a39e96; font-weight: 300; margin: 0 0 36px; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; }
  .stat { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; padding: 20px 22px; }
  .stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #b5afa6; margin-bottom: 8px; }
  .stat-value { font-family: 'Lora', serif; font-size: 28px; font-weight: 500; color: #1c1917; }
  .stat-note { font-size: 12px; color: #a39e96; margin-top: 4px; }
  .section-title { font-family: 'Lora', serif; font-size: 16px; font-weight: 500; margin: 0 0 14px; }
  .card { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; overflow: hidden; margin-bottom: 28px; }
  .table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  .table th { text-align: left; padding: 12px 18px; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #b5afa6; border-bottom: 1px solid #f0ece6; }
  .table td { padding: 13px 18px; border-bottom: 1px solid #f7f4f0; color: #3d3835; }
  .table tr:last-child td { border-bottom: none; }
  .badge { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-pending  { background: #fef3cd; color: #856404; }
  .badge-granted  { background: #d1f0e0; color: #1a6b3a; }
  .badge-revoked  { background: #fde8e8; color: #9b2b2b; }
  .badge-active   { background: #d1f0e0; color: #1a6b3a; }
  .badge-cancelled { background: #fde8e8; color: #9b2b2b; }
  .empty { padding: 32px 18px; text-align: center; color: #a39e96; font-size: 13px; font-style: italic; }
  .loading { padding: 32px 18px; text-align: center; color: #b5afa6; font-size: 13px; }
`;

export default function DoctorDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [consents, setConsents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { window.location.href = "/login"; return; }

    Promise.all([
      getDoctorProfile(userId).catch(() => null),
      getAppointments().catch(() => []),
      getConsentsByDoctor(userId).catch(() => []),
    ]).then(([p, a, c]) => {
      setProfile(p);
      setAppointments(Array.isArray(a) ? a.slice(0, 5) : []);
      setConsents(Array.isArray(c) ? c : []);
      setLoading(false);
    });
  }, []);

  const name = profile?.name || "Doctor";
  const activeConsents = consents.filter((c) => c.consentStatus === "GRANTED").length;

  return (
    <>
      <style>{styles}</style>
      <div className="dash">
        <h1 className="dash-greeting">Good day, {name.split(" ")[0]}.</h1>
        <p className="dash-sub">Here's what's happening with your DocPort account.</p>

        <div className="stats">
          <div className="stat">
            <div className="stat-label">Appointments</div>
            <div className="stat-value">{loading ? "—" : appointments.length}</div>
            <div className="stat-note">total on record</div>
          </div>
          <div className="stat">
            <div className="stat-label">Active insurers</div>
            <div className="stat-value">{loading ? "—" : activeConsents}</div>
            <div className="stat-note">consents granted</div>
          </div>
          <div className="stat">
            <div className="stat-label">Profile</div>
            <div className="stat-value" style={{ fontSize: "18px", paddingTop: "6px" }}>
              {profile?.status || "—"}
            </div>
            <div className="stat-note">{profile?.specialization || "not set"}</div>
          </div>
        </div>

        <div className="section-title">Recent appointments</div>
        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : appointments.length === 0 ? (
            <div className="empty">No appointments yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Time</th>
                  <th>Fees</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.patientReference || "—"}</td>
                    <td>{a.appointmentTime || "—"}</td>
                    <td>{a.fees ? `₹${a.fees}` : "—"}</td>
                    <td>
                      <span className={`badge badge-${(a.status || "").toLowerCase()}`}>
                        {a.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="section-title">Insurance consents</div>
        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : consents.length === 0 ? (
            <div className="empty">No insurance consents yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Status</th>
                  <th>Since</th>
                </tr>
              </thead>
              <tbody>
                {consents.map((c) => (
                  <tr key={c.id}>
                    <td>{c.provider?.providerName || `Provider #${c.provider?.id}`}</td>
                    <td>
                      <span className={`badge badge-${(c.consentStatus || "").toLowerCase()}`}>
                        {c.consentStatus}
                      </span>
                    </td>
                    <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}</td>
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