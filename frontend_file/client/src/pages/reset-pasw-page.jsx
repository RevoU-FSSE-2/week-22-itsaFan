import { useState } from "react";
import { resetPaswApi } from "../api/auth-api";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ResetPasswordForm from "../components/forms/reset-pasw";
import { Card } from "flowbite-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const token = new URL(window.location).searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPaswApi(token, password);
      message.config({
        top: 150,
      });
      message.success("Reset Password Success!");
      setTimeout(() => {
        navigate("/login");
      }, 1250);
    } catch (error) {
      console.error("Reset Password failed:", error.response?.data || error.message);
      setError(error.response?.data.message);
    }
  };

  return (
    <>
      <Card className="dark:bg-main-dark dark:border-none">
        <p className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Reset Password</p>
        <ResetPasswordForm error={error} onSubmit={handleSubmit} password={password} setPassword={setPassword} />
      </Card>

      {/* <form onSubmit={handleSubmit}>
      <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Reset</button>
    </form> */}
    </>
  );
}
