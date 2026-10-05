import { div } from "motion/react-client";
import { useState } from "react";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    passowrd: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border border-gray-700 p-6"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded border bg-black p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border bg-black p-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded border bg-black p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-white p-3 text-black"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};
