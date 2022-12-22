import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';


const client = axios.create({ baseURL: 'http://127.0.0.1:5454'});

export const request = async ({ ...options }) => {
  try {
    const token = Cookies.get('token');
    if (token) {
      client.defaults.headers.common['x-access-token'] = `${token}`;
    }
    const response = await client(options);
    return response;
  } catch (error) {
    toast.error(error?.response.data?.message);
  }

};
