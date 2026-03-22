import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-8 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
