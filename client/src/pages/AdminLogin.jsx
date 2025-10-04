import { Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { setUser } from "../features/auth/authSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    async function loginAdmin() {
      try {
        setLoading(true);
        await axiosInstance.post("/auth/login", loginDetails);
        let res = await axiosInstance.get("/auth/check") 
        dispatch(setUser(res.data));
        return toast.success("Logged In Successfully");
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }

    loginAdmin();
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
          placeholder="prakashKumar@gmail.com"
          required
          value={loginDetails.email}
          onChange={(e) =>
            setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
          required
          value={loginDetails.password}
          onChange={(e) =>
            setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer "
      >
        {loading ? (
          <>
            <Loader className="size-5 animate-spin inline-block mr-2" />
            Logging in...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default AdminLogin;
