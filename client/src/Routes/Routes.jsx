import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Secret from "../Pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/Users/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageAllItems from "../Pages/Dashboard/ManageAllItems/ManageAllItems";
import UpdateItem from "../Pages/Dashboard/Update/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path : 'userhome',
        element: <PrivateRoute><UserHome/></PrivateRoute>
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path : "paymentHistory",
        element: <PaymentHistory/>
      },
      //for admin only routes
      // load all users
      {
        path : 'adminhome',
        element : <AdminRoute><AdminHome/></AdminRoute>
      },
      {
        path: "allUsers",
        element: <AllUsers/>
      },
      //add an item
      {
        path: "addItems",
        element: <AdminRoute><AddItems/></AdminRoute>
      },
      //manage all items
      {
        path: "manageItems",
        element: <AdminRoute><ManageAllItems/></AdminRoute>
      },
      {
        path: "updateItems/:id",
        element: <AdminRoute><UpdateItem/></AdminRoute>,
        loader: ({params}) => fetch(`https://backend-eight-mu.vercel.app/menu/${params.id}`)
      },
      {
        path: "payment",
        element: <Payment/>
      }
    ],
  },
]);
