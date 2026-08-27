import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit3, Trash2, UserPlus, Save, X } from "lucide-react";

function RegistrationTable() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const storedData =
      JSON.parse(localStorage.getItem("registrations")) || [];

    setRegistrations(storedData);
  }, []);

  const handleDelete = (id) => {
    const updatedData = registrations.filter(
      (item) => item.id !== id
    );

    setRegistrations(updatedData);

    localStorage.setItem(
      "registrations",
      JSON.stringify(updatedData)
    );
  };

  const handleEdit = (item) => {
    setEditingData({ ...item });
  };

  const handleEditChange = (e) => {
    setEditingData({
      ...editingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedData = registrations.map((item) =>
      item.id === editingData.id ? editingData : item
    );

    setRegistrations(updatedData);

    localStorage.setItem(
      "registrations",
      JSON.stringify(updatedData)
    );

    setEditingData(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-5 md:p-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Registrations
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all registered users in one place
            </p>
          </div>

          <button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition"
          >
            <UserPlus size={19} />
            New Registration
          </button>
        </div>

        {/* Empty State */}
        {registrations.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
            <h2 className="text-xl font-semibold text-white">
              No Registrations Yet
            </h2>

            <p className="text-slate-400 mt-2">
              Add your first registration to see it here.
            </p>
          </div>
        ) : (
          /* Table */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Name
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Email
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Course
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {registrations.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4 text-white">
                        {item.name}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {item.email}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {item.phone}
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-sm">
                          {item.course}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                            title="Edit"
                          >
                            <Edit3 size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingData && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-5 z-50">

            <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Edit Registration
                </h2>

                <button
                  onClick={() => setEditingData(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  name="name"
                  value={editingData.name}
                  onChange={handleEditChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />

                <input
                  type="email"
                  name="email"
                  value={editingData.email}
                  onChange={handleEditChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />

                <input
                  type="tel"
                  name="phone"
                  value={editingData.phone}
                  onChange={handleEditChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                />

                <select
                  name="course"
                  value={editingData.course}
                  onChange={handleEditChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                >
                  <option value="Computer Science">
                    Computer Science
                  </option>

                  <option value="Information Technology">
                    Information Technology
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Mechanical">
                    Mechanical
                  </option>
                </select>

                <div className="flex gap-3 pt-2">

                  <button
                    onClick={() => setEditingData(null)}
                    className="flex-1 border border-slate-700 text-slate-300 py-3 rounded-xl hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-violet-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default RegistrationTable;