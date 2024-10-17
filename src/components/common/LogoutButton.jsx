import { useNavigate } from "react-router-dom";
import { postRequestLogout } from "../../utils/api";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async (setError) => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
    try {
      await postRequestLogout();

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      navigate("/auth/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default LogoutButton;
