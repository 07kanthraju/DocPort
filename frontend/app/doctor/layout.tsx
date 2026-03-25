import Sidebar from "../components/Sidebar";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
}
