"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function registerUser(e) {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) { alert("Register berhasil!");
    window.location.href = "/login";
    }
  }

  return (
    <div className="flex w-screen h-screen">
      {/* LEFT PANEL FORM */}
      <div className="w-1/2 bg-white flex flex-col px-20 py-10 relative">

        {/* BACK BUTTON */}
        <Link href="/" className="text-[#4A92CD] flex items-center gap-1 text-sm mb-6">
          ← Back
        </Link>

        <form onSubmit={registerUser} className="mt-10">
          <h1 className="text-3xl font-bold mb-2 text-black">Create Account</h1>
          <p className="mb-8 text-black">welcome! select method to sign up:</p>

          {/* Username */}
          <div className="border-2 border-gray-300 rounded-xl w-full h-12 flex items-center px-4 mb-5 text-gray-400 font-semibold">
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="border-2 border-gray-300 rounded-xl w-full h-12 flex items-center px-4 mb-5 text-gray-400 font-semibold">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="border-2 border-gray-300 rounded-xl w-full h-12 flex items-center px-4 mb-8 text-gray-400 font-semibold">
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#4A92CD] text-white rounded-xl font-medium hover:bg-[#153C56] transition"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-gray-500 text-sm">
            Already have Account?
            <Link href="/login" className="text-[#4A92CD] ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT PANEL IMAGE */}
      <div className="w-1/2 h-full bg-black">
        <img
          src="/sarpras.jpeg"
          className="w-full h-full object-cover brightness-50"
          alt="background"
        />
      </div>
    </div>
  );
}
