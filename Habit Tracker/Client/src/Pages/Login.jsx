import { div } from "motion/react-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Login Failed");
        return;
      }
      setMessage("Login successful");

      navigate("/");
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
        <h1 className="text-2xl font-bold">Login</h1>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  );
};
