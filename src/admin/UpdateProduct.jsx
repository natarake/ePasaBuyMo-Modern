import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { uploadFileToStorage } from '../utils/uploadFile';
import { useProduct, useUpdateProduct } from '../queries/productQueries';

export default function UpdateProduct() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const id = product?._id;

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const updateProductMutation = useUpdateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategories = (e) => {
    setCat(e.target.value.split(','));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !product) {
      return;
    }

    uploadFileToStorage({
      file,
      onProgress: (progress, state) => {
        console.log(`Upload is ${progress}% done`, state);
      },
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (downloadURL) => {
        const updatedProduct = {
          ...inputs,
          _id: id,
          img: downloadURL,
          categories: cat,
        };
        updateProductMutation.mutate(
          { id, product: updatedProduct },
          {
            onSuccess: () => navigate('/admin'),
            onError: (error) => console.error(error),
          }
        );
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-0 sm:p-5">
        <h1 className="text-3xl font-extrabold text-center">Product Information Update</h1>

        {isLoading && <div className="p-5 text-center">Loading product...</div>}
        {isError && (
          <div className="p-5 text-center text-red-500">
            Error loading product: {error?.message || 'Unknown error'}
          </div>
        )}
        {!product && !isLoading && !isError ? (
          <div className="p-5 text-center">Product not found.</div>
        ) : null}
        {product ? (
          <div className="p-5 m-5 shadow-xl flex flex-col items-center">
            <img src={product.img} alt="" />
            <div className="mt-2">
              <div className="flex flex-col sm:flex-row items-start justify-start">
                <span className="mr-4">Product Name:</span>
                <span className="font-semibold text-sm md:text-lg">{product.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-start">
                <span className="mr-4">Product ID:</span>
                <span className="font-semibold text-sm md:text-lg">{product._id}</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-start">
                <span className="mr-4">In Stock:</span>
                <span className="font-semibold text-sm md:text-lg">
                  {product.inStock ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {product ? (
          <div className="p-5 m-5 shadow-xl ">
            <form className="flex justify-between flex-col md:flex-row gap-4">
              <div className="flex md:flex-col w-full flex-1">
                <div className="flex flex-col w-full">
                  <label htmlFor="name">Product Name</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    className="mb-4 border-none p-1"
                    style={{ borderBottom: '1px solid gray' }}
                    type="text"
                    id="name"
                    placeholder={product.name}
                  />

                  <label htmlFor="desc">Product Description</label>
                  <input
                    name="desc"
                    onChange={handleChange}
                    className="mb-4 border-none p-1"
                    style={{ borderBottom: '1px solid gray' }}
                    type="text"
                    id="desc"
                    placeholder={product.desc}
                  />

                  <label htmlFor="price">Product Price</label>
                  <input
                    name="price"
                    onChange={handleChange}
                    className="mb-4 border-none p-1"
                    style={{ borderBottom: '1px solid gray' }}
                    type="text"
                    id="price"
                    placeholder={product.price}
                  />

                  <label htmlFor="category">Category</label>
                  <input
                    className="mb-4 border-none p-1"
                    style={{ borderBottom: '1px solid gray' }}
                    type="text"
                    id="category"
                    placeholder={product.categories}
                    onChange={handleCategories}
                  />

                  <label htmlFor="inStock">In Stock</label>
                  <select
                    className="border-none p-1"
                    style={{ borderBottom: '1px solid gray' }}
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
                  <img src={product.img} alt="" className="object-cover mr-5 mb-2" />
                  <label className="cursor-pointer underline italic" htmlFor="file">
                    Update Product Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={updateProductMutation.isPending}
                  className="w-1/2 border-none p-2 rounded-lg bg-blue-700 text-white font-semibold cursor-pointer disabled:opacity-70"
                >
                  {updateProductMutation.isPending ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}
