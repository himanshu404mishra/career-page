import Header from "../components/Header";
import JobPost from "../components/JobPost";
import Testimonial from "../components/testimonial";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosInstance } from "../lib/axios";
import { Loader } from "lucide-react";
import { setJob, setJobLoading } from "../features/job/jobSlice";
import toast from "react-hot-toast";

const HomePage = () => {
  const dispatch = useDispatch();
  const isJobLoading = useSelector((state) => state.job.isJobLoading);
  const job = useSelector((state) => state.job.job);
  const isJobSorted = useSelector((state) => state.job.isJobSorted);
  const sortedJob = useSelector((state) => state.job.sortedJob);

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
    getJobs();
  }, []);

  return (
    <>
      <Header />
      <hr />
      {isJobLoading ? (
        <div className="flex items-center justify-center h-screen  ">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          {job && !isJobSorted && job.length > 0 ? (
            job.map((jobPost) => (
              <JobPost key={jobPost._id} jobPost={jobPost} />
            ))
          ) : isJobSorted && sortedJob.length > 0 ? (
            sortedJob.map((jobPost) => (
              <JobPost key={jobPost._id} jobPost={jobPost} />
            ))
          ) : (
            <p className="text-center my-10 font-bold text-xl">
              No Job Posted Yet!
            </p>
          )}
        </>
      )}
      {/* testimonial */}
      <Testimonial />
      <Footer />
    </>
  );
};

export default HomePage;
