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


////////////////////////////////////////////////////////////////

return (

    <div
        className="
        min-h-screen
        bg-[#FAF6EE]
        p-6
        "
    >

        <div
            className="
            w-full
            max-w-xl
            mx-auto
            bg-white
            rounded-xl
            shadow-md
            border
            border-[#E8DCC5]
            p-5
            md:p-8
            "
        >

            <h1
                className="
                text-2xl
                md:text-3xl
                font-serif
                font-bold
                mb-6
                text-[#2C1810]
                "
            >
                Change Password
            </h1>


            {message && (

                <div
                    className="
                    bg-[#EAF3E5]
                    text-[#2D5016]
                    p-3
                    rounded-lg
                    mb-4
                    "
                >
                    {message}
                </div>

            )}


            {error && (

                <div
                    className="
                    bg-[#FDECEC]
                    text-[#8B2E2E]
                    p-3
                    rounded-lg
                    mb-4
                    "
                >
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
                        className="
                        w-full
                        border
                        border-[#E8DCC5]
                        rounded-lg
                        px-4
                        py-3
                        pr-12
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#C4873A]
                        "
                    />


                    <button
                        type="button"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#6B5744]
                        hover:text-[#2C1810]
                        "
                    >

                        {showCurrentPassword ? (
                            <EyeOff size={20}/>
                        ) : (
                            <Eye size={20}/>
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
                        className="
                        w-full
                        border
                        border-[#E8DCC5]
                        rounded-lg
                        px-4
                        py-3
                        pr-12
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#C4873A]
                        "
                    />


                    <button
                        type="button"
                        onClick={() =>
                            setShowNewPassword(!showNewPassword)
                        }
                        className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#6B5744]
                        hover:text-[#2C1810]
                        "
                    >

                        {showNewPassword ? (
                            <EyeOff size={20}/>
                        ) : (
                            <Eye size={20}/>
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
                        className="
                        w-full
                        border
                        border-[#E8DCC5]
                        rounded-lg
                        px-4
                        py-3
                        pr-12
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#C4873A]
                        "
                    />


                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-[#6B5744]
                        hover:text-[#2C1810]
                        "
                    >

                        {showConfirmPassword ? (
                            <EyeOff size={20}/>
                        ) : (
                            <Eye size={20}/>
                        )}

                    </button>


                </div>





                <button
                    className="
                    bg-[#C4873A]
                    hover:bg-[#A86F2F]
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    w-full
                    transition
                    font-semibold
                    "
                >

                    Update Password

                </button>


            </form>


        </div>


    </div>

);

}

export default Settings;