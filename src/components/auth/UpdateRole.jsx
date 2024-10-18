import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import ErrorMessage from "../common/ErrorMessage";
import { postRequestUpdateRole } from "../../utils/api";

function UpdateRole() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { password };
    const token = localStorage.getItem("token");

    try {
      const responseData = await postRequestUpdateRole(data, token);

      setError(null);

      setPassword("");
      localStorage.setItem("token", responseData.token);
      navigate("/posts");
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
          Update Role
        </h1>
        {error && <ErrorMessage message={error} />}
        <FormInput
          label="Admin Password"
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
          Update Role
        </button>
      </form>
    </div>
  );
}

export default UpdateRole;
