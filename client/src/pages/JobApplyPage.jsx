import { useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import Blur from "../components/Blur";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import Footer from "../components/Footer";

const JobApplyPage = () => {
  const { id } = useParams();
  const [currentJob, setCurrentJob] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAjob(id) {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/job/get-aJob/${id}`);
        setCurrentJob(res.data.job);
      } catch (error) {
        console.log("Error in getting a job", error);
      } finally {
        setLoading(false);
      }
    }
    getAjob(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen  ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Blur coordinates="right-0 top-0" />
      <div id="job-details" className="pt-10 space-y-4">
        <h1 className="text-3xl montserrat-semiBold capitalize underline">
          Apply Now For Following job!
        </h1>
        <p className="text-lg font-semibold "># Job details are:-</p>
        <div className="ml-4 space-y-2 border-l-4 border-blue-600 ps-4">
          <h2 className="flex gap-2">
            <span className="">
              <span className="font-bold">Job Title:-</span> {currentJob.title}
            </span>
            {currentJob.active ? (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  ">
                Active
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  ">
                Inactive
              </span>
            )}
          </h2>
          <p>
            <span className="font-bold">Description:-</span>{" "}
            {currentJob.description}
          </p>
          <p>
            <span className="font-bold">No. of Applicants:-</span>{" "}
            {currentJob.applicationIds?.length}
          </p>
          <p>
            <span className="font-bold">Type:-</span> {currentJob.type}
          </p>
          <p>
            <span className="font-bold">Remote:-</span> {currentJob.remote}
          </p>
          <p>
            <span className="font-bold">Salary:-</span> NRP. {currentJob.salary}
          </p>
          <p>
            <span className="font-bold">Location:-</span> {currentJob.location}
          </p>
          <p>
            <span className="font-bold">Experience Level:-</span>{" "}
            {currentJob.experienceLevel}
          </p>
          <p>
            <span className="font-bold">Posted On:-</span>{" "}
            {new Date(currentJob.createdAt).toDateString()}
          </p>
        </div>
      </div>
      <div id="form" className="space-y-4 mt-10 mb-20">
        <p className="text-lg font-semibold "># Application Form:-</p>
        <JobForm jobId={currentJob._id} setCurrentJob={setCurrentJob} />
      </div>
      <Footer />
    </div>
  );
};

export default JobApplyPage;
