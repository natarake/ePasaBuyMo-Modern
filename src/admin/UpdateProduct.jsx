import Navbar from "../components/Navbar";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import app from "../firebase/Firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProduct } from "../redux/apiCalls";
import Footer from "../components/Footer";

export default function UpdateProduct() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const id = product._id;
  // console.log(id);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            _id: id,
            img: downloadURL,
            categories: cat,
          };
          // console.log(product);
          updateProduct(product, id, dispatch);
          navigate("/admin");
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-0 sm:p-5">
        <h1 className="text-3xl font-extrabold text-center">
          Product Information Update
        </h1>

        <div className="p-5 m-5 shadow-xl flex flex-col items-center">
          <img src={product.img} alt="" />
          <div className="mt-2">
            <div className="flex flex-col sm:flex-row items-start justify-start">
              <span className="mr-4">Product Name:</span>
              <span className="font-semibold text-sm md:text-lg">
                {product.name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-start">
              <span className="mr-4">Product ID:</span>
              <span className="font-semibold text-sm md:text-lg">
                {product._id}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-start">
              <span className="mr-4">In Stock:</span>
              <span className="font-semibold text-sm md:text-lg">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 m-5 shadow-xl ">
          <form className="flex justify-between flex-col md:flex-row gap-4">
            <div className="flex md:flex-col w-full flex-1">
              <div className="flex flex-col w-full">
                <label htmlFor="name">Product Name</label>
                <input
                  name="name"
                  onChange={handleChange}
                  className="mb-4 border-none p-1"
                  style={{ borderBottom: "1px solid gray" }}
                  type="text"
                  id="name"
                  placeholder={product.name}
                />

                <label htmlFor="desc">Product Description</label>
                <input
                  name="desc"
                  onChange={handleChange}
                  className="mb-4 border-none p-1"
                  style={{ borderBottom: "1px solid gray" }}
                  type="text"
                  id="desc"
                  placeholder={product.desc}
                />

                <label htmlFor="price">Product Price</label>
                <input
                  name="price"
                  onChange={handleChange}
                  className="mb-4 border-none p-1"
                  style={{ borderBottom: "1px solid gray" }}
                  type="text"
                  id="price"
                  placeholder={product.price}
                />

                <label htmlFor="category">Category</label>
                <input
                  className="mb-4 border-none p-1"
                  style={{ borderBottom: "1px solid gray" }}
                  type="text"
                  id="category"
                  placeholder={product.categories}
                  onChange={handleCategories}
                />

                <label htmlFor="inStock">In Stock</label>
                <select
                  className="border-none p-1"
                  style={{ borderBottom: "1px solid gray" }}
                  name="inStock"
                  id="inStock"
                  onChange={handleChange}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-col justify-around items-center flex-1">
              <div className="flex flex-col items-center mb-2">
                <img
                  src={product.img}
                  alt=""
                  className="object-cover mr-5 mb-2"
                />
                <label
                  className="cursor-pointer underline italic"
                  htmlFor="file"
                >
                  Update Product Image
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-1/2 border-none p-2 rounded-lg bg-blue-700 text-white font-semibold cursor-pointer "
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
