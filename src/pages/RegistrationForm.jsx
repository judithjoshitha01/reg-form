import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Phone,
  User,
  BookOpen,
  CheckCircle,
  X,
} from "lucide-react";

function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    console.log("Saved to MongoDB:", data);

    setShowSuccess(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
    });
  } catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed. Check backend.");
  }
};

      

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl min-h-[650px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative md:w-[45%] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-12 flex flex-col justify-between overflow-hidden">

          {/* Background Decorations */}
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-32 -right-32" />

          <div className="absolute w-56 h-56 bg-purple-400/10 rounded-full -bottom-24 -left-24" />

          {/* Main Text */}
          <div className="relative z-10 mt-4 md:mt-8">

            <p className="text-indigo-100 text-sm font-semibold tracking-widest mb-4">
              WELCOME
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Create your
              <br />
              registration.
            </h1>

            <p className="text-indigo-100 mt-6 max-w-sm leading-relaxed">
              Join our community by completing the registration form.
              Your details are securely saved for easy access.
            </p>

          </div>

          {/* Bottom Text */}
          <div className="relative z-10 mt-12">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-white" />

              <span className="text-white text-sm">
                Quick & simple registration
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-white" />

              <span className="text-white text-sm">
                Your details are saved securely
              </span>
            </div>

            <p className="text-indigo-200 text-xs mt-8">
              © 2026 Registration Portal
            </p>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="md:w-[55%] bg-slate-950 p-7 md:p-12 flex items-center">

          <div className="w-full max-w-lg mx-auto">

            {/* Form Header */}
            <div className="mb-8">

              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Registration Form
              </h2>

              <p className="text-slate-400 mt-2">
                Enter your details below to get started.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />

                </div>
              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900 border border-slate-800 text-white placeholder:text-slate-600 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition"
                  />

                </div>
              </div>

              {/* Course */}
              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Course
                </label>

                <div className="relative">

                  <BookOpen
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-slate-900 border border-slate-800 text-white rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
                  >

                    <option value="">
                      Select a course
                    </option>

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
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition duration-200"
              >
                <UserPlus size={18} />
                Register Now
              </button>

            </form>

          </div>
        </div>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-5">

          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-7 text-center shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-500 hover:bg-slate-800 hover:text-white transition"
            >
              <X size={19} />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle
                size={34}
                className="text-emerald-400"
              />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Registration Successful!
            </h2>

            <p className="text-slate-400 mt-2 mb-6">
              Your details have been saved successfully.
            </p>

            {/* View Registrations */}
            <button
              onClick={() => navigate("/registrations")}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition"
            >
              View Registrations
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default RegistrationForm;