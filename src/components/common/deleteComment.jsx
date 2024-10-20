import { deleteRequestComment } from "../../utils/api";
import PropTypes from "prop-types";

function DeleteComment({ id, commentId, onCommentDeleted }) {
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      await deleteRequestComment(id, commentId, token);
      onCommentDeleted();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button
      onClick={() => handleDeleteComment(commentId)}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
    >
      Delete
    </button>
  );
}

DeleteComment.propTypes = {
  id: PropTypes.string.isRequired,
  commentId: PropTypes.number.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};

export default DeleteComment;
