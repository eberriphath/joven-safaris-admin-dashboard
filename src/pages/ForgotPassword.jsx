import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);


        try {

            const res = await api.post(
                "/admin/forgot-password",
                {
                    email
                }
            );


            setMessage(res.data.message);


        } catch(err) {


            setError(
                err.response?.data?.error ||
                "Something went wrong."
            );


        } finally {

            setLoading(false);

        }

    }



    return (

        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        ">


            <form

                onSubmit={handleSubmit}

                className="
                bg-white
                p-8
                rounded-xl
                shadow-md
                w-full
                max-w-md
                "

            >


                <h1 className="
                text-2xl
                font-bold
                mb-6
                text-center
                ">

                    Forgot Password

                </h1>




                {
                    message && (

                        <div className="
                        bg-green-100
                        text-green-700
                        p-3
                        rounded
                        mb-4
                        text-sm
                        ">

                            {message}

                        </div>

                    )
                }





                {
                    error && (

                        <div className="
                        bg-red-100
                        text-red-700
                        p-3
                        rounded
                        mb-4
                        text-sm
                        ">

                            {error}

                        </div>

                    )
                }





                <input

                    type="email"

                    placeholder="Admin email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    className="
                    w-full
                    p-3
                    border
                    rounded
                    mb-4
                    "

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

                    {
                        loading
                        ? "Sending..."
                        : "Send Reset Link"
                    }


                </button>





                <button

                    type="button"

                    onClick={()=>navigate("/")}

                    className="
                    w-full
                    mt-4
                    text-gray-600
                    hover:underline
                    text-sm
                    "

                >

                    Back to Login

                </button>



            </form>


        </div>

    );

}


export default ForgotPassword;