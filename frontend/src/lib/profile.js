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

export const getProfilePicture = () => {
  const response = useQuery(['profileImage'], async () => {
    const response = await request({ url: '/api/profile/image', method: 'get', responseType: 'blob' });
    return response.data;
  });
  return response;
};

export const patchProfile = () => {
  const mutation = useMutation(['profile'], async (formData) => {
    const response = await request({ url: '/api/profile', method: 'patch', data: formData });
    toast.success('Profile updated');
    return response.data;
  });
  return mutation;
}

export const patchProfilePersonnalInformations = () => {
  const mutation = useMutation(['profile'], async (formData) => {
    const response = await request({ url: '/api/personnal_info', method: 'patch', data: formData });
    toast.success('Profile updated');
    return response.data;
  });
  return mutation;
}
