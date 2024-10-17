import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../common/FormInput";
import ErrorMessage from "../common/ErrorMessage";
import { postRequest } from "../../utils/api";
const API_URL = import.meta.env.VITE_API_URL;

function RegisterPage() {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const data = { username, password, confirmPassword };

    try {
      const responseData = await postRequest(`${API_URL}/auth/register`, data);

      setResponseData(responseData);
      setError(null);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Account
        </h1>
        {error && <ErrorMessage message={error} />}
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
        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="confirmPassword"
          className="mb-4"
        />
        <button
          type="submit"
          className="w-full text-white border-2 border-transparent bg-stone-900 font-bold  py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300"
        >
          Submit
        </button>
      </form>

      {responseData && error === null && (
        <section className="mt-4 p-4 bg-stone-900 text-green-800 rounded-lg">
          <h2 className="text-lg text-center text-white font-semibold">
            User Registered Successfully
          </h2>
          <p className="mt-4">
            <Link
              to="/auth/login"
              className="inline-block w-full rounded-lg bg-stone-100  font-bold text-black text-center py-2  transition duration-300"
            >
              Go to Login
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}

export default RegisterPage;
