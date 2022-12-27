import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
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

export const getGarden = (gardenId) => {
  const response = useQuery(['garden', gardenId], async () => {
    try {
      const response = await request({ url: `/api/garden/${gardenId}`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};

export const searchGardens = (gardenName) => {
  const response = useQuery(['garden', gardenName], async () => {
    try {
      const response = await request({ url: `/api/garden/name/${gardenName}`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};

export const createPlot = (gardenId) => {
  const response = useMutation(['modelisation', gardenId], async (units) => {
    try {
      console.log('units');
      console.log(units);
      const response = await request({ url: `/api/garden/${gardenId}/modeling`, method: 'post', data: { units } });

      toast.success('Plot created');
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });

  return response;
};
