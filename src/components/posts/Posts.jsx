import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPostsRequest, postUserRequest } from "../../utils/api";
import ErrorMessage from "../common/ErrorMessage";
import ChangePublishedStateButton from "../common/ChangePublishedStateButton";
import DeletePostButton from "../common/DeletePostButton";
import { FaEdit } from "react-icons/fa"; // Example icon

const API_URL = import.meta.env.VITE_API_URL;

function Posts() {
  const [responseData, setResponseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const responseData = await postUserRequest(token);

      if (responseData.user.role !== "ADMIN") {
        setError("You are not an admin.");
        setLoading(false);
        return;
      }

      fetchPosts();
    } catch (error) {
      console.log("Error in checkUser:", error);
      setError(error.message);
      setLoading(false);
    }
  };

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
    checkUser();
  }, []);

  const updatePostState = (postId) => {
    setResponseData((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isPublished: !post.isPublished } : post
      )
    );
  };

  const renderPosts = () => {
    if (responseData.length === 0 && error === null) {
      return <p className="text-gray-600">No posts available.</p>;
    }

    return responseData.map((post) => (
      <div
        key={post.id}
        className="block bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105"
      >
        <h1 className="text-gray-600 font-bold md:text-4xl sm:text-2xl mb-4">
          {post.title}
        </h1>
        {post.isPublished ? (
          <h1 className="text-green-500">Published</h1>
        ) : (
          <h1 className="text-red-500">Not Published</h1>
        )}
        <ChangePublishedStateButton
          state={post.isPublished ? "Unpublished" : "Published"}
          postId={post.id}
          refreshPosts={() => updatePostState(post.id)}
        />
        <Link
          to={`/posts/${post.id}`}
          className="flex items-center mt-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaEdit className="mr-1 w-5 h-5" /> {/* Icon with a size */}
          Edit
        </Link>
        <DeletePostButton postId={post.id} refreshPosts={fetchPosts} />
      </div>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <>
          <ErrorMessage message={error} />
          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {renderPosts()}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Posts;
