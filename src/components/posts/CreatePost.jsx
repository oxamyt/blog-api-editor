import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import ErrorMessage from "../common/ErrorMessage";
import FormInput from "../common/FormInput";
import { postRequestCreatePost } from "../../utils/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, content };

    try {
      const token = localStorage.getItem("token");
      const responseData = await postRequestCreatePost(data, token);

      setError(null);
      setTitle("");
      setContent("");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create a New Post
        </h2>

        {success && (
          <div className="flex items-center justify-center mb-4 text-green-500">
            <AiOutlineCheckCircle className="w-6 h-6 mr-2" />
            <p>Post created successfully!</p>
          </div>
        )}

        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          className="mb-4"
        />

        <p className="block text-sm font-medium text-gray-700 mb-2">Content:</p>
        <textarea
          minLength="3"
          className="w-full h-40 mb-6 p-4 border border-gray-300 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="w-full border-2 border-transparent bg-stone-950 text-white no-underline font-bold hover:bg-stone-100 hover:border-black hover:text-black transition duration-300 py-2 px-4 rounded">
          Create Post
        </button>

        {error && <ErrorMessage message={error} />}
      </form>
    </div>
  );
}

export default CreatePost;
