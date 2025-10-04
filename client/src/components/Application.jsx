import { ArrowUpRight } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Application = ({ application }) => {
  const { fullname, email, phone, address, resumeLink, jobId } = application;
  const jobs = useSelector((state) => state.job.job);
  let currentJobTitle;
  jobs.forEach((job) => {
    if (job._id === jobId) {
      currentJobTitle = job.title;
    }
  });
  return (
    <div>
      <section
        id="application"
        className="flex items-center justify-between py-6 relative"
      >
        <div id="left" className="w-[60%] space-y-5">
          <div className="space-y-2">
            <h3 className="text-2xl montserrat-semiBold flex items-center justify-start gap-2">
              {fullname}
            </h3>
            <p
              className="montserrat-regular text-sm
            ellipsis-3"
            >
              Email:- {email}
            </p>
          </div>
          <div id="partialDetails" className="flex items-center justify-start">
            <span
              className=" montserrat-bold
                 border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit  transition-all duration-300 flex items-center justify-center gap-1 
              "
            >
              Applied For: {currentJobTitle}
            </span>
            <span
              className=" montserrat-bold
                 border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit  transition-all duration-300 flex items-center justify-center gap-1 
              "
            >
              Phone: {phone}
            </span>
          </div>
        </div>
        <div id="right" className="self-start flex flex-col gap-10">
          <Link
            to={`/job/application/`}
            className="montserrat-semiBold text-xl flex items-center justify-center cursor-pointer tracking-tighter hover:text-gray-700 transition-all duration-300"
          >
            View Application
            <ArrowUpRight size={40} />
          </Link>
          
        </div>
      </section>
      <hr />
    </div>
  );
};

export default Application;
