import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { MdAdd, MdRemove } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

const ProductItems = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <div className="bg-[#f5f5f5] border shadow-lg rounded-lg hover:scale-105 duration-300">
      <Link to={`product/${product._id}`}>
        <img
          src={product.img}
          alt={product.name}
          className="w-full object-cover max-h-[200px] rounded-t-lg cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-between gap-1 px-2 py-4 ">
        <div className="flex items-center gap-1">
          <p className="font-bold text-sm">{product.name}</p>
          <span className="text-xs bg-slate-300 rounded-full p-1">
            ₱{product.price}
          </span>
        </div>
        <div className="flex items-center justify-center p-0">
          <MdRemove onClick={() => handleQuantity("dec")} size="16" />
          <span className="w-4 h-4 rounded-full bg-slate-200 border-[1px] text-xs border-solid border-slate-500 flex items-center justify-center m-2">
            {quantity}
          </span>
          <MdAdd onClick={() => handleQuantity("inc")} size="16" />
        </div>
        <button
          onClick={handleClick}
          className="border-none bg-red-600 text-white p-2 rounded-full"
        >
          <FaShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductItems;
