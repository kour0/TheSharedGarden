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

export const createPlot = (gardenId, queryClient) => {
  const response = useMutation(
    ['modelisation', gardenId],
    async (units) => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/modeling`, method: 'post', data: { units } });

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
          url: `/api/garden/${gardenId}/modeling/${plot.plot_id}`,
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
          url: `/api/garden/${gardenId}/modeling/${plot.plot_id}`,
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
        const response = await request({ url: `/api/garden/${gardenId}/modeling/${plotId}`, method: 'delete' });
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

export const getPlots = (gardenId, setPlots, navigate) => {
  const response = useQuery(
    ['modelisation', gardenId],
    async () => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}/plots`, method: 'get' });
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
      }
    },
  );
  return response;
};

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
