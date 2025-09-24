import { useState } from "react";
import LoginForm from "./LoginForm";
import DialogBox from "./DialogBox";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAzureAuth } from "../../hooks/useAzureAuth";
import { useAuthStore } from "../../hooks/useAuthStore";

export default function Login() {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [errors, setErrors] = useState({});
  const [dialog, setDialog] = useState({ isOpen: false, message: "" });

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const { login: azureLogin } = useAzureAuth();
  const { user } = useAuthStore();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length < 5) return "Email must be at least 5 characters.";
    if (email.length > 30) return "Email must not exceed 30 characters.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (password) =>
    !password.trim() ? "Password is required." : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "Email")
      setErrors((prev) => ({ ...prev, Email: validateEmail(value) }));
    else if (name === "Password")
      setErrors((prev) => ({ ...prev, Password: validatePassword(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.Email);
    const passwordError = validatePassword(formData.Password);

    if (emailError || passwordError) {
      setErrors({ Email: emailError, Password: passwordError });
      return;
    }

    setErrors({});
    loginMutation.mutate(formData, {
      onSuccess: () => {
        setDialog({ isOpen: true, message: "Login successful!" });
        setFormData({ Email: "", Password: "" });
        setTimeout(() => navigate("/home"), 1000);
      },
      onError: () =>
        setDialog({ isOpen: true, message: "Login failed. Please try again." }),
    });
  };

  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        formData={formData}
      />
      <div className="flex justify-center mt-4">
        <button
          onClick={azureLogin}
          className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Sign in with Microsoft
        </button>
        t
      </div>

      <DialogBox
        isOpen={dialog.isOpen}
        message={dialog.message}
        onClose={() => setDialog({ isOpen: false, message: "" })}
      />
    </>
  );
}
