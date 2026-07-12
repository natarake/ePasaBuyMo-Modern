import { loginFailure, loginStart, loginSuccess } from './userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginService } from '../services/authService';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const data = await loginService(user);
    dispatch(loginSuccess(data));
    toast.success('Successfully logged in');
  } catch (err) {
    dispatch(loginFailure());
  }
};
