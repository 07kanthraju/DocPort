"use client";
import { useEffect, useState } from "react";
import { getInsuranceProfile, createInsuranceProfile, updateInsuranceProfile } from "../../lib/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  .page { font-family: 'DM Sans', sans-serif; color: #1c1917; padding: 36px 40px; max-width: 640px; }
  .page-title { font-family: 'Lora', serif; font-size: 26px; font-weight: 500; letter-spacing: -0.01em; margin: 0 0 4px; }
  .page-sub { font-size: 13px; color: #a39e96; font-weight: 300; margin: 0 0 36px; }
  .card { background: #fff; border: 1px solid #ede8e1; border-radius: 10px; padding: 28px 30px; }
  .field { margin-bottom: 20px; }
  .field label { display: block; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: #b5afa6; margin-bottom: 7px; }
  .field input { width: 100%; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: #1c1917; background: #faf9f7; border: 1px solid #e0dbd3; border-radius: 7px; outline: none; transition: border-color 0.15s; }
  .field input:focus { border-color: #c4bdb4; background: #fff; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .divider { height: 1px; background: #f0ece6; margin: 8px 0 22px; }
  .btn { padding: 11px 28px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500; color: #fff; background: #3d3530; border: none; border-radius: 7px; cursor: pointer; transition: background 0.15s; }
  .btn:hover { background: #2c2420; }
  .btn:disabled { background: #c8c2ba; cursor: not-allowed; }
  .success { margin-top: 14px; padding: 10px 14px; background: #d1f0e0; color: #1a6b3a; border-radius: 7px; font-size: 13px; }
  .error { margin-top: 14px; padding: 10px 14px; background: #fdf1f1; color: #a85555; border-radius: 7px; font-size: 13px; }
`;

export default function InsuranceProfile() {
  const [form, setForm] = useState({ companyName: "", email: "", phone: "", address: "" });
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { window.location.href = "/login"; return; }
    getInsuranceProfile(userId).then((p) => {
      if (p) setForm({ companyName: p.companyName || "", email: p.email || "", phone: p.phone || "", address: p.address || "" });
    }).catch(() => setIsNew(true));
  }, []);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    setLoading(true); setSaved(false); setError("");
    try {
      if (isNew) {
        await createInsuranceProfile({ ...form, userId: parseInt(userId) });
        setIsNew(false);
      } else {
        await updateInsuranceProfile(userId, form);
      }
      setSaved(true);
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <h1 className="page-title">Company profile</h1>
        <p className="page-sub">Your organization details shown to doctors on the platform.</p>

        <div className="card">
          <div className="field">
            <label>Company name</label>
            <input value={form.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Acme Insurance Ltd." />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="contact@acmeinsurance.com" />
          </div>
          <div className="row">
            <div className="field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div className="field">
              <label>Address</label>
              <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Mumbai, India" />
            </div>
          </div>

          <div className="divider" />
          <button className="btn" onClick={save} disabled={loading}>
            {loading ? "Saving…" : isNew ? "Create profile" : "Save changes"}
          </button>
          {saved && <div className="success">Profile saved successfully.</div>}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
}