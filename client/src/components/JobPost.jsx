import React from "react";
import { ArrowUpRight } from "lucide-react";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { useEffect } from "react";
import { setTags } from "../features/job/jobSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const JobPost = ({ jobPost, admin = null, dashboard = false }) => {
  const {
    _id,
    title,
    description,
    experienceLevel,
    remote,
    tags,
    type,
    active,
    applicationIds,
    createdAt
  } = jobPost;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTags(tags));
  }, [tags]);

  return (
    <div>
      <section
        id="job"
        className="flex items-center justify-between py-6 relative"
      >
        <div id="left" className="w-[60%] space-y-5">
          <div className="space-y-2">
            <h3 className="text-2xl montserrat-semiBold flex items-center justify-start gap-2">
              {title}

              {active ? (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  ">
                  Active
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm  ">
                  Inactive
                </span>
              )}
              {dashboard ? (
                <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm inline-flex gap-1">
                  {applicationIds.length} Applications
                </span>
              ) : (
                ""
              )}
            </h3>
            <p className="montserrat-regular text-sm
            ellipsis-3">{description}</p>
          </div>
          <div id="partialDetails" className="flex items-center justify-start">
            <span
              className=" montserrat-bold
                 border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit  transition-all duration-300 flex items-center justify-center gap-1 
              "
            >
              <MapPin size={16} /> {remote}
            </span>
            <span
              className={
                "montserrat-bold border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit transition-all duration-300 flex items-center justify-center gap-1 "
              }
            >
              <Clock size={16} />
              {type}
            </span>
            <span
              className={
                "montserrat-bold border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit transition-all duration-300 flex items-center justify-center gap-1 "
              }
            >
              {experienceLevel}
            </span>
            {
              dashboard? (
                 <span
              className={
                "montserrat-bold border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  min-w-fit transition-all duration-300 flex items-center justify-center gap-1 "
              }
            >
              Posted on: {new Date(createdAt).toDateString()}
            </span>
              ) : ""
            }
          </div>
        </div>
        <div id="right" className="self-start flex flex-col gap-10">
          <Link
            to={`/job/apply/${_id}`}
            className="montserrat-semiBold text-3xl flex items-center justify-center cursor-pointer tracking-tighter hover:text-gray-700 transition-all duration-300"
          >
            {dashboard ? (
              <Link to={`/admin/job/applications/${_id}`} className="text-lg">
                View Applications
              </Link>
            ) : (
              "Apply"
            )}
            <ArrowUpRight size={40} />
          </Link>
          <div className="flex ">
        {!admin?.isSuperAdmin ? (
          ""
        ) : (
          <>
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer "
              onClick={() => deleteAdmin(admin._id)}
            >
              Edit Job
            </button>
            <button
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 cursor-pointer"
              onClick={() => deleteAdmin(admin._id)}
            >
              Delete Job
            </button>
          </>
        )}
      </div>
        </div>
        
      </section>
      
      <hr />
    </div>
  );
};

export default JobPost;
