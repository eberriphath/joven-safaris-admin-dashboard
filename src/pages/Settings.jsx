import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";

function Settings() {

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const token = localStorage.getItem("adminToken");

            const res = await api.put(
                "/admin/change-password",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(res.data.message);

            setFormData({
                current_password: "",
                new_password: "",
                confirm_password: ""
            });

        }

        catch (err) {

            setError(
                err.response?.data?.error ||
                "Something went wrong."
            );

        }

    }

    return (

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-6">
                Change Password
            </h1>

            {message && (

                <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                    {message}
                </div>

            )}

            {error && (

                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                    {error}
                </div>

            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Current Password */}

                <div className="relative">

                    <input
                        type={showCurrentPassword ? "text" : "password"}
                        name="current_password"
                        placeholder="Current Password"
                        value={formData.current_password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 pr-12"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showCurrentPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>

                </div>

                {/* New Password */}

                <div className="relative">

                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="new_password"
                        placeholder="New Password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 pr-12"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowNewPassword(!showNewPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showNewPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>

                </div>

                {/* Confirm Password */}

                <div className="relative">

                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 pr-12"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>

                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition"
                >
                    Update Password
                </button>

            </form>

        </div>

    );

}

export default Settings;