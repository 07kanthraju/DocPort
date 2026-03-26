"use client";
import { useEffect, useState } from "react";
import { getConsentsByProvider, getAllDoctorsList } from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .page { font-family: 'DM Sans', sans-serif; color: #1c1917; padding: 36px 40px; max-width: 900px; }
  .page-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 4px; }
  .page-sub { font-size: 13px; color: #a39e96; font-weight: 300; margin: 0 0 12px; }
  .tabs { display: flex; gap: 0; margin-bottom: 28px; border-bottom: 1px solid #ede8e1; }
  .tab { padding: 10px 20px; font-size: 13px; font-weight: 400; color: #a39e96; background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: color 0.12s; margin-bottom: -1px; font-family: 'DM Sans', sans-serif; }
  .tab:hover { color: #1c1917; }
  .tab.active { color: #1c1917; font-weight: 500; border-bottom-color: #3d3530; }
  .card { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; overflow: hidden; }
  .doctor-row { display: flex; align-items: center; gap: 16px; padding: 16px 20px; border-bottom: 1px solid #f7f4f0; }
  .doctor-row:last-child { border-bottom: none; }
  .avatar { width: 38px; height: 38px; border-radius: 50%; background: #f0ece6; display: flex; align-items: center; justify-content: center; font-family: 'Lora', serif; font-size: 14px; color: #7a736b; flex-shrink: 0; }
  .doctor-info { flex: 1; }
  .doctor-name { font-size: 14px; font-weight: 400; color: #1c1917; }
  .doctor-meta { font-size: 12px; color: #a39e96; margin-top: 2px; }
  .badge { display: inline-block; padding: 2px 9px; border-radius: 20px; font-size: 11px; font-weight: 500; }
  .badge-granted  { background: #d1f0e0; color: #1a6b3a; }
  .badge-pending  { background: #fef3cd; color: #856404; }
  .badge-revoked  { background: #fde8e8; color: #9b2b2b; }
  .badge-active   { background: #d1f0e0; color: #1a6b3a; }
  .badge-inactive { background: #f0ece6; color: #a39e96; }
  .empty { padding: 48px 18px; text-align: center; color: #a39e96; font-size: 13px; font-style: italic; }
  .loading { padding: 32px 18px; text-align: center; color: #b5afa6; font-size: 13px; }
  .search { width: 100%; padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 300; color: #1c1917; background: #fff; border: 1px solid #e0dbd3; border-radius: 8px; outline: none; margin-bottom: 20px; transition: border-color 0.15s; }
  .search:focus { border-color: #c4bdb4; }
`;

export default function InsuranceDoctors() {
  const [consents, setConsents] = useState<any[]>([]);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"connected" | "all">("connected");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { window.location.href = "/login"; return; }

    Promise.all([
      getConsentsByProvider(userId).catch(() => []),
      getAllDoctorsList().catch(() => []),
    ]).then(([c, d]) => {
      setConsents(Array.isArray(c) ? c : []);
      setAllDoctors(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  }, []);

  const initials = (name: string) =>
    name?.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  const connected = consents.filter((c) => c.consentStatus === "GRANTED");

  const filtered = (tab === "connected" ? connected.map((c) => ({ ...c.doctor, consentStatus: c.consentStatus })) : allDoctors)
    .filter((d: any) => !search || d?.name?.toLowerCase().includes(search.toLowerCase()) || d?.specialization?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <h1 className="page-title">Doctors</h1>
        <p className="page-sub">Browse doctors who have granted you access on DocPort.</p>

        <div className="tabs">
          <button className={`tab ${tab === "connected" ? "active" : ""}`} onClick={() => setTab("connected")}>
            Connected ({connected.length})
          </button>
          <button className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
            All doctors ({allDoctors.length})
          </button>
        </div>

        <input
          className="search"
          placeholder="Search by name or specialization…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card">
          {loading ? (
            <div className="loading">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              {tab === "connected" ? "No doctors connected yet." : "No doctors found."}
            </div>
          ) : (
            filtered.map((d: any) => (
              <div className="doctor-row" key={d?.doctorId || d?.id}>
                <div className="avatar">{initials(d?.name || "")}</div>
                <div className="doctor-info">
                  <div className="doctor-name">{d?.name || "Unknown"}</div>
                  <div className="doctor-meta">
                    {d?.specialization || "—"} &nbsp;·&nbsp; {d?.hospital || "—"}
                  </div>
                </div>
                {d?.consentStatus && (
                  <span className={`badge badge-${d.consentStatus.toLowerCase()}`}>{d.consentStatus}</span>
                )}
                <span className={`badge badge-${(d?.status || "inactive").toLowerCase()}`}>
                  {d?.status || "Unknown"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}