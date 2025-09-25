import { Navigate, Outlet } from "react-router-dom";

const Protectedroutes = () => {
  const token = localStorage.getItem("token")
  const parsedUser = JSON.parse(localStorage.getItem("user") || "null");
  if (!token || parsedUser?.userType !== "admin") {
    return <Navigate to={"/"} replace />
  }

  return <Outlet/>
}

export default Protectedroutes