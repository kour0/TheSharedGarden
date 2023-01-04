import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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

export const createGarden = (queryClient) => {
  const navigate = useNavigate();
  const response = useMutation(
    ['garden'],
    async (garden) => {
      try {
        const response = await request({ url: '/api/garden/', method: 'post', data: garden });
        toast.success('Garden created');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('garden');
        navigate('/app/dashboard/' + data.garden_id);

      },
    },
  );

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


export const patchGarden = (queryClient, garden_id) => {
  const mutation = useMutation(['garden_' + garden_id], async (formData) => {
    const response = await request({ url: '/api/garden/' + garden_id, method: 'patch', data: formData });
    toast.success('Garden updated');
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('garden_' + garden_id);
    },
  });
  return mutation;
};

export const getGardenPicture = (garden_id) => {
  const response = useQuery(['gardenImage_' + garden_id], async () => {
    const response = await request({ url: '/api/garden/' + garden_id + '/image', method: 'get', responseType: 'blob' });
    return response.data;
  });
  return response;
};