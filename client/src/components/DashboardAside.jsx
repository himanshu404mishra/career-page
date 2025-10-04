import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setJob, setJobLoading } from "../features/job/jobSlice";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { setAllAdmins, setIsAllAdminLoading } from "../features/auth/authSlice";

const DashboardAside = () => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.job);
  const allAdmins = useSelector((state) => state.auth.allAdmins);

  useEffect(() => {
    async function getJobs() {
      try {
        dispatch(setJobLoading(true));
        const res = await axiosInstance(`/job/all-jobs`);
        dispatch(setJob(res.data.alljobs));
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setJobLoading(false));
      }
    }
    async function getAllAdmins() {
      try {
        dispatch(setIsAllAdminLoading(true));
        const res = await axiosInstance.get("/auth/all-admins");
        dispatch(setAllAdmins(res.data.allAdmins));
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setIsAllAdminLoading(false));
      }
    }
    getJobs();
    getAllAdmins();
  }, [setAllAdmins]);




  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 top-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={"/"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <span className="ms-3 text-2xl montserrat-bold tracking-tight">
                Career Page
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/dashboard"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <svg
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 18"
              >
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">All Jobs</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  ">
                {job?.length}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/allAdmins"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <svg
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">All Admins</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  ">
                {allAdmins?.length}
              </span>
            </Link>
          </li>

          <li>
            <Link
              to={"/admin/profile"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <svg
                class="w-6 h-6 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="flex-1 ms-3 whitespace-nowrap">
                Your Profile
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default DashboardAside;
