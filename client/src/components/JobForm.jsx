import { Loader } from "lucide-react";
import { Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const JobForm = ({ jobId, setCurrentJob }) => {
  const [applicationData, setApplicationData] = useState({
    jobId: jobId || "",
    fullname: "",
    email: "",
    phone: "",
    address: "",
    resumeLink: "",
  });

  const [sendingApplication, setSendingApplication] = useState(false);

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    async function submitApplication() {
      try {
        setSendingApplication(true);
        let res = await axiosInstance.post(
          "/application/send-application",
          applicationData
        );
        setApplicationData({
          jobId: jobId || "",
          fullname: "",
          email: "",
          phone: "",
          address: "",
          resumeLink: "",
        });
        if (res.data.application && setCurrentJob && jobId) {
          setCurrentJob((prev) => ({
            ...prev,
            applicationIds: [...prev.applicationIds, res.data.application._id],
          }));
        }
        return toast.success("Submitted application successfully");
      } catch (error) {
        console.log("Error in submitting application", error);
        return toast.error(error.response.data.message);
      } finally {
        setSendingApplication(false);
      }
    }
    submitApplication();
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleApplicationSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="floating_fullname"
          id="floating_fullname"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
          placeholder=" Eg. Prakash Kumar "
          required
          value={applicationData.fullname}
          onChange={(e) =>
            setApplicationData({ ...applicationData, fullname: e.target.value })
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
          value={applicationData.email}
          onChange={(e) =>
            setApplicationData({ ...applicationData, email: e.target.value })
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
          type="tel"
          name="floating_phone"
          id="floating_phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer focus-within:placeholder:opacity-100 placeholder:opacity-0"
          placeholder="Eg. 98XXXXXXXX"
          required
          value={applicationData.phone}
          onChange={(e) =>
            setApplicationData({ ...applicationData, phone: e.target.value })
          }
        />
        <label
          htmlFor="floating_phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="address"
          id="floating_address"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
          placeholder=" Eg. Kathmandu, Nepal"
          required
          value={applicationData.address}
          onChange={(e) =>
            setApplicationData({ ...applicationData, address: e.target.value })
          }
        />
        <label
          htmlFor="floating_address"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="url"
          name="resumeLink"
          id="floating_resumeLink"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder:opacity-0 focus-within:placeholder:opacity-100"
          placeholder=" Eg. https://your-link.com/resume.pdf"
          required
          value={applicationData.resumeLink}
          onChange={(e) =>
            setApplicationData({
              ...applicationData,
              resumeLink: e.target.value,
            })
          }
        />
        <label
          htmlFor="floating_resumeLink"
          className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Resume Link
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={
          !applicationData.fullname ||
          !applicationData.email ||
          !applicationData.phone ||
          !applicationData.address ||
          !applicationData.resumeLink
            ? true
            : false
        }
      >
        {sendingApplication ? (
          <>
            <Loader className="size-5 animate-spin" />{" "}
            <span>Submitting Application...</span>
          </>
        ) : (
          "Submit Application"
        )}{" "}
        <Send size={16} />
      </button>
    </form>
  );
};

export default JobForm;
