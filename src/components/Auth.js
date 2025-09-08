import React, { useState } from "react";
import API from "../api";
import { LogIn, UserPlus } from "lucide-react";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true); // toggle between login & register
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login API
        const res = await API.post("/users/login", {
          email: form.email,
          password: form.password,
        });
        setUser(res.data);
        alert("Login success");
      } else {
        // Register API
        const res = await API.post("/users/register", form);
        alert("Registered: " + res.data.name);
        setIsLogin(true); // go back to login after successful register
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        {isLogin ? (
          <>
            <LogIn className="w-6 h-6 text-indigo-600" /> Login
          </>
        ) : (
          <>
            <UserPlus className="w-6 h-6 text-green-600" /> Register
          </>
        )}
      </h2>

      <form onSubmit={submit} className="space-y-4">
        {!isLogin && (
          <input
            required
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className={`w-full ${
            isLogin ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded-lg transition`}
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        {isLogin ? (
          <>
            New user?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-green-600 font-semibold hover:underline"
            >
              Register here
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login here
            </button>
          </>
        )}
      </p>
    </div>
  );
}
