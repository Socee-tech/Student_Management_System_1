import { useNavigate } from "react-router-dom"
import API from "../API/axios";
import { useState } from "react";


export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        passWord: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmitt = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/user/login", formData);
            if (res?.data) {
                navigate("/admin");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="fixed inset-0 items-center justify-center min-h-screen bg-background-alt flex text-white ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
                <div className="text-5xl font-semibold font-stretch-expanded">Welcome back<br /><br /> Login</div>
                <div className="flex-col border border-gray-700 p-4 rounded-lg shadow-lg flex">
                    <div>Login</div>
                    <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmitt}>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Username"
                            className="p-2 rounded bg-gray-800 border border-gray-700"
                        />
                        <input
                            type="password"
                            name="passWord"
                            value={formData.passWord}
                            onChange={handleChange}
                            placeholder="Password"
                            className="p-2 rounded bg-gray-800 border border-gray-700"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )

}