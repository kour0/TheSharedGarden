import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../utils/axios-utils';

export const getProfile = () => {
  const response = useQuery(['profile'], async () => {
    const response = await request({ url: '/api/profile/', method: 'get' });
    return response.data;
  });
  return response;
};

export const getProfileImage = (id = undefined) => {
  const response = useQuery(['profileImage', id],async () => {
    const url = id ? `/api/profile/${id}/image` : '/api/profile/image';

    const response = await request({ url: url, method: 'get' , responseType: 'blob'});
    return response.data;
  });
  return response;
};

export const patchProfile = (queryClient) => {
  const mutation = useMutation(['profile'], async (formData) => {
    const response = await request({ url: '/api/profile', method: 'patch', data: formData });
    toast.success('Profile updated');
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile');
    },
  });
  return mutation;
};

export const patchProfilePersonnalInformations = (queryClient) => {
  const mutation = useMutation(
    ['profile'],
    async (formData) => {
      const response = await request({ url: '/api/profile', method: 'patch', data: formData });
      toast.success('Profile updated');
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('profile');
      },
    },
  );
  return mutation;
};
