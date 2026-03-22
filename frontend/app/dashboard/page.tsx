export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Doctors</p>
          <h2 className="text-2xl font-bold">25</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Patients</p>
          <h2 className="text-2xl font-bold">300</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Insurance Claims</p>
          <h2 className="text-2xl font-bold">45</h2>
        </div>
      </div>
    </div>
  );
}
