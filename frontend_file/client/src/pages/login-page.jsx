import { Card } from "flowbite-react";
import LoginForm from "../components/forms/login-form";
import { useState } from "react";
import { loginApi } from "../api/auth-api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const  [ error, setError ] = useState('');
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const accessToken = await loginApi(identifier, password)
      // console.log("Login successful. Access Token:", accessToken);
      localStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken)
      navigate('/dashboard')
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      setError(error.response?.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="dark:bg-main-dark dark:border-none">
      <p className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Login</p>
      <LoginForm
      identifier={identifier}
      setIdentifier={setIdentifier}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
       />
    </Card>
  );
}
