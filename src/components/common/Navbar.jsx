import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

function Navbar() {
  const [error, setError] = useState(null);

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-1 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-bold text-gray-800">
          Kittens Blog
        </Link>
        <Link to="/posts" className="text-gray-600">
          Posts
        </Link>
        <Link to="/auth/register" className="text-gray-600">
          Register
        </Link>
        <Link to="/auth/login" className="text-gray-600">
          Login
        </Link>
      </div>
      <LogoutButton setError={setError} />
      {error && <ErrorMessage message={error} />}
    </nav>
  );
}

export default Navbar;
