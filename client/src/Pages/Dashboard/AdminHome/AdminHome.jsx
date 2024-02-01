import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaDollarSign } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {data: stats=[]} = useQuery({
    queryKey : ['admin-stat'],
    queryFn: async()=>{
        const res = await axiosSecure('/admin-stats')
        return res.data;
    }

  })
  return (
    <div>
      <h2 className="text-3xl">
        <span>Welcome </span>
        {user.displayName ? user?.displayName : "Back"}
      </h2>
      <div className="stats bg-orange-200 mt-4 shadow w-full">
        <div className="stat">
          <div className="stat-figure text-orange-600 text-4xl">
           <FaDollarSign/>
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{stats.revenue}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{stats.users}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{stats.menuItems}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Orders</div>
          <div className="stat-value">{stats.orders}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
