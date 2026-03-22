import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-8 bg-gray-950 text-gray-200 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
