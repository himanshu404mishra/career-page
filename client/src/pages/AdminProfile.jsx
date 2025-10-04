import { useSelector } from "react-redux";
import DashboardAside from "../components/DashboardAside";

const AdminProfile = () => {
  const admin = useSelector((state) => state.auth.user);

  return (
    <>
      <DashboardAside />

      <div className="w-fit p-4 sm:ml-64 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm  ">
        <div className="flex flex-col items-center pb-10">
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
            class="lucide lucide-circle-user-round-icon lucide-circle-user-round w-24 h-24 mb-3 rounded-full shadow-lg"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h5 className="mb-1 text-xl montserrat-bold text-gray-900 ">
            {admin.fullname}
          </h5>

          <div className=" mt-4 md:mt-6 flex text-sm flex-col items-center gap-3">
            <div className="flex text-sm text-gray-500 flex-col gap-2">
              <p className="text-center">
                {admin.isSuperAdmin ? (
                  <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                    Super Admin
                  </span>
                ) : (
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ">
                    Admin
                  </span>
                )}
              </p>
              <p>
                Email:- <span>{admin.email}</span>
              </p>
            </div>
            <div>
              <span className="font-bold">Role:- </span>
              <span className="text-gray-500">{admin.role}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
