import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <h1 className="text-4xl font-bold">
        Welcome to DocPort
      </h1>

      <p className="text-gray-600">
        Doctor • Insurance • Patient Appointment System
      </p>

      <div className="flex gap-4">

        <Link href="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Sign Up
          </button>
        </Link>

      </div>

    </div>
  );
}