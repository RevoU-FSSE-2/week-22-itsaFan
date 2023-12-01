import { useState } from "react";
import RequestResetPasswordForm from "../components/forms/req-reset-pasw";
import { reqResetPaswApi } from "../api/auth-api";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reqResetPaswApi(email);
      message.config({
        top: 120,
      });
      message.success("Request Reset Password Has Been Sent to Your Email");
      setTimeout(() => {
        navigate("/");
      }, 1250);
    } catch (error) {
      console.error("Request Reset Password:", error.response?.data || error.message);
      setError(error.response?.data.message);
    }
  };

  return <RequestResetPasswordForm setEmail={setEmail} email={email} onSubmit={handleSubmit} error={error} />;
}
