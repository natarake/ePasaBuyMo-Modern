import { publicRequest } from '../utils/RequestMethods';

export const loginService = async (user) => {
  const { data } = await publicRequest.post('/auth/login', user);
  return data;
};

export const registerService = async (user) => {
  const { data } = await publicRequest.post('auth/register', user);
  return data;
};
