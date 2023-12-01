import { Card } from "flowbite-react";
import RegForm from "../components/forms/reg-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth-api";
import { message } from "antd";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await registerApi(username, email, password);
      message.config({
        top: 150,
      });
      message.success("Register Success!");
      setTimeout(() => {
        navigate("/login");
      }, 1250);
    } catch (error) {
      console.error("Register failed:", error.response?.data || error.message);
      setError(error.response?.data.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Card className="dark:bg-main-dark dark:border-none">
        <p className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Register</p>
        <RegForm 
          username={username} 
          setUsername={setUsername} 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          onSubmit={handleSubmit} 
          error={error}
          loading={loading} />
      </Card>
    </>
  );
}
