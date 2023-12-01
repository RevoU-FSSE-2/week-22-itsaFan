import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/auth-api";
import { LOCAL_STORAGE_PREFIX } from "../../utils/localStorage-prefix";

export default function LogoutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem("accessToken");

      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key.startsWith(LOCAL_STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      }

      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout:", error.response?.data || error.message);
    }
  };

  return (
    <div role="button" onClick={handleLogout} tabIndex={0}>
      Logout
    </div>
  );
}
