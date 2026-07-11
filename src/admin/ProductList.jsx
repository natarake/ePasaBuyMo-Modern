import { DataGrid } from '@material-ui/data-grid';
import {
  FaEdit,
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useDeleteProduct, useProducts } from '../queries/productQueries';

export default function ProductList() {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const rows = products;

  const handleDelete = (id) => {
    deleteProductMutation.mutate(id, {
      onError: (error) => console.error(error),
    });
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 200,
    },
    {
      field: 'product',
      headerName: 'Product Image',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover mr-[10px]"
              src={params.row.img}
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: 'inStock', headerName: 'Stock', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/products/' + params.row._id}>
              <FaEdit size={28} style={{ color: '#FFC300', cursor: 'pointer' }} />
            </Link>
            <MdDelete
              onClick={() => handleDelete(params.row._id)}
              size={30}
              className="text-red-500 cursor-pointer ml-4"
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="h-[55vh] sm:h-[65vh]">
      <div className="flex justify-end m-4">
        <Link to="/products">
          <button>Add +</button>
        </Link>
      </div>
      {isLoading && <div className="mx-4 mb-2 text-sm text-gray-600">Loading products...</div>}
      {isError && (
        <div className="mx-4 mb-2 text-sm text-red-500">
          Error loading products: {error?.message || 'Unknown error'}
        </div>
      )}
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />

      <footer className="bg-[#060606ef] fixed bottom-0 w-full">
        <div className="h-[50px] flex justify-center items-center text-teal-500 border-t-2 shadow-2xl border-slate-500 p-4">
          <ul className=" ">
            <li
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
            >
              <FaFacebookSquare className="h-4 w-4 rounded-full" />
            </li>
            <li
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
            >
              <FaTwitterSquare className="h-4 w-4 rounded-full" />
            </li>
            <li
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
            >
              <FaLinkedin className="h-4 w-4 rounded-full" />
            </li>
            <li
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
        duration-300 "
            >
              <FaInstagramSquare className="h-4 w-4 rounded-full" />
            </li>
          </ul>
        </div>
        <div className="text-white text-center border-t-[1px] border-slate-500 font-thin text-xs py-2 px-4 md:font-medium md:text-base">
          This project will not be possible without the help of Ms. Michelle from KodeGo <br />
          &copy; 2023 Glenn Ladrido - WD20P Student <br />
          All Rights Reserve
        </div>
      </footer>
    </div>
  );
}
