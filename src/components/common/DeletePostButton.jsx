import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { deleteRequestPost } from "../../utils/api";

function DeletePostButton({ postId, refreshPosts }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteRequestPost(postId, token);
      refreshPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition duration-300"
      title="Delete Post"
    >
      <FaTrash className="w-6 h-6" />
    </button>
  );
}

export default DeletePostButton;

DeletePostButton.propTypes = {
  postId: PropTypes.number.isRequired,
  refreshPosts: PropTypes.func.isRequired,
};
