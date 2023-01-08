import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { request } from '../utils/axios-utils';

/**
 * Fetches all gardens of the user
 * @returns {Object} response
 */
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

/**
 * Fetches a single garden by id
 * @param {String} gardenId
 * @returns {Object} response
 */
export const getGarden = (gardenId) => {
  const navigate = useNavigate();
  const response = useQuery(
    ['garden', gardenId],
    async () => {
      try {
        const response = await request({ url: `/api/garden/${gardenId}`, method: 'get' });
        return response.data;
      } catch (error) {
        console.warn(error?.data?.message);
      }
    },
    {
      onError: () => {
        navigate('/app/dashboard');
      },
    },
  );
  return response;
};

/**
 * Creates a new garden
 * @param {Object} queryClient - The queryClient
 * @returns {Object} response
 */
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

/**
 * Searches for gardens by name
 * @param {String} gardenName - The name of the garden
 * @returns {Object} response - The garden(s) or null if not found
 */
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

/**
 * Updates a garden
 * @param {Object} queryClient - The queryClient
 * @param {String} garden_id - The id of the garden
 * @returns {Object} response
 */
export const patchGarden = (queryClient, garden_id) => {
  const mutation = useMutation(
    ['garden', garden_id],
    async (formData) => {
      const response = await request({ url: '/api/garden/' + garden_id, method: 'patch', data: formData });
      toast.success('Garden updated');
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('garden', garden_id);
      },
    },
  );
  return mutation;
};

/**
 * Deletes a garden
 * @param {Object} queryClient - The queryClient
 * @param {String} garden_id - The id of the garden
 * @returns {Object} response
 */
export const deleteGarden = (queryClient, garden_id) => {
  const navigate = useNavigate();
  const response = useMutation(
    ['garden'],
    async () => {
      const response = await request({ url: '/api/garden/' + garden_id, method: 'delete' });
      toast.success('Garden deleted');
      return response.data;
    },
    {
      onSuccess: () => {
        navigate('/app/dashboard/');
      },
    },
  );
  return response;
};

/**
 * Fetches the picture of a garden
 * @param {String} garden_id - The id of the garden
 * @returns {Blob} response - The garden picture
 */
export const getGardenPicture = (garden_id) => {
  const response = useQuery(['gardenImage_' + garden_id], async () => {
    const response = await request({ url: '/api/garden/' + garden_id + '/image', method: 'get', responseType: 'blob' });
    return response.data;
  });
  return response;
};


/**
 * Fetches the members of a garden
 * @param {String} garden_id - The id of the garden
 * @returns {Object} response - The garden members
 */
export const getGardenMembers = (garden_id) => {
  const response = useQuery(['gardenMembers_' + garden_id], async () => {
    const response = await request({ url: '/api/garden/' + garden_id + '/members', method: 'get' });
    return response.data;
  });
  return response;
}

export const deleteGardenMember = (queryClient, garden_id, user_id) => {
  const response = useMutation(
    ['gardenMembers_' + garden_id],
    async () => {
      const response = await request({ url: '/api/garden/' + garden_id + '/members/' + user_id, method: 'delete' });
      toast.success('Member deleted');
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gardenMembers_' + garden_id);
      },
    },
  );
  return response;
}

export const joinGarden = (queryClient) => {
  const response = useMutation(
    ['garden'],
    async (garden_id) => {
      const response = await request({ url: `/api/garden/join/${garden_id}`, method: 'post' });
      toast.success('Joined garden');
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('garden');
      },
    },
  );
  return response;
}
