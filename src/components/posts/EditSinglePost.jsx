import {
  getSinglePostRequest,
  putRequestUpdatePublishedState,
} from "../../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import ErrorMessage from "../common/ErrorMessage";
import FormInput from "../common/FormInput";

function EditSinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingMode, setEditingMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchSinglePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const responseData = await getSinglePostRequest(id, token);
      setPost(responseData);
      setEditedTitle(responseData.title);
      setEditedContent(responseData.content);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditingMode(!editingMode);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedPost = { title: editedTitle, content: editedContent };
      await putRequestUpdatePublishedState(id, updatedPost, token);
      setPost((prevPost) => ({ ...prevPost, ...updatedPost }));
      setEditingMode(!editingMode);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelClick = () => {
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditingMode(false);
  };

  useEffect(() => {
    fetchSinglePost();
  }, [id]);

  const renderPost = () => {
    if (!post) {
      return <p className="text-red-500">Post not found.</p>;
    }

    return (
      <div className="md:w-6/12 w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-5 mb-4">
          {editingMode ? (
            <input
              minLength="3"
              maxLength="30"
              className="text-2xl font-bold w-full mb-2 p-2 border border-gray-300 rounded"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h2 className="text-4xl font-bold">{post.title}</h2>
          )}

          <button
            onClick={handleEditClick}
            className="text-gray-500 hover:text-gray-900"
          >
            <FaEdit className="w-6 h-6" />
          </button>
        </div>

        {editingMode ? (
          <textarea
            className="w-full mb-4 p-4 border border-gray-300 rounded"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="text-gray-700 text-center text-xl mb-6">
            {post.content}
          </p>
        )}

        {editingMode && (
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancelClick}
              className="text-white bg-gray-500 py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              className="text-white bg-blue-500 py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 bg-gray-100 rounded-md shadow-sm"
              >
                <h1>{comment.content}</h1>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {renderPost()}
    </div>
  );
}

export default EditSinglePost;
