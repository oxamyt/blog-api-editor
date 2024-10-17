import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostsRequest } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
const API_URL = import.meta.env.VITE_API_URL;

function Posts() {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");

    try {
      const responseData = await getPostsRequest(`${API_URL}/posts`, token);

      setResponseData(responseData);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPosts = () => {
    if (responseData.length === 0 && error === null) {
      return <p className="text-gray-600">No posts available.</p>;
    }

    return responseData.map((post) => (
      <Link
        key={post.id}
        to={`/posts/${post.id}`}
        className="block bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105"
      >
        <h1 className="text-gray-600 font-bold md:text-4xl sm:text-2xl mb-4">
          {post.title}
        </h1>
        <span className="text-l text-gray-500">Edit Inside →</span>
      </Link>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <ErrorMessage message={error} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {renderPosts()}
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;
