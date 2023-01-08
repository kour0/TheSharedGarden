import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { request } from '../utils/axios-utils';

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

export const editPlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      try {
        console.log(plot);
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

export const updateNamePlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      console.log(plot);
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

export const getPlotVegetable = (gardenId, plotId) => {
  const response = useQuery(
    ['modelisation', gardenId],
    async () => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/plot/${plotId}/vegetable`, method: 'get' });
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
  );
  return response;
};


export const modifyPlotVegetable = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (plot) => {
      try {
        const response = await request({
          url: `/api/garden/${gardenId}/plot/${plot.plot_id}/modifyvegetable`,
          method: 'PATCH',
          data: { vegetable: plot.cultivated_vegetable },
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
}
