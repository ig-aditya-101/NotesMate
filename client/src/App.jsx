import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";

import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import ContributorsPage from "./pages/TopContributorsPage";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="max-w-4xl mx-auto ">
          <Routes>
            <Route path="/" element={<BrowsePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Contributors" element={<ContributorsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          <Navbar />
        </div>
      </BrowserRouter>
    </>
  );
};
export default App;
