import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./page/Login.page";
import DashboardLayout from "./components/layout";
import Pickuporderpage from "./page/Pickuporder.page";
import DashboardPage from "./page/Dashboard";
import Deliverorderpage from "./page/Deliverorder.page";
import StatusManagementpage from "./page/StatusManagement.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage />} />

        {/* Dashboard Layout with children */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="pickup-orders" element={<Pickuporderpage />} />
          <Route path="deliver-orders" element={<Deliverorderpage />} />
          <Route path="status-management" element={<StatusManagementpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
