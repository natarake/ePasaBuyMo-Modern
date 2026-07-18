import { useMemo, useState } from 'react';
import ProductItems from './ProductItems.jsx';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import { useProducts } from '../queries/productQueries';
import { Button } from './ui/button';

const Products = () => {
  const [cat, setCat] = useState('');
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 12;
  const { data: products = [], isLoading, isError, error } = useProducts(cat);

  const pageCount = useMemo(
    () => Math.ceil(products.length / productPerPage),
    [products, productPerPage]
  );

  const paginatedProducts = useMemo(() => {
    const pagesVisited = pageNumber * productPerPage;
    return products.slice(pagesVisited, pagesVisited + productPerPage);
  }, [pageNumber, productPerPage, products]);

  const displayUsers = useMemo(
    () => paginatedProducts.map((product) => <ProductItems product={product} key={product._id} />),
    [paginatedProducts]
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleClick = (category) => {
    setCat(category);
    setPageNumber(0);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCat(search);
    setPageNumber(0);
  };

  // reset category

  const handleReset = () => {
    setCat('');
    setPageNumber(0);
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-8">
      <h1 className="text-red-500 font-bold text-4xl text-center">Best-Selling Products</h1>

      <div className="flex flex-col justify-between items-start mt-4">
        <div className="flex-[2]">
          <p className="font-bold text-gray-700">Filter by Category</p>
          <div className="flex justfiy-between flex-wrap pt-2">
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
            >
              All
            </Button>
            <Button
              onClick={() => handleClick('Grocery')}
              variant="outline"
              size="sm"
            >
              Grocery
            </Button>
            <Button
              onClick={() => handleClick('Fast Food')}
              variant="outline"
              size="sm"
            >
              Fast Food
            </Button>
            <Button
              onClick={() => handleClick('Fashion')}
              variant="outline"
              size="sm"
            >
              Fashion
            </Button>
            <Button
              onClick={() => handleClick('Gadgets')}
              variant="outline"
              size="sm"
            >
              Gadgets
            </Button>
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

      {isLoading && <p className="text-center text-gray-600 mt-8">Loading products...</p>}
      {isError && (
        <p className="text-center text-red-500 mt-8">
          {error?.message || 'Failed to load products.'}
        </p>
      )}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {displayUsers}
        </div>
      )}
      <ReactPaginate
        previousLabel={<GrPrevious />}
        nextLabel={<GrNext />}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'flex justify-center mt-8'}
        pageClassName={'flex items-center justify-center p-0 w-[30px]'}
        previousLinkClassName={'flex items-center p-1'}
        nextLinkClassName={'flex items-center p-1'}
        activeClassName={'border rounded-full bg-blue-700 text-white'}
      />
    </div>
  );
};

export default Products;
