import { userRequest } from '../utils/RequestMethods';

export const processPaymentService = async (tokenId, amount) => {
  const { data } = await userRequest.post('checkout/payment', {
    tokenId,
    amount,
  });
  return data;
};
