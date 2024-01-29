import {
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { FaBook, FaDollarSign, FaRegPenToSquare, FaRegStarHalfStroke } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks /useCart";
import useAdmin from "../Hooks /useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400 fixed">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li className="p-2">
                <NavLink to="/dashboard/adminhome">
                  <FaHome size={20} /> Admin Home
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/addItems">
                  <FaUtensils size={20} /> Add Items
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageItems">
                  <FaList size={20} /> Manage Items
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/manageBookings">
                  <FaBook size={20} /> Manage Bookings
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/allUsers">
                  <FaUsers size={20} /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="p-2">
                <NavLink to="/dashboard/userhome">
                  <FaHome size={20} /> User Home
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/reservation">
                  <FaRegPenToSquare size={20} /> Reservation{" "}
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/cart">
                  {" "}
                  <FaShoppingCart size={20} /> My Cart ({cart.length})
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/review">
                  {" "}
                  <FaRegStarHalfStroke size={20} /> Add A Review
                </NavLink>
              </li>
              <li className="p-2">
                <NavLink to="/dashboard/paymentHistory">
                  <FaDollarSign size={20} />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          <li className="p-2">
            <NavLink to="/">
              <FaHome size={20} /> Home
            </NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/menu">
              <BiSolidFoodMenu size={20} /> Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 ml-[264px] p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
