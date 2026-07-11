import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductFailure,
  deleteProductSuccess,
  deleteProductStart,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productSlice";
import { publicRequest, userRequest } from "../utils/RequestMethods";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Successfully logged in");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
    toast.success("Product deleted successfully");
  } catch (err) {
    dispatch(deleteProductFailure());
    toast.error("Failed to delete product");
  }
};

export const updateProduct = async (product, id, dispatch) => {
  dispatch(updateProductStart());
  try {
    await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product }));
    toast.success("Product updated successfully");
  } catch (err) {
    dispatch(updateProductFailure(err));
    toast.error("Updating product failed");
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    toast.success("Product added successfully");
  } catch (err) {
    dispatch(addProductFailure());
    toast.error("Adding product failed");
  }
};
