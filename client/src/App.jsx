import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import JobApplyPage from "./pages/JobApplyPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import "./App.css";
import { useEffect } from "react";
import { axiosInstance } from "./lib/axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setUser, checkAuth } from "./features/auth/authSlice";
import { Loader } from "lucide-react";
import AdminLogin from "./pages/AdminLogin";
import AdminProfile from "./pages/AdminProfile";
import AllAdminsPage from "./pages/AllAdminsPage";
import AddAdmin from "./pages/AddAdmin";
import ViewApplicationsPage from "./pages/ViewApplicationsPage";

function PublicLayout() {
  return (
    <>
      <section className="data-[theme='dark']:bg-[#111827] data-[theme='dark']:text-[#7DA3AF] ">
        <Navbar />
        <main className="px-20 mx-auto">
          <Outlet />
        </main>
      </section>
      <Toaster />
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isCheckingAuth = useSelector((state) => state.auth.isCheckingAuth);

  useEffect(() => {
    async function checkAuthFunction() {
      try {
        const res = await axiosInstance.get("/auth/check");
        dispatch(setUser(res.data));
      } catch (error) {
        console.log("Error in check auth", error);
        dispatch(setUser(null));
      } finally {
        dispatch(checkAuth());
      }
    }
    checkAuthFunction();
  },[]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-screen  ">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes using the default navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/apply/:id" element={<JobApplyPage />} />
          <Route
            path="/admin/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/profile"
            element={
              user ? <AdminProfile/> : <Navigate to={"/"} />
            }
          />
          <Route
            path="/admin/allAdmins"
            element={
              user ? <AllAdminsPage/> : <Navigate to={"/"}/>
            }
          />
          <Route
          path="/admin/job/applications/:id"
          element={
            user ? <ViewApplicationsPage/> : <Navigate to={"/"}/>
            }
          />
          <Route
            path="/admin/addAdmin"
            element={
              user?.isSuperAdmin ? <AddAdmin/> : <Navigate to={"/"}/>
            }
          />
          <Route
            path="/admin/login"
            element={
              !user ? (
                <AdminLogin/>
              ) : (
                <Navigate to="/admin/dashboard" />
              )
            }
          />
          <Route path="/admin/login" element={"admin login"} />
        </Route>
        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
