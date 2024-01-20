import { FaHome, FaShoppingCart } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { FaRegPenToSquare, FaRegStarHalfStroke } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
        <li className="p-2">
            <NavLink to="/dashboard/userhome"><FaHome size={20}/> User Home</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard/reservation"><FaRegPenToSquare size={20}/> Reservation </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard/cart"> <FaShoppingCart size={20}/> My Cart</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard/review"> <FaRegStarHalfStroke size={20}/> Add A Review</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/dashboard/mybookings"><TbBrandBooking size={20}/>My Bookings</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
