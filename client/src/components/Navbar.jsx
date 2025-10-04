import { LogOut } from "lucide-react";
import { Plus } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    async function logout() {
      try {
        await axiosInstance.post("/auth/logout");
        // set user as null
        dispatch(setUser(null));
        toast.success("Logged out successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    logout();
  };

  return (
    <nav
      className=" flex items-center justify-between px-25 font-semibold
    montserrat-semiBold py-4 select-none "
    >
      <div id="logo">
        <h2 className="text-2xl pointer-events-none tracking-tighter">
          Career Page
        </h2>
      </div>
      <div className="text-sm montserrat-bold tracking-tighter">
        <ul className="flex gap-3 items-center justify-center">
          <li className=" cursor-pointer hover:text-gray-700 duration-200">
            <Link to={"/"}>Home</Link>
          </li>
          <li className=" cursor-pointer hover:text-gray-700 duration-200">
            Pricing
          </li>
          <li className="flex gap-1 items-center justify-center cursor-pointer hover:text-gray-700 duration-200">
            Resources <Plus size={16} />
          </li>
          <li className="flex gap-1 items-center justify-center cursor-pointer hover:text-gray-700 duration-200">
            Company
          </li>

          {user && (
            <>
              <li className="cursor-pointer  duration-200">
                <Link to={"/admin/dashboard"}>
                  <button
                    type="button"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 me-2  inline-flex gap-1 items-center cursor-pointer"
                  >
                    Dashboard <LayoutDashboard size={16} />
                  </button>
                </Link>
              </li>
              <li className="cursor-pointer  duration-200">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2  inline-flex items-center gap-1 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout <LogOut size={16} />
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
