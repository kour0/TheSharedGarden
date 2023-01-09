import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { request } from '../utils/axios-utils';

/**
 * It creates a plot in the garden
 * @param gardenId - the id of the garden we want to create a plot for
 * @param queryClient - The query client that will be used to invalidate the query.
 */
export const createPlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (units) => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/plot`, method: 'post', data: { units } });

        toast.success('Plot created');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('modelisation');
      },
    },
  );

  return response;
};

/**
 * It sends a request to the API to edit a plot, and then invalidates the cache of the modelisation
 * query
 * @param gardenId - the id of the garden
 * @param queryClient - The query client that will be used to invalidate the query.
 * @returns A function that takes in a gardenId and a queryClient and returns a response.
 */
export const editPlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plot.plot_id}`,
          method: 'PATCH',
          data: { units: plot.units },
        });

        toast.success('Plot edited');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('modelisation');
      },
    },
  );

  return response;
};

/**
 * It updates the name of a plot in the database and invalidates the query that fetches the plots
 * @param gardenId - the id of the garden
 * @param queryClient - the query client that will be used to invalidate the query.
 * @returns A function that takes in a gardenId and a queryClient and returns a response.
 */
export const updateNamePlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plot.plot_id}`,
          method: 'PATCH',
          data: { name: plot.plot_name },
        });
        toast.success('Plot name edited');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('modelisation');
      },
    },
  );

  return response;
};

/**
 * It deletes a plot from the database and invalidates the query that fetches the plots
 * @param gardenId - the id of the garden
 * @param queryClient - The query client that will be used to invalidate the query.
 * @returns A function that takes a plotId and returns a promise that resolves to the response data.
 */
export const deletePlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plotId) => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/plot/${plotId}`, method: 'delete' });
        toast.success('Plot deleted');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('modelisation');
      },
    },
  );

  return response;
};

/**
 * It fetches the plots of a garden and sets them in the state
 * @param gardenId - the id of the garden we want to get the plots from
 * @param setPlots - a function that will be called with the data returned by the request.
 * @returns The response of the request.
 */
export const getPlots = (gardenId, setPlots) => {
  const navigate = useNavigate();
  const response = useQuery(
    ['modelisation', gardenId],
    async () => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/plot`, method: 'get' });
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: (data) => {
        setPlots(data);
      },
      onError: () => {
        navigate('/app/dashboard');
      },
    },
  );
  return response;
};

/**
 * It returns the vegetable of a plot
 * @param gardenId - the id of the garden
 * @param plotId - the id of the plot
 * @returns The response is being returned.
 */
export const getPlotVegetable = (gardenId, plotId) => {
  const response = useQuery(['modelisation', gardenId, plotId], async () => {
    try {
      const response = await request({ url: `/api/garden/${gardenId}/plot/${plotId}/vegetable`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  return response;
};

/**
 * It's a hook that returns a function that, when called, will modify the vegetable of a plot
 * @param gardenId - the id of the garden
 * @param queryClient - The query client that will be used to invalidate the query.
 * @returns A function that takes in a gardenId and a queryClient and returns a response.
 */
export const modifyPlotVegetable = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plot.plot_id}/modifyvegetable`,
          method: 'PATCH',
          data: { vegetable: plot.id },
        });
        toast.success('Plot vegetable edited');
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('modelisation');
      },
    },
  );

  return response;
};
