import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  Edit3,
  Trash2,
  Users,
  X,
  Save,
} from "lucide-react";

function RegistrationTable() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [editingData, setEditingData] = useState(null);

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch registrations");
        }

        const data = await response.json();

        setRegistrations(data);
      } catch (error) {
        console.error(
          "Error fetching registrations:",
          error
        );
      }
    };

    fetchRegistrations();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete user"
        );
      }

      // Remove deleted user from UI
      setRegistrations((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Registration deleted successfully!");

    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed. Check backend.");
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setEditingData({
      ...item,
    });
  };

  // ================= EDIT INPUT CHANGE =================
  const handleEditChange = (e) => {
    setEditingData({
      ...editingData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleSave = async () => {
    if (!editingData) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${editingData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingData.name,
            email: editingData.email,
            phone: editingData.phone,
            course: editingData.course,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update user"
        );
      }

      // Update UI with updated MongoDB data
      setRegistrations((prev) =>
        prev.map((item) =>
          item._id === editingData._id
            ? data.user
            : item
        )
      );

      setEditingData(null);

      alert("Registration updated successfully!");

    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed. Check backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-7">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Users size={22} />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Registrations
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Manage registered users
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition"
          >
            <UserPlus size={18} />
            New Registration
          </button>

        </div>

        {/* ================= COUNT ================= */}
        <div className="mb-5">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">

            <span className="text-slate-400 text-sm">
              Total Registrations
            </span>

            <span className="text-indigo-400 font-bold">
              {registrations.length}
            </span>

          </div>

        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">

          {registrations.length === 0 ? (

            /* ================= EMPTY STATE ================= */
            <div className="px-6 py-16 text-center">

              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                <Users
                  size={28}
                  className="text-indigo-400"
                />

              </div>

              <h2 className="text-xl font-semibold text-white">
                No registrations yet
              </h2>

              <p className="text-slate-400 text-sm mt-2 mb-6">
                Add your first registration to see it here.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition"
              >
                Add Registration
              </button>

            </div>

          ) : (

            /* ================= RESPONSIVE TABLE ================= */
            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                {/* ================= TABLE HEADER ================= */}
                <thead>

                  <tr className="border-b border-slate-800 bg-slate-900">

                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      #
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Name
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Phone
                    </th>

                    <th className="text-left px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Course
                    </th>

                    <th className="text-center px-5 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>

                  </tr>

                </thead>

                {/* ================= TABLE BODY ================= */}
                <tbody>

                  {registrations.map((item, index) => (

                    <tr
                      key={item._id}
                      className="border-b border-slate-800/70 hover:bg-slate-800/40 transition"
                    >

                      {/* Number */}
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {index + 1}
                      </td>

                      {/* Name */}
                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-semibold">

                            {item.name
                              ?.charAt(0)
                              ?.toUpperCase()}

                          </div>

                          <span className="text-sm font-medium text-white">
                            {item.name}
                          </span>

                        </div>

                      </td>

                      {/* Email */}
                      <td className="px-5 py-4 text-sm text-white">
                        {item.email}
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-sm text-white">
                        {item.phone}
                      </td>

                      {/* Course */}
                      <td className="px-5 py-4">

                        <span className="inline-flex px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                          {item.course}
                        </span>

                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-2">

                          {/* ================= EDIT BUTTON ================= */}
                          <button
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition"
                            title="Edit"
                          >

                            <Edit3 size={16} />

                          </button>

                          {/* ================= DELETE BUTTON ================= */}
                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition"
                            title="Delete"
                          >

                            <Trash2 size={16} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* ================= BACK BUTTON ================= */}
        <button
          onClick={() => navigate("/register")}
          className="mt-5 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
        >

          <ArrowLeft size={16} />

          Back to Registration

        </button>

      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingData && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">

          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold text-white">
                  Edit Registration
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Update the registration details
                </p>

              </div>

              {/* Close */}
              <button
                onClick={() => setEditingData(null)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white transition"
              >

                <X size={19} />

              </button>

            </div>

            {/* ================= EDIT FORM ================= */}
            <div className="space-y-4">

              {/* Name */}
              <div>

                <label className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={editingData.name || ""}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
                />

              </div>

              {/* Email */}
              <div>

                <label className="block text-sm text-slate-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={editingData.email || ""}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
                />

              </div>

              {/* Phone */}
              <div>

                <label className="block text-sm text-slate-300 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={editingData.phone || ""}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
                />

              </div>

              {/* Course */}
              <div>

                <label className="block text-sm text-slate-300 mb-2">
                  Course
                </label>

                <select
                  name="course"
                  value={editingData.course || ""}
                  onChange={handleEditChange}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition"
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

              </div>

              {/* ================= SAVE BUTTON ================= */}
              <button
                onClick={handleSave}
                className="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition"
              >

                <Save size={17} />

                Save Changes

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default RegistrationTable;