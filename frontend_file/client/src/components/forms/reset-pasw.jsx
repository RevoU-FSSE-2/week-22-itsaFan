/* eslint-disable react/prop-types */
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiOutlineEye, HiOutlineLockClosed, HiOutlineEyeOff } from "react-icons/hi";
import { passwordSchema } from "./validation/auth-schema";

export default function ResetPasswordForm({ onSubmit, password, setPassword, error }) {
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRePassword, setShowRePassword] = useState(false);

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

  const isInvalidToken = error === "Invalid or expired reset token";

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      {isInvalidToken && <p className="text-red-500 mt-2 font-medium">Token expired</p>}
      <div className="mb-5">
        <div className="mb-2 block">
          <Label htmlFor="password" value="New Password" />
        </div>
        <div className="relative">
          <TextInput
            color={isInvalidToken || validationErrors.password ? "failure" : undefined}
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
          Submit
        </Button>
      </div>
    </form>
  );
}
