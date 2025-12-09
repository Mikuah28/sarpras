"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function loginUser(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res.error) {
    alert("Email atau password salah!");
    return;
  }


  const sessionRes = await fetch("/api/auth/session");
  const session = await sessionRes.json();

  const role = session?.user?.role;

  if (role === "admin") {
    window.location.href = "/admin";
  } else {
    window.location.href = "/home";
  }
  }

  return (
    <div className="flex w-screen h-screen">
      {/* LEFT PANEL */}
      <div className="w-1/2 bg-white flex flex-col px-20 py-10 relative">

        <Link href="/" className="text-[#4A92CD] flex items-center gap-1 text-sm mb-6">
          ← Back
        </Link>

        <form onSubmit={loginUser} className="mt-10">
          <h1 className="text-3xl font-bold mb-2 text-black">Welcome Back</h1>
          <p className="mb-8 text-black">Please login to continue</p>

          <div className="border-2 border-gray-300 rounded-xl w-full h-12 flex items-center px-4 mb-5 text-gray-400 font-semibold">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="border-2 border-gray-300 rounded-xl w-full h-12 flex items-center px-4 mb-8 text-gray-400 font-semibold">
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#4A92CD] text-white rounded-xl font-medium hover:bg-[#153C56] transition"
          >
            Login
          </button>

          <p className="text-center mt-4 text-gray-500 text-sm">
            Don’t have an account?
            <Link href="/register" className="text-[#4A92CD] ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 h-full bg-black">
        <img
          src="/sarpras.jpeg"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
    </div>
  );
}
