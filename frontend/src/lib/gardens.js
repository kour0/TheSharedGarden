import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/axios-utils';

export const getGardens = () => {
  const response = useQuery(['garden'], async () => {
    try {
      const response = await request({ url: '/api/garden/', method: 'GET' });
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  });
  return response;
};

export const searchGardens = (gardenName) => {
  const response = useQuery(['garden', gardenName], async () => {
    try {
      const response = await request({ url: `/api/garden/${gardenName}`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};