import { useQuery } from '@tanstack/react-query';
import { request } from '../utils/axios-utils';

/**
 * It returns the map
 * @returns A function that returns a response object : data, isloading...
 */
export const getMap = () => {
  const response = useQuery(['Map'], async () => {
    const response = await request({ url: '/api/map', method: 'get', responseType: 'blob', staleTime : 0, refetchOnWindowFocus: 'always' });
    return response.data;
  });
  return response;
};
