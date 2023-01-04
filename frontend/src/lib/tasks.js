import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../utils/axios-utils';

export const getTasks = (gardenId, plotId) => {
    const response = useQuery(['tasks', gardenId, plotId], async () => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/${plotId}/tasks`, method: 'get' });
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    });
    return response;
  };
  
  export const addTask = (gardenId, plotId, queryClient) => {
    const response = useMutation(
      ['tasks', gardenId, plotId],
      async (task) => {
        try {
          const response = await request({ url: `/api/garden/${gardenId}/${plotId}/tasks`, method: 'post', data: task });
          toast.success('Task created');
          return response.data;
        } catch (error) {
          console.warn(error?.data?.message);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },
      },
    );
    return response;
  };
  
  export const deleteTask = (gardenId, plotId, queryClient) => {
    const response = useMutation(
      ['tasks', gardenId, plotId],
      async (taskId) => {
        try {
          const response = await request({ url: `/api/garden/${gardenId}/${plotId}/tasks/${taskId}`, method: 'delete' });
          toast.success('Task deleted');
          return response.data;
        } catch (error) {
          console.warn(error?.data?.message);
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },
      },
    );
  
    return response;
  };


  
export const getPlants = () => {
  const response = useQuery(['plants'], async () => {
    try {
      const response = await request({ url: `/api/garden/plants`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};

export const patchPlant = (gardenId, plotId, queryClient) => {
  const response = useMutation(
    ['plants', gardenId, plotId],
    async (plant) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/${plotId}/plants/${plant.id}`,
          method: 'PATCH',
          data: plant,
        });

        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('plants');
      },
    },
  );
  return response;
};