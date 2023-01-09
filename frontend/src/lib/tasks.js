import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../utils/axios-utils';

/**
 * It returns the tasks for a given plot
 * @param gardenId - The id of the garden
 * @param plotId - The id of the plot we want to get the tasks for.
 * @returns An object with the following properties:
 *   data: The data returned from the request
 *   error: The error returned from the request
 *   isFetching: A boolean indicating if the request is in progress
 *   isStale: A boolean indicating if the request is stale
 *   revalidate: A function to revalidate the request
 *   mutate: A function to mut
 */
export const getTasks = (gardenId, plotId) => {
  const response = useQuery(['tasks', gardenId, plotId], async () => {
    try {
      const response = await request({ url: `/api/garden/${gardenId}/plot/${plotId}/tasks`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};

/**
 * It creates a new task for a given plot
 * @param gardenId - The id of the garden that the task belongs to
 * @param plotId - The id of the plot that the task is being added to.
 * @param queryClient - This is the Apollo Client instance that we're using to make the request.
 * @returns A function that takes in a task and returns a promise that resolves to the created task.
 */
export const addTask = (gardenId, plotId, queryClient) => {
  const response = useMutation(
    ['tasks', gardenId, plotId],
    async (task) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plotId}/tasks`,
          method: 'post',
          data: task,
        });
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

/**
 * It deletes a task from the database and invalidates the `tasks` query
 * @param gardenId - The id of the garden that the task belongs to
 * @param plotId - The id of the plot that the task is associated with
 * @param queryClient - This is the Apollo Client instance that we're using to make the request.
 * @returns A function that takes in a taskId and returns a promise that resolves to the response data.
 */
export const deleteTask = (gardenId, plotId, queryClient) => {
  const response = useMutation(
    ['tasks', gardenId, plotId],
    async (taskId) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plotId}/tasks/${taskId}`,
          method: 'delete',
        });
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

/**
 * It returns a list of plants from the database
 * @returns response
 */
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

/**
 * It patches a plant in the database and invalidates the plants query
 * @param gardenId - The id of the garden that the plant belongs to
 * @param plotId - The id of the plot that the plant is in.
 * @param queryClient - The query client that we're using to invalidate the query.
 * @returns A function that takes in a plant object and returns a promise.
 */
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
