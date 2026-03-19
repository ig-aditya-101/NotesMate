import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import ProfilePage from "./pages/ProfilePage";
import dashboard from "./pages/dashboard";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import ContributorsPage from "./pages/ContributorsPage";
import UploadPage from "./pages/UploadPage";
dashboard;

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Contributors" element={<ContributorsPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
