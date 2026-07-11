import Navbar from "../components/Navbar";
import { MdAdd, MdRemove } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../utils/RequestMethods";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { GrPrevious } from "react-icons/gr";

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
      toast.info("Quantity decreased");
    } else {
      setQuantity(quantity + 1);
      toast.info("Quantity increased");
    }
  };

  const handleClick = () => {
    // update cart
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <div>
      <Navbar />
      {/* wrapper below */}
      <div className="min-h-[90vh]">
        <div className="flex flex-col sm:flex-row justify-center items-center p-0 sm:p-12 ">
          {/* img container below*/}
          <div className="flex-1">
            <img
              className="w-full object-cover max-h-[600px] my-8"
              src={product.img}
              alt=""
            />
          </div>
          {/* info container below*/}
          <div className="flex-1 px-10">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <p className="my-4">{product.desc}</p>
            {/* add container below */}
            <div className="flex items-center w-full sm:w-1/2 justify-center my-4">
              <div className="flex items-center justify-start gap-4 w-full font-bold">
                <div>
                  <span className="font-thin text-xl">₱ {product.price}</span>
                </div>
                <div className="flex items-center justify-center">
                  <MdRemove onClick={() => handleQuantity("dec")} size="24" />
                  <span className="w-6 h-6 rounded-full bg-slate-200 border-[1px] border-solid border-slate-500 flex items-center justify-center m-2">
                    {quantity}
                  </span>
                  <MdAdd onClick={() => handleQuantity("inc")} size="24" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start sm:items-start">
              <button
                onClick={handleClick}
                className="py-2 mt-2 mb-4 border-none bg-red-500 text-white font-medium"
              >
                ADD TO CART
              </button>
            </div>
            <Link to="/">
              <div className="flex gap-2 items-center my-4 underline underline-offset-2">
                <GrPrevious />
                <p>Continue Shopping</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
