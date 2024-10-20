import { Link } from "react-router-dom";

function Homepage() {
  const username = localStorage.getItem("username");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-3xl p-5 font-bold text-gray-800 mb-4">
          Welcome to Kitten's Digital Minimalism Admin Panel!
        </h1>
        {username ? (
          <>
            <h2 className="text-stone-900 text-2xl no-underline font-bold">
              Welcome back, <span className="font-semibold">{username}</span>!
            </h2>
            <button className="mt-6 p-2 m-2 text-white border-2 border-transparent bg-stone-900 font-bold py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300">
              <Link to="/posts/">Get into admin panel</Link>
            </button>
          </>
        ) : (
          <Link
            to="/auth/login"
            className="mt-6 p-5 m-2 text-white border-2 border-transparent bg-stone-900 font-bold py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300"
          >
            Please Login First
          </Link>
        )}
      </div>
    </div>
  );
}

export default Homepage;
