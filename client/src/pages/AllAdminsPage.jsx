import { useSelector } from "react-redux";
import DashboardAside from "../components/DashboardAside";
import { Loader } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAllAdmins } from "../features/auth/authSlice";

const AllAdminsPage = () => {
  const dispatch = useDispatch();
  const allAdmins = useSelector((state) => state.auth.allAdmins);
  const currentAdmin = useSelector((state) => state.auth.user);
  const isAllAdminLoading = useSelector(
    (state) => state.auth.isAllAdminLoading
  );

  const deleteAdmin = async (id) => {
    try {
      await axiosInstance.delete("/auth/delete-admin", { data: { id } });
      const res = await axiosInstance.get("/auth/all-admins");
      dispatch(setAllAdmins(res.data.allAdmins));
      toast.success("Admin deleted Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <DashboardAside />

      {isAllAdminLoading && !allAdmins ? (
        <div className="p-4 sm:ml-64">
          <div className="flex items-center justify-center h-screen  ">
            <Loader className="size-10 animate-spin" />
          </div>
        </div>
      ) : (
        <div className="p-4 sm:ml-64 flex flex-col">
          {currentAdmin.isSuperAdmin ? (
            <Link
              to={"/admin/addAdmin"}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2  focus:outline-none cursor-pointer inline-flex gap-2 items-center self-end"
            >
              <SquarePlus /> Add Admin
            </Link>
          ) : (
            ""
          )}

          <ul role="list" className="max-w-sm divide-y divide-gray-200 ">
            {allAdmins?.map((admin, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse shadow rounded-2xl px-2 min-w-md">
                  <div className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-user-round-icon lucide-circle-user-round w-10 h-10 mb-3 rounded-full shadow-lg"
                    >
                      <path d="M18 20a6 6 0 0 0-12 0" />
                      <circle cx="12" cy="10" r="4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate ">
                      {admin.fullname}{" "}
                      {admin.email === currentAdmin.email ? "(You) " : ""}
                      <span>({admin.role})</span>
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {admin.email}
                    </p>
                  </div>
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full ">
                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    {admin.isSuperAdmin ? "Super Admin" : "Admin"}
                  </span>
                  <div>
                    {!currentAdmin.isSuperAdmin ||
                    currentAdmin.email === admin.email ? (
                      ""
                    ) : (
                      <button
                        type="button"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
                        onClick={() => deleteAdmin(admin._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllAdminsPage;
