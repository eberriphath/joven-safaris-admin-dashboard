import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
const { token } = useParams();

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();


setError("");
setMessage("");

if (password !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

if (password.length < 8) {
  setError("Password must be at least 8 characters.");
  return;
}

setLoading(true);

try {
  const response = await api.post(
    `/admin/reset-password/${token}`,
    {
      password,
    }
  );

  setMessage(
    response.data.message ||
      "Password reset successfully."
  );

  setTimeout(() => {
    navigate("/");
  }, 2000);

} catch (err) {
  setError(
    err.response?.data?.error ||
      "Unable to reset password. The link may have expired."
  );
} finally {
  setLoading(false);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
  >

    <h1 className="text-2xl font-bold mb-2 text-center">
      Reset Password
    </h1>

    <p className="text-gray-500 text-sm text-center mb-6">
      Enter your new admin password below.
    </p>

    {error && (
      <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
        {error}
      </div>
    )}

    {message && (
      <div className="bg-green-50 text-green-600 text-sm p-3 rounded mb-4">
        {message}
      </div>
    )}

    <input
      type="password"
      placeholder="New password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 border rounded mb-4"
      required
    />

    <input
      type="password"
      placeholder="Confirm new password"
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(e.target.value)
      }
      className="w-full p-3 border rounded mb-6"
      required
    />

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        bg-blue-600
        text-white
        p-3
        rounded
        hover:bg-blue-700
        disabled:opacity-50
      "
    >
      {loading ? "Resetting..." : "Reset Password"}
    </button>

  </form>

</div>

);
}

export default ResetPassword;
