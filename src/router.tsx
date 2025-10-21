import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout";
import Pickuporderpage from "./page/Pickuporder.page";
import DashboardPage from "./page/Dashboard";
import Deliverorderpage from "./page/Deliverorder.page";
import StatusManagementpage from "./page/StatusManagement.page";
import LoginForm from "./components/LoginForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import AuthLayout from "./components/Authlayout";
import { SettingPage } from "./page/Setting.page";
import Protectedroutes from "./protectedRoutes/protectedroutes";
import Publicroutes from "./protectedRoutes/publicroutes";
import RiderPage from "./page/Rider.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Publicroutes/>}>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        </Route>

        <Route element={<Protectedroutes/>}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="wholesaler-details" element={<Pickuporderpage />} />
            <Route path="retailer-details" element={<Deliverorderpage />} />
            <Route path="order-status" element={<StatusManagementpage />} />
            <Route path="rider-detail" element={<RiderPage />} />
            <Route path="settings" element={<SettingPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
