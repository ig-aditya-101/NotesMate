import { Circle, Grid, Home, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navbarItems = [
    {
      label: "Dashboard",
      icon: <Home />,
      route: "/dashboard",
    },
    {
      label: "Browse",
      icon: <Grid />,
      route: "/",
    },
    {
      label: "Upload",
      icon: <Upload />,
      route: "/upload",
    },
    {
      label: "Profile",
      icon: <Circle />,
      route: "/profile",
    },
  ];
  return (
    <>
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-full w-56 bg-bg-secondary border-r border-border-main p-4 gap-2">
        {navbarItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.route)}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-text-secondary hover:bg-bg-primary"
          >
            {/* {item.icon} */}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full md:hidden justify-between fixed bottom-0 left-0 right-0 bg-white border-border-main px-4 py-2">
        {navbarItems.map((item) => (
          <div
            key={item.label}
            className="text-text-secondary text-micro flex flex-col items-center"
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;
