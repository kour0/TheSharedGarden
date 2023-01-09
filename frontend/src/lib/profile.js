import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { request } from '../utils/axios-utils';

/**
 * It returns a response object that contains the data from the API call
 * @returns The response object is being returned.
 */
export const getProfile = () => {
  const response = useQuery(['profile'], async () => {
    const response = await request({ url: '/api/profile/', method: 'get' });
    return response.data;
  });
  return response;
};

/**
 * It returns a `useQuery` hook that fetches the profile image for the current user or the user with
 * the given id
 * @param [id] - The id of the user whose profile image you want to fetch. If you don't pass an id, it
 * will fetch the profile image of the current user.
 * @returns A function that returns a response object.
 */
export const getProfileImage = (id = undefined) => {
  const response = useQuery(['profileImage', id], async () => {
    const url = id ? `/api/profile/${id}/image` : '/api/profile/image';

    const response = await request({ url: url, method: 'get', responseType: 'blob' });
    return response.data;
  });
  return response;
};

/**
 * It returns a mutation function that, when called, will update the profile and invalidate the profile
 * query
 * @param queryClient - The query client that we're using to invalidate the query.
 * @returns A function that takes a formData object and returns a promise.
 */
export const patchProfile = (queryClient) => {
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

/**
 * It returns a function that will update the profile personnal informations
 * @param queryClient - The query client instance.
 * @returns A function that takes a formData object as an argument and returns a promise.
 */
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
