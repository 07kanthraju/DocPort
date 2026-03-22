export default function Users() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <div className="bg-white rounded-lg shadow p-6">

        <table className="w-full">

          <thead className="border-b">
            <tr className="text-left">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-3">John Doe</td>
              <td>john@example.com</td>
              <td className="text-green-600">Active</td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Jane Smith</td>
              <td>jane@example.com</td>
              <td className="text-red-500">Blocked</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}