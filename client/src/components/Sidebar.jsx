import {
  FaHome,
  FaFolder,
  FaTasks,
  FaUsers,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const dashboardRoute =

    user?.role === "Admin"

      ? "/dashboard/admin"

      : "/dashboard/member";


  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");

  };


  const linkStyle = (path) =>

    `flex items-center gap-3 p-3 rounded transition-all
    ${
      location.pathname===path
      ? "bg-blue-500 text-white"
      : "hover:bg-blue-100"
    }`;


  return (

    <div
      className="w-64 bg-white h-screen shadow-md fixed left-0 top-0 p-5"
    >

      <h1
        className="text-2xl font-bold mb-3 text-blue-600"
      >
        Team Task Manager
      </h1>

      <p
        className="text-gray-500 mb-10"
      >
        {user?.role}
      </p>

      <div
        className="flex flex-col gap-4"
      >

        <Link
          to={dashboardRoute}
          className={linkStyle(
            dashboardRoute
          )}
        >
          <FaHome />
          Dashboard
        </Link>


        <Link
          to="/projects"
          className={linkStyle(
            "/projects"
          )}
        >
          <FaFolder />
          Projects
        </Link>


        <Link
          to="/teams"
          className={linkStyle(
            "/teams"
          )}
        >
          <FaUsers />
          Teams
        </Link>


        <Link
          to="/tasks"
          className={linkStyle(
            "/tasks"
          )}
        >
          <FaTasks />
          Tasks
        </Link>


        <Link
          to="/reports"
          className={linkStyle(
            "/reports"
          )}
        >
          <FaChartBar />
          Reports
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded mt-10 bg-red-500 text-white hover:bg-red-600"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </div>

  );

};

export default Sidebar;