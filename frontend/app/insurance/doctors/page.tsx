"use client";

import { useEffect, useState } from "react";
import {
  getConsentsByProvider,
  getAllDoctorProfiles,
  sendConnectionRequest,
} from "../../lib/api";

const styles = `
/* YOUR STYLE — unchanged */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; }

.page { font-family:'DM Sans',sans-serif;color:#1c1917;padding:36px 40px;max-width:900px; }
.page-title { font-family:'Lora',serif;font-size:26px;font-weight:500;margin:0 0 4px; }
.page-sub { font-size:13px;color:#a39e96;margin:0 0 12px; }

.tabs { display:flex;margin-bottom:28px;border-bottom:1px solid #ede8e1; }

.tab {
 padding:10px 20px;
 font-size:13px;
 color:#a39e96;
 background:transparent;
 border:none;
 border-bottom:2px solid transparent;
 cursor:pointer;
}

.tab.active { color:#1c1917;font-weight:500;border-bottom-color:#3d3530; }

.card { background:#fff;border:1px solid #ede8e1;border-radius:10px;overflow:hidden; }

.doctor-row {
 display:flex;
 align-items:center;
 gap:16px;
 padding:16px 20px;
 border-bottom:1px solid #f7f4f0;
}

.avatar {
 width:38px;
 height:38px;
 border-radius:50%;
 background:#f0ece6;
 display:flex;
 align-items:center;
 justify-content:center;
 font-family:'Lora',serif;
}

.doctor-info { flex:1; }
.doctor-name { font-size:14px; }
.doctor-meta { font-size:12px;color:#a39e96; }

.badge { padding:3px 10px;border-radius:20px;font-size:11px; }

.badge-granted { background:#d1f0e0;color:#1a6b3a; }
.badge-pending { background:#fef3cd;color:#856404; }
.badge-active { background:#d1f0e0;color:#1a6b3a; }
.badge-inactive { background:#f0ece6;color:#a39e96; }

.connect-btn {
 border:none;
 padding:6px 12px;
 border-radius:6px;
 font-size:12px;
 cursor:pointer;
 background:#3d3530;
 color:white;
}

.search {
 width:100%;
 padding:10px;
 margin-bottom:20px;
 border:1px solid #e0dbd3;
 border-radius:8px;
}
`;

export default function InsuranceDoctors() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [consents, setConsents] = useState<any[]>([]);
  const [tab, setTab] = useState<"connected" | "all">("connected");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const providerId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("userId"))
      : null;

  useEffect(() => {
    if (!providerId) return;

    const loadData = async () => {
      try {
        const [c, d] = await Promise.all([
          getConsentsByProvider(providerId),
          getAllDoctorProfiles(),
        ]);

        setConsents(Array.isArray(c) ? c : []);
        setProfiles(Array.isArray(d) ? d : []);
      } catch (err) {
        console.error("Failed loading doctors", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [providerId]);

  const initials = (name?: string) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  /* Map consent by doctorId */
  const consentMap: Record<number, any> = {};
  consents.forEach((c) => {
    consentMap[c.doctorId] = c;
  });

  const connectedDoctors = profiles.filter(
    (d) => consentMap[d.userId]?.consentStatus === "GRANTED"
  );

  const doctorsToShow = tab === "connected" ? connectedDoctors : profiles;

  const filtered = doctorsToShow.filter(
    (d) =>
      !search ||
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  const requestConnection = async (doctorId: number) => {
    try {
      await sendConnectionRequest(providerId, doctorId);

      setConsents((prev) => [
        ...prev,
        { doctorId: doctorId, consentStatus: "PENDING" },
      ]);

      alert("Connection request sent");
    } catch (e) {
      console.error(e);
      alert("Failed to send request");
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="page">
        <h1 className="page-title">Doctors</h1>
        <p className="page-sub">
          Browse doctors and connect with them on DocPort
        </p>

        <div className="tabs">
          <button
            className={`tab ${tab === "connected" ? "active" : ""}`}
            onClick={() => setTab("connected")}
          >
            Connected ({connectedDoctors.length})
          </button>

          <button
            className={`tab ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All Doctors ({profiles.length})
          </button>
        </div>

        <input
          className="search"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card">
          {loading ? (
            <div style={{ padding: 20 }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 20 }}>No doctors found</div>
          ) : (
            filtered.map((d) => {
              const consent = consentMap[d.userId];

              return (
                <div className="doctor-row" key={d.id}>
                  <div className="avatar">{initials(d.name)}</div>

                  <div className="doctor-info">
                    <div className="doctor-name">{d.name || "Unknown"}</div>

                    <div className="doctor-meta">
                      {d.specialization || "—"} · {d.hospital || "—"}
                    </div>
                  </div>

                  {consent?.consentStatus ? (
                    <span
                      className={`badge badge-${consent.consentStatus.toLowerCase()}`}
                    >
                      {consent.consentStatus}
                    </span>
                  ) : (
                    <button
                      className="connect-btn"
                      onClick={() => requestConnection(d.userId)}
                    >
                      Connect
                    </button>
                  )}

                  <span
                    className={`badge badge-${(d.status || "inactive").toLowerCase()}`}
                  >
                    {d.status || "inactive"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}