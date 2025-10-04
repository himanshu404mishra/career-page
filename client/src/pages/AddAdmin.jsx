import { Send } from "lucide-react";
import DashboardAside from "../components/DashboardAside";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAllAdmins } from "../features/auth/authSlice";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const [addingAdmin, setAddingAdmin] = useState(false);

  const [adminData, setAdminData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    isSuperAdmin: false,
  });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    async function addAdmin() {
      try {
        setAddingAdmin(true);
        await axiosInstance.post("/auth/create-admin", adminData);
        setAdminData({
          fullname: "",
          email: "",
          password: "",
          role: "",
          isSuperAdmin: false,
        });
        const res = await axiosInstance.get("/auth/all-admins");
        dispatch(setAllAdmins(res.data.allAdmins));
        return toast.success("Added Admin successfully");
      } catch (error) {
        console.log("Error in submitting application", error);
        return toast.error(error.response.data.message);
      } finally {
        setAddingAdmin(false);
      }
    }
    addAdmin();
  };

  return (
    <div>
      <DashboardAside />
      <div className="p-4 sm:ml-64 flex flex-col">
        <form className="min-w-xl mx-auto" onSubmit={handleAddAdmin}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_fullname"
              id="floating_fullname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
              placeholder=" Eg. Prakash Kumar "
              required
              value={adminData.fullname}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  fullname: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_fullname"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
              placeholder=" Eg. prakashKumar@gmail.com "
              required
              value={adminData.email}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  email: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer focus-within:placeholder:opacity-100 placeholder:opacity-0"
              placeholder="******"
              required
              value={adminData.password}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  password: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Passowrd
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="role"
              id="floating_role"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
              placeholder=" Eg. HR, CEO, Tech Lead, etc"
              required
              value={adminData.role}
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  role: e.target.value,
                })
              }
            />
            <label
              htmlFor="floating_role"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Role
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="underline_select" className="sr-only">
              Is Super Admin
            </label>
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:ring-0 focus:border-gray-200 peer"
              onChange={(e) =>
                setAdminData({
                  ...adminData,
                  isSuperAdmin: e.target.value === "1" ? true : false,
                })
              }
            >
              <option selected>Is a Super Admin?</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={
              !adminData.fullname ||
              !adminData.email ||
              !adminData.password ||
              !adminData.role
                ? true
                : false
            }
          >
            {addingAdmin ? (
              <>
                <Loader className="size-5 animate-spin" />{" "}
                <span>Adding Admin...</span>
              </>
            ) : (
              "Add Admin"
            )}{" "}
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
