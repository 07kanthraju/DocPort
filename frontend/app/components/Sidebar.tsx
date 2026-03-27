"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .sidebar { width: 216px; min-height: 100vh; background: #fff; border-right: 1px solid #ede8e1; padding: 28px 0 24px; display: flex; flex-direction: column; font-family: 'DM Sans', sans-serif; flex-shrink: 0; }
  .sidebar-wordmark { font-family: 'Lora', serif; font-size: 14px; font-weight: 400; color: #b5afa6; letter-spacing: 0.06em; padding: 0 22px; margin-bottom: 32px; }
  .sidebar-label { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c8c2ba; padding: 0 22px; margin: 0 0 4px; }
  .sidebar-link { display: flex; align-items: center; gap: 9px; padding: 9px 22px; font-size: 13.5px; font-weight: 400; color: #6b6560; text-decoration: none; border-left: 2px solid transparent; transition: color 0.12s, background 0.12s, border-color 0.12s; }
  .sidebar-link:hover { color: #1c1917; background: #faf9f7; }
  .sidebar-link.active { color: #1c1917; font-weight: 500; border-left-color: #3d3530; background: #faf9f7; }
  .sidebar-spacer { flex: 1; }
  .sidebar-logout { margin: 0 14px; padding: 9px 14px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #a39e96; background: transparent; border: 1px solid #ede8e1; border-radius: 7px; cursor: pointer; transition: color 0.12s, border-color 0.12s; width: calc(100% - 28px); text-align: left; }
  .sidebar-logout:hover { color: #1c1917; border-color: #c4bdb4; }
`;

const doctorNav = [
  { href: "/doctor/dashboard",    label: "Dashboard",    icon: "⬡" },
  { href: "/doctor/profile",      label: "Profile",      icon: "◎" },
  { href: "/doctor/appointments", label: "Appointments", icon: "◷" },
  { href: "/doctor/availabality", label: "Availability", icon: "◈" },
];

const insuranceNav = [
  { href: "/insurance/dashboard",     label: "Dashboard",    icon: "⬡" },
  { href: "/insurance/profile",       label: "Profile",      icon: "◎" },
  { href: "/insurance/doctors",       label: "Doctors",      icon: "◈" },
  { href: "/insurance/appointments",  label: "Appointments", icon: "◷" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isInsurance = pathname.startsWith("/insurance");
  const nav = isInsurance ? insuranceNav : doctorNav;

  return (
    <>
      <style>{css}</style>
      <aside className="sidebar">
        <div className="sidebar-wordmark">DocPort</div>
        <div className="sidebar-label">{isInsurance ? "Insurance" : "Doctor"}</div>
        {nav.map((item) => (
          <Link key={item.href} href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}>
            <span style={{ fontSize: "13px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <div className="sidebar-spacer" />
        <button className="sidebar-logout" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>
          Sign out
        </button>
      </aside>
    </>
  );
}