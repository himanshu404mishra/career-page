import { useSelector } from "react-redux";
import DashboardAside from "../components/DashboardAside";
import JobPost from "../components/JobPost";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const jobs = useSelector((state) => state.job.job);
  const admin = useSelector((state) => state.auth.user);
  const isJobLoading = useSelector((state) => state.job.isJobLoading);

  return (
    <section>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <DashboardAside />

      <div className="p-4 sm:ml-52">
        {isJobLoading ? (
          <div className="flex items-center justify-center h-screen  ">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div class="relative overflow-x-auto sm:rounded-lg">
            {jobs?.map((jobPost, index) => (
              <JobPost
                key={index}
                jobPost={jobPost}
                admin={admin}
                dashboard={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
