/* eslint-disable react/prop-types */
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiUser, HiOutlineEye, HiOutlineLockClosed, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { passwordSchema } from "./validation/auth-schema";

export default function LoginForm({ identifier, setIdentifier, password, setPassword, onSubmit, error, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      passwordSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, password: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, password: error.message });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const isWrongPassword = error === "Wrong password";
  const isNoIdentifier = error === "Username or Email not found";
  const isLockedOut = error === "You have been locked out because this account has attempted to login too many times. Please try again in 15 minutes.";

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      {isLockedOut && <p className="text-red-500 mt-2">Too many failed login, try again in 15minutes </p>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="identifier" value="Email or Username" />
        </div>
        <TextInput
          color={isNoIdentifier ? "failure" : undefined}
          helperText={isNoIdentifier ? <span className="font-medium">Username or Email not found</span> : undefined}
          type="text"
          icon={HiUser}
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          shadow
        />
      </div>
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <div className="relative">
          <TextInput
            color={isWrongPassword || validationErrors.password ? "failure" : undefined}
            helperText={isWrongPassword ? <span className="font-medium">Wrong Password</span> : validationErrors.password ? <span className="font-medium">{validationErrors.password}</span> : undefined}
            type={showPassword ? "text" : "password"}
            icon={HiOutlineLockClosed}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            shadow
          />
          {isWrongPassword || validationErrors.password ? (
            <div className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility}>
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          ) : (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={togglePasswordVisibility}>
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Link to="/forgot-password" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
          Lost Password?
        </Link>
      </div>
      <div className="mb-2 my-5 flex justify-center">
        <Button size="lg" type="submit" className="px-28" gradientDuoTone="purpleToBlue">
          {loading ? <Spinner aria-label="Login Loading" size="md" className="mx-2" /> : <span>Login</span>}
        </Button>
      </div>
    </form>
  );
}
