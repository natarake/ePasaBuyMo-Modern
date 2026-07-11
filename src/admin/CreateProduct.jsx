import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { uploadFileToStorage } from '../utils/uploadFile';
import { useCreateProduct } from '../queries/productQueries';

const CreateProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategories = (e) => {
    setCat(e.target.value.split(','));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
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
        const product = { ...inputs, img: downloadURL, categories: cat };
        createProductMutation.mutate(product, {
          onSuccess: () => navigate('/admin'),
          onError: (error) => console.error(error),
        });
      },
    });
  };
  return (
    <>
      <Navbar />
      <div className="my-5 min-h-[90vh]">
        <h1 className="text-3xl font-extrabold text-center">Add New Product</h1>
        <form className="p-5 m-5 shadow-xl flex flex-col items-center justify-around">
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>Upload Product Image</label>
            <input
              type="file"
              id="file"
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>Name</label>
            <input
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              name="name"
              type="text"
              placeholder="Kopiko Brown"
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>Desciption</label>
            <input
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              name="desc"
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>Price</label>
            <input
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>Categories</label>
            <input
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              type="text"
              placeholder="Sardines,Corned Beef"
              onChange={handleCategories}
            />
          </div>
          <div className="w-full md:w-1/2  flex flex-col mb-2">
            <label>In Stock</label>
            <select
              style={{ borderBottom: '1px solid gray', padding: '5px' }}
              onChange={handleChange}
              name="inStock"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={createProductMutation.isPending}
            className="w-1/4 border-none p-2 rounded-lg bg-blue-700 text-white font-semibold cursor-pointer mt-2 disabled:opacity-70"
          >
            {createProductMutation.isPending ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateProduct;
