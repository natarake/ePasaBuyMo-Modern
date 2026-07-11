import { loginFailure, loginStart, loginSuccess } from './userSlice';
import { publicRequest } from '../utils/RequestMethods';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    toast.success('Successfully logged in');
  } catch (err) {
    dispatch(loginFailure());
  }
};
