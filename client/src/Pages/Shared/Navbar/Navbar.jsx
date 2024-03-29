import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";


import { FaShoppingCart } from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart()
  const [isAdmin] = useAdmin() 
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out Success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error, "Error Happened");
      });
  };
  const navOptions = (
    <div className="flex items-center">
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/menu"}>Our Menu</Link>
      </li>
      <li>
        <Link to={"/order/salad"}>Order</Link>
      </li>
      
      {
        user && isAdmin && <li><Link to={"/dashboard/adminhome"}>Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to={"/dashboard/userhome"}>Dashboard</Link></li>
      }
     
      {user ? (
        <>
          <button
            onClick={handleLogout}
            className="btn btn-sm bg-transparent text-white"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-40 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user && (
            <>
              <button
                aria-readonly
                className="btn btn-xs bg-black cursor-wait text-white border-violet-800 hover:bg-violet-800 hover:border-black"
              >
                {user?.displayName}
              </button>
              <Link to="dashboard/cart">
              <button className="btn btn-xs bg-black text-white border-none hover:text-black">
                <FaShoppingCart color="violet"/>
                <div className="badge badge-secondary bg-orange-600">+{cart.length}</div>
              </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
