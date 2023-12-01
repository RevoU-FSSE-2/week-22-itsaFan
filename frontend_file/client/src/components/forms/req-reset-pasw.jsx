/* eslint-disable react/prop-types */
import { TextInput } from "flowbite-react";
import classes from "./css/form.module.css";
import { emailSchema } from "./validation/auth-schema";
import { useState } from "react";

export default function RequestResetPasswordForm({ email, setEmail, onSubmit, error }) {
  const [validationErrors, setValidationErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    try {
      emailSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, email: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, email: error.message });
    }
  };

  const isNoEmail = error === "No email found";

  return (
    <div className="flex items-center justify-center h-80">
      <div className={`${classes.subscribe} bg-white dark:bg-gray-800 `}>
        <p className="text-xs text-gray-900 dark:text-white mb-3">Request Reset Password</p>
        <form onSubmit={onSubmit}>
          <TextInput
            color={validationErrors.email || isNoEmail ? "failure" : "success"}
            helperText={validationErrors.email ? <span className="font-medium text-sm flex">{validationErrors.email}</span> : isNoEmail ? <span className="font-medium text-sm flex">Email not found</span> : undefined}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Input your email"
            required
          />
          <br />
          <button type="submit" className={`${classes.submitBtn} bg-sky-600 hover:bg-sky-900`}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
