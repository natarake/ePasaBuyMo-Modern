import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CartList from "./pages/CartList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import { useSelector } from "react-redux";
import Dashboard from "./admin/Dashboard";
import UpdateProduct from "./admin/UpdateProduct";
import CreateProduct from "./admin/CreateProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Request from "./pages/Request";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/products/:id" element={<UpdateProduct />} />
        <Route path="/products" element={<CreateProduct />} />
        <Route path="/request" element={<Request />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        ></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
