import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setApplications,
  setIsApplicationLoading,
} from "../features/application/applicationSlice";
import toast from "react-hot-toast";
import DashboardAside from "../components/DashboardAside";
import { Loader } from "lucide-react";
import Application from "../components/Application";

const ViewApplicationsPage = () => {
  const { id: jobId } = useParams();

  const isApplicationLoading = useSelector(
    (state) => state.application.isApplicationLoading
  );
  const applications = useSelector((state) => state.application.application);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getApplications(jobId) {
      try {
        dispatch(setIsApplicationLoading(true));
        let res = await axiosInstance.get(`/job/get-applications/${jobId}`);
        dispatch(setApplications(res.data.applications.applicationIds));
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        dispatch(setIsApplicationLoading(false));
      }
    }
    getApplications(jobId);
  }, [jobId]);

  return (
    <div>
      <DashboardAside />
      <div className="p-4 sm:ml-52">
        {isApplicationLoading ? (
          <div className="flex items-center justify-center h-screen  ">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          applications?.map((application ,index)=>{
            return <Application key={index} application={application}/>
          })
        )}
      </div>
    </div>
  );
};

export default ViewApplicationsPage;
