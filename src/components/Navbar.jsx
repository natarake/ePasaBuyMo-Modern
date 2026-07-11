import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const isAdmin = user.isAdmin;

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <div className="bg-[#060606ef] sticky top-0 right-0 left-0 z-10">
        <div className="flex justify-between items-center h-16 max-w-[1240px] mx-auto px-4 text-white shadow-xl ">
          <Link to="/">
            <h1 className="text-2xl text-blue-700 font-semibold font-display">
              <span className="text-red-500">e</span>Pasa
              <span className="text-red-500">Buy</span>Mo
            </h1>
          </Link>
          <ul className="hidden md:flex items-center">
            <Link to="/">
              <li className="p-4">Home</li>
            </Link>
            {!isAdmin && (
              <Link to="/request">
                <li className="p-4">Request</li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin">
                <li className="p-4">Dashboard</li>
              </Link>
            )}
            <Link to="/cart">
              <li className="">
                <button
                  type="button"
                  className="inline-flex border-none relative items-center text-sm font-medium text-center text-white rounded-lg bg-transparent"
                >
                  <FaShoppingCart size="20" />
                  <div className="inline-flex absolute -top-1 right-3 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full border border-white">
                    {quantity}
                  </div>
                </button>
              </li>
            </Link>
            {user ? (
              <li className="p-4 cursor-pointer" onClick={handleLogout}>
                Sign Out
              </li>
            ) : (
              <li className="p-4">Log In</li>
            )}
          </ul>
          <div onClick={handleNav} className="block md:hidden">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
          <ul
            className={
              nav
                ? "z-10 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-600 bg-[#060606f9] ease-in-out duration-500"
                : "ease-in-out duration-500 fixed left-[-100%]"
            }
          >
            <Link to="/">
              <h1 className="text-2xl text-blue-700  font-semibold font-display m-4">
                <span className="text-red-500">e</span>Pasa
                <span className="text-red-500">Buy</span>Mo
              </h1>
            </Link>
            <Link to="/">
              <li className="p-4 border-b border-gray-600">Home</li>
            </Link>
            {!isAdmin && (
              <Link to="/request">
                <li className="p-4 border-b border-gray-600">Request</li>
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin">
                <li className="p-4 border-b border-gray-600">Dashboard</li>
              </Link>
            )}
            <Link to="/cart">
              <li className="py-3 border-b border-gray-600">
                <button
                  type="button"
                  className="inline-flex border-none relative items-center text-sm font-medium text-center text-white rounded-lg bg-transparent"
                >
                  <FaShoppingCart size="20" />
                  <div className="inline-flex absolute -top-1 right-3 justify-center items-center w-4 h-4 text-xs text-white bg-red-500 rounded-full border border-white">
                    {quantity}
                  </div>
                </button>
              </li>
            </Link>
            {user ? (
              <li className="p-4 cursor-pointer" onClick={handleLogout}>
                Sign Out
              </li>
            ) : (
              <li className="p-4">Log In</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
