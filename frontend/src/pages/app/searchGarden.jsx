import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { request } from '../../utils/axios-utils';

export default function SearchGarden() {
  const { gardenName } = useParams();
  const { data, isLoading, isError } = useQuery(['garden', gardenName], async () => {
    try {
      const response = await request({ url: `/api/garden/${gardenName}`, method: 'get' });
      return response.data;
    } catch (error) {
      console.warn(error?.data?.message);
    }
  });
  console.log(data);
  return !isLoading ? (
    <div>
      <h1>Search Garden</h1>
      <p>
        {data.map((garden) => {
          return (
            <div key={garden.id}>
              <h2>{garden.name}</h2>
              <p>{garden.street_address}</p>
            </div>
          );
        })}
      </p>
    </div>
  ) : (
    <></>
  );
}
