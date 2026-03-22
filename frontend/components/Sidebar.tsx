"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-black text-white border-r border-gray-800 p-6">
      <h1 className="text-xl font-bold mb-8">DocPort</h1>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="p-2 hover:bg-gray-800 rounded">
          Dashboard
        </Link>

        <Link href="/doctors" className="p-2 hover:bg-gray-800 rounded">
          Doctors
        </Link>

        <Link href="/patients" className="p-2 hover:bg-gray-800 rounded">
          Patients
        </Link>

        <Link href="/insurance" className="p-2 hover:bg-gray-800 rounded">
          Insurance
        </Link>
      </nav>
    </div>
  );
}
