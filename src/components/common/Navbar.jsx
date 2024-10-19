import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const [error, setError] = useState(null);
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const togglePostsMenu = () => setIsPostsOpen(!isPostsOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);

  return (
    <nav className="bg-white shadow-md rounded-lg p-4 mb-1 flex justify-between items-center">
      <div className="flex gap-5 items-center space-x-4">
        <Link to="/" className="text-lg font-bold text-gray-800">
          Kittens Blog
        </Link>
        <div className="flex space-x-4">
          <div className="relative">
            <button
              onClick={togglePostsMenu}
              className="text-gray-800 font-semibold focus:outline-none"
            >
              Posts
            </button>
            {isPostsOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                <Link
                  to="/posts"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  All Posts
                </Link>
                <Link
                  to="/posts/create"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Create Post
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleAccountMenu}
              className="text-gray-800 font-semibold focus:outline-none"
            >
              Account
            </button>
            {isAccountOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                <Link
                  to="/auth/register"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Register
                </Link>
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/auth/update-role"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Update Role
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutButton setError={setError} />
      {error && <ErrorMessage message={error} />}
    </nav>
  );
}

export default Navbar;
