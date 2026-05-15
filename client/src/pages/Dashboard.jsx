import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res = await API.get("/dashboard/stats");

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64 p-8 w-full">

        <h1 className="text-4xl font-bold mb-8">
          Welcome back, Admin!
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold">
              Total Projects
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.totalProjects || 0}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.totalTasks || 0}
            </p>

          </div>

          <div className="bg-red-50 border border-red-300 p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold text-red-600">
              Overdue Tasks
            </h2>

            <p className="text-4xl font-bold text-red-600 mt-2">
              {stats.overdueTasks || 0}
            </p>

          </div>

          <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold text-yellow-700">
              Pending Tasks
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.pendingTasks || 0}
            </p>

          </div>

          <div className="bg-blue-50 border border-blue-300 p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold text-blue-700">
              In Progress
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.inProgressTasks || 0}
            </p>

          </div>

          <div className="bg-green-50 border border-green-300 p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold text-green-700">
              Completed Tasks
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.completedTasks || 0}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;