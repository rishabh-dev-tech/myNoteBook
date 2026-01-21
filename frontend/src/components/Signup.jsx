import { useState } from "react";
import { BaseUrl } from "../BaseUrls";
import { ErrorEmitter, SuccessEmitter } from "../ToastEmitter";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    if (!name || !email || !type || !password) {
      return ErrorEmitter("All fields are required");
    }

    try {
      const res = await fetch(`${BaseUrl}/api/v3.2/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, type, password })
      });

      const data = await res.json();

      if (!data.success) {
        return ErrorEmitter(data.message);
      }

      SuccessEmitter(data.message);

      // Clear form
      setName("");
      setEmail("");
      setType("");
      setPassword("");

      // Navigate to login page
      navigate("/login");

    } catch (error) {
      console.error("Signup Error:", error);
      ErrorEmitter("Server not reachable");
    }
  }

  return (
    <div className="flex flex-col items-center py-8 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:text-gray-800">
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block dark:text-gray-600">
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 outline-none border rounded-md dark:border-gray-300 dark:text-gray-800 focus:dark:border-rose-600"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block dark:text-gray-600">
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 outline-none border rounded-md dark:border-gray-300 dark:text-gray-800 focus:dark:border-rose-600"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="type" className="block dark:text-gray-600">
              Account Type <span className="text-rose-500">*</span>
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 outline-none border rounded-md dark:border-gray-300 dark:text-gray-800 focus:dark:border-rose-600"
            >
              <option value="">Select account type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 outline-none border rounded-md dark:border-gray-300 dark:text-gray-800 focus:dark:border-rose-600"
            />
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-rose-600"
          >
            Sign up
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-xs dark:text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="underline dark:text-gray-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
