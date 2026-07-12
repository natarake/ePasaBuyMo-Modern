import { userRequest } from '../utils/RequestMethods';

export const submitRequestService = async (request) => {
  const { data } = await userRequest.post('request', request);
  return data;
};
