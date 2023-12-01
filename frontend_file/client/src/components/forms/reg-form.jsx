/* eslint-disable react/prop-types */
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { HiUser, HiOutlineEye, HiMail, HiOutlineLockClosed, HiOutlineEyeOff } from "react-icons/hi";
import { useState } from "react";
import { emailSchema, passwordSchema } from "./validation/auth-schema";

export default function RegForm({ username, setUsername, email, setEmail, password, setPassword, onSubmit, error, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    try {
      emailSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, email: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, email: error.message });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      passwordSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, password: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, password: error.message });
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: "Passwords do not match",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRePassword((prevState) => !prevState);
  };

  const isTaken = error === "Username already taken";

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Username" />
        </div>
        <TextInput
          color={isTaken ? "failure" : undefined}
          helperText={isTaken ? <span className="font-medium">Username already taken</span> : undefined}
          type="text"
          icon={HiUser}
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email Address" />
        </div>
        <TextInput
          color={validationErrors.email ? "warning" : undefined}
          helperText={validationErrors.email ? <span className="font-medium">{validationErrors.email}</span> : undefined}
          type="email"
          icon={HiMail}
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <div className="relative">
          <TextInput
            color={validationErrors.password ? "failure" : undefined}
            helperText={validationErrors.password ? <span className="font-medium">{validationErrors.password}</span> : undefined}
            type={showPassword ? "text" : "password"}
            icon={HiOutlineLockClosed}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            shadow
          />
          {validationErrors.password ? (
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeatPassword" value="Repeat Password" />
        </div>
        <div className="relative">
          <TextInput
            color={validationErrors.repeatPassword ? "failure" : undefined}
            helperText={validationErrors.repeatPassword ? <span className="font-medium">{validationErrors.repeatPassword}</span> : undefined}
            type={showRePassword ? "text" : "password"}
            icon={HiOutlineLockClosed}
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
            shadow
          />
          {validationErrors.repeatPassword ? (
            <div className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleRepeatPasswordVisibility}>
              {showRePassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          ) : (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400" onClick={toggleRepeatPasswordVisibility}>
              {showRePassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          )}
        </div>
      </div>
      <div className="mb-2 my-5 flex justify-center">
        <Button size="lg" type="submit" className="px-28" gradientDuoTone="purpleToBlue">
          {loading ? <Spinner aria-label="Register loading" size="md" className="mx-4" /> : <span>Register</span>}
        </Button>
      </div>
    </form>
  );
}
