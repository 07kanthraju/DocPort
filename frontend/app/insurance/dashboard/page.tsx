"use client";
import { useEffect, useState } from "react";
import { getInsuranceProfile, getConsentsByProvider, getSyncsByProvider } from "../../lib/api";

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
  .badge-granted  { background: #d1f0e0; color: #1a6b3a; }
  .badge-pending  { background: #fef3cd; color: #856404; }
  .badge-revoked  { background: #fde8e8; color: #9b2b2b; }
  .badge-synced   { background: #d1f0e0; color: #1a6b3a; }
  .badge-failed   { background: #fde8e8; color: #9b2b2b; }
  .empty { padding: 32px 18px; text-align: center; color: #a39e96; font-size: 13px; font-style: italic; }
  .loading { padding: 32px 18px; text-align: center; color: #b5afa6; font-size: 13px; }
`;

export default function InsuranceDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [consents, setConsents] = useState<any[]>([]);
  const [syncs, setSyncs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { window.location.href = "/login"; return; }

    Promise.all([
      getInsuranceProfile(userId).catch(() => null),
      getConsentsByProvider(userId).catch(() => []),
      getSyncsByProvider(userId).catch(() => []),
    ]).then(([p, c, s]) => {
      setProfile(p);
      setConsents(Array.isArray(c) ? c : []);
      setSyncs(Array.isArray(s) ? s : []);
      setLoading(false);
    });
  }, []);

  const grantedCount = consents.filter((c) => c.consentStatus === "GRANTED").length;

  return (
    <>
      <style>{styles}</style>
      <div className="dash">
        <h1 className="dash-greeting">
          {profile?.companyName ? `${profile.companyName}` : "Insurance dashboard"}
        </h1>
        <p className="dash-sub">Overview of your connected doctors and sync activity.</p>

        <div className="stats">
          <div className="stat">
            <div className="stat-label">Connected doctors</div>
            <div className="stat-value">{loading ? "—" : grantedCount}</div>
            <div className="stat-note">consents granted</div>
          </div>
          <div className="stat">
            <div className="stat-label">Total consents</div>
            <div className="stat-value">{loading ? "—" : consents.length}</div>
            <div className="stat-note">all time</div>
          </div>
          <div className="stat">
            <div className="stat-label">Sync records</div>
            <div className="stat-value">{loading ? "—" : syncs.length}</div>
            <div className="stat-note">in system</div>
          </div>
        </div>

        <div className="section-title">Doctor consents</div>
        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : consents.length === 0 ? (
            <div className="empty">No doctors have connected yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Status</th>
                  <th>Since</th>
                </tr>
              </thead>
              <tbody>
                {consents.map((c) => (
                  <tr key={c.id}>
                    <td>{c.doctor?.name || `Doctor #${c.doctor?.doctorId}`}</td>
                    <td>{c.doctor?.specialization || "—"}</td>
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

        <div className="section-title">Sync activity</div>
        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : syncs.length === 0 ? (
            <div className="empty">No sync activity yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Status</th>
                  <th>Last profile sync</th>
                  <th>Last availability sync</th>
                </tr>
              </thead>
              <tbody>
                {syncs.map((s) => (
                  <tr key={s.id}>
                    <td>#{s.doctorId}</td>
                    <td>
                      <span className={`badge badge-${(s.syncStatus || "").toLowerCase()}`}>
                        {s.syncStatus || "—"}
                      </span>
                    </td>
                    <td>{s.lastProfileSync ? new Date(s.lastProfileSync).toLocaleString() : "—"}</td>
                    <td>{s.lastAvailabilitySync ? new Date(s.lastAvailabilitySync).toLocaleString() : "—"}</td>
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