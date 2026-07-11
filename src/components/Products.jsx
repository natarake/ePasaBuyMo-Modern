import { useEffect, useState } from "react";
import ProductItems from "./ProductItems.jsx";
import { userRequest } from "../utils/RequestMethods";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BsSearch } from "react-icons/bs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 12;
  const pagesVisited = pageNumber * productPerPage;
  const displayUsers = products
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((product) => {
      return <ProductItems product={product} key={product._id} />;
    });
  const pageCount = Math.ceil(products.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleClick = (category) => {
    setCat(category);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.get(`/products?category=${search}`);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // filter by category
  useEffect(() => {
    const filterByCategory = async () => {
      try {
        const res = await userRequest.get(`/products?category=${cat}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    filterByCategory();
  }, [cat]);

  // get products from backend server
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  // reset category

  const handleReset = () => {
    setCat("");
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-8">
      <h1 className="text-red-500 font-bold text-4xl text-center">
        Best-Selling Products
      </h1>

      <div className="flex flex-col justify-between items-start mt-4">
        <div className="flex-[2]">
          <p className="font-bold text-gray-700">Filter by Category</p>
          <div className="flex justfiy-between flex-wrap pt-2">
            <button
              onClick={handleReset}
              className="m-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => handleClick("Grocery")}
              className="m-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Grocery
            </button>
            <button
              onClick={() => handleClick("Fast Food")}
              className="m-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Fast Food
            </button>
            <button
              onClick={() => handleClick("Fashion")}
              className="m-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Fashion
            </button>
            <button
              onClick={() => handleClick("Gadgets")}
              className="m-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Gadgets
            </button>
          </div>
        </div>
        <div className="flex-1 relative mt-4">
          <label htmlFor="search" className="font-light text-gray-500">
            Looking for something specific?
          </label>
          <input
            onChange={handleChange}
            value={search}
            id="search"
            type="text"
            className="border border-red-500 focus:outline-none rounded-xl p-2 w-full"
          />
          <BsSearch
            onClick={handleSearch}
            className="absolute top-8 right-4 text-red-500 text-2xl"
          />
        </div>
      </div>

      {/* Display foods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {/* {products.map((product) => (
          <ProductItems product={product} key={product._id} />
        ))} */}
        {displayUsers}
      </div>
      <ReactPaginate
        previousLabel={<GrPrevious />}
        nextLabel={<GrNext />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"flex justify-center mt-8"}
        pageClassName={"flex items-center justify-center p-0 w-[30px]"}
        previousLinkClassName={"flex items-center p-1"}
        nextLinkClassName={"flex items-center p-1"}
        activeClassName={"border rounded-full bg-blue-700 text-white"}
      />
    </div>
  );
};

export default Products;
