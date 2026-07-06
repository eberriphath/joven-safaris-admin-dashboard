import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import NotFound from "../pages/NotFound";
import AppLayout from "../layout/AppLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;