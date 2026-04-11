import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";

import LoginPage from "./pages/LoginPage";
import ContributorsPage from "./pages/TopContributorsPage";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="max-w-4xl mx-auto ">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/" element={<BrowsePage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Contributors" element={<ContributorsPage />} />
          </Routes>

          <Navbar />
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
