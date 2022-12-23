import { useQuery } from '@tanstack/react-query';
import { request } from '../../utils/axios-utils';

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
