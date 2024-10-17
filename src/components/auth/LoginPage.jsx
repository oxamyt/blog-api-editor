import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../common/FormInput";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          className="mb-4"
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          className="mb-4"
        />
        <button
          type="submit"
          className="w-full text-white border-2 border-transparent bg-stone-900 font-bold  py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        <Link
          to="/auth/register"
          className="text-stone-900 no-underline font-bold"
        >
          Don't have an account? Register here.
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
