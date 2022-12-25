import { useQuery } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

export const getMap = () => {
  const response = useQuery(['Map'], async () => {
    const response = await request({ url: '/api/map', method: 'get', responseType: 'blob' });
    return response.data;
  });
  return response;
}