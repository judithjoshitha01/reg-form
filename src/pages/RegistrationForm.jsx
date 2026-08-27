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

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingData =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const newRegistration = {
      id: Date.now(),
      ...formData,
    };

    localStorage.setItem(
      "registrations",
      JSON.stringify([...existingData, newRegistration])
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
    });

    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-3 sm:p-5 md:p-8">

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col md:flex-row">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative md:w-[45%] bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 p-6 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">

          {/* Background Decorations */}
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-400/5 rounded-full -top-24 sm:-top-28 md:-top-32 -right-24 sm:-right-28 md:-right-32" />

          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-indigo-400/5 rounded-full -bottom-20 sm:-bottom-24 -left-20 sm:-left-24" />

          {/* Main Text */}
          <div className="relative z-10 mt-2 sm:mt-4 md:mt-8">

            <p className="text-blue-300 text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">
              WELCOME
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Create your
              <br />
              registration.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base mt-4 sm:mt-6 max-w-sm leading-relaxed">
              Join our community by completing the registration form.
              Your details are securely saved for easy access.
            </p>

          </div>

          {/* Bottom Text */}
          <div className="relative z-10 mt-8 sm:mt-10 md:mt-12">

            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />

              <span className="text-slate-200 text-xs sm:text-sm">
                Quick & simple registration
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />

              <span className="text-slate-200 text-xs sm:text-sm">
                Your details are saved securely
              </span>
            </div>

            <p className="text-slate-500 text-xs mt-6 sm:mt-8">
              © 2026 Registration Portal
            </p>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="md:w-[55%] bg-slate-900 p-6 sm:p-8 md:p-12 flex items-center">

          <div className="w-full max-w-lg mx-auto">

            {/* Form Header */}
            <div className="mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Registration Form
              </h2>

              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Enter your details below to get started.
              </p>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4"
            >

              {/* Full Name */}
              <div>

                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#1e293b] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  />

                </div>
              </div>

              {/* Email */}
              <div>

                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#1e293b] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>

                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#1e293b] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  />

                </div>
              </div>

              {/* Course */}
              <div>

                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Course
                </label>

                <div className="relative">

                  <BookOpen
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />

                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-slate-800 border border-slate-700 text-white rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#1e293b] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
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
                className="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition duration-200"
              >
                <UserPlus size={17} />
                Register Now
              </button>

            </form>

          </div>
        </div>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">

          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-center shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-slate-500 hover:bg-slate-800 hover:text-white transition"
            >
              <X size={19} />
            </button>

            {/* Success Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle
                size={32}
                className="text-emerald-400"
              />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Registration Successful!
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-2 mb-5 sm:mb-6">
              Your details have been saved successfully.
            </p>

            {/* View Registrations */}
            <button
              onClick={() => navigate("/registrations")}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-xl text-sm shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition"
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