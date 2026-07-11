import Navbar from "../components/Navbar";
import { MdAdd, MdRemove } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../utils/RequestMethods";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import { clearCart, removeFromCart } from "../redux/cartSlice";
import Footer from "../components/Footer";

const CartList = () => {
  const KEY =
    "pk_test_51MM3KoEhgEi0nfyIYpjJU1zadGwt90LD2pL7ZKaLBwcWXC4m4eEHbjdrfmWEgrGL4nF7fLEwtZU3O6mEdFkFO8IT00Snd11oi9";
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/", { data: res.data });
        toast.success("Payment successful");
        dispatch(clearCart());
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate, dispatch]);

  const handleRemove = () => {
    dispatch(removeFromCart());
  };

  return (
    <div>
      <Navbar />
      {/* wrapper below */}
      <div className="p-5 min-h-[90vh]">
        <h1 className="text-center text-4xl m-8 font-black">MY CART</h1>
        {/* bottom below */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          {/* info below */}
          <div className="flex-[4]">
            {/* product below */}
            {cart.products.map((product) => (
              <div key={product._id}>
                <div className="flex justify-between mb-6" key={product._id}>
                  {/* product detail below*/}
                  <div className="flex flex-col md:flex-row flex-[3] gap-8">
                    <img className="w-[300px]" src={product.img} alt="" />
                    <div className="flex flex-col justify-center gap-4 p-5">
                      <div className="flex gap-2 flex-col">
                        <span className="font-bold">Product:</span>
                        <span>{product.name}</span>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <span className="font-bold">Product ID:</span>
                        <span>{product._id}</span>
                      </div>
                      <div className="flex items-center justify-start gap-2">
                        <div className="font-extralight text-3xl">
                          ₱ {product.price * product.quantity}
                        </div>
                        <div className="flex items-center">
                          <MdRemove size="24" />
                          <div className="w-8 h-8 rounded-full bg-slate-200 border-[1px] border-solid border-slate-500 flex items-center justify-center m-2">
                            {product.quantity}
                          </div>
                          <MdAdd size="24" />
                        </div>
                      </div>
                      <button
                        onClick={handleRemove}
                        className="w-1/2 py-2 px-4 text-[#060606] font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="my-3" />
              </div>
            ))}
          </div>
          {/* SUMMARY here */}
          <div className="flex-[2] h-[50vh] border-[0.5px] border-solid border-gray-100 rounded-xl p-5 flex flex-col justify-around">
            <h1 className="font-extralight">Order Summary</h1>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span> ₱ {cart.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span> ₱ {cart.total * 0.1}</span>
            </div>
            <div className="my-8 flex justify-between font-medium text-2xl">
              <span>Total</span>
              <span> ₱ {cart.total + cart.total * 0.1} </span>
            </div>
            <StripeCheckout
              name="ePasaBuyMo"
              image="https://imgs.search.brave.com/JXNFUf4KZGv98qb7sulTH7XHhjzMkoEY3GAre1WbIOs/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5K/cGJRT1B5SnByVDdt/NnRXRWpvNGRBSGFI/YSZwaWQ9QXBp"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <button className="w-full py-2 px-4 bg-[#060606] text-white font-semibold">
                CHECKOUT
              </button>
            </StripeCheckout>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartList;
