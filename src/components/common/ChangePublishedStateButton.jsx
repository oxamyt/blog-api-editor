import { patchRequestUpdatePublishedState } from "../../utils/api";
import PropTypes from "prop-types";

function ChangePublishedStateButton({ state, postId, refreshPosts }) {
  const handleChange = async () => {
    const token = localStorage.getItem("token");

    try {
      await patchRequestUpdatePublishedState(token, postId);
      refreshPosts();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleChange}
        className=" text-white border-2 border-transparent bg-stone-900 font-bold  py-2 rounded-lg hover:bg-stone-100 hover:border-2 hover:border-black hover:text-black transition duration-300"
      >
        Change to {state}
      </button>
    </>
  );
}

ChangePublishedStateButton.propTypes = {
  state: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  refreshPosts: PropTypes.func.isRequired,
};

export default ChangePublishedStateButton;
