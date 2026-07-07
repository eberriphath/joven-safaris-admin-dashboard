import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import NotFound from "../pages/NotFound";
import AppLayout from "../layout/AppLayout";
import Reviews from "../pages/Reviews";
import Settings from "../pages/Settings";
import Packages from "../pages/Packages";
import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />


        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/bookings" element={<Bookings />} />

          <Route path="/reviews" element={<Reviews />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/packages" element={<Packages />} />

        </Route>


        <Route path="*" element={<NotFound />} />


      </Routes>

    </BrowserRouter>
  );
}




export default AppRoutes;