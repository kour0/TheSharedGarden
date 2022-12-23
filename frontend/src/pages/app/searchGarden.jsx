import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GardenCard } from '../../components/GardenCard';
import { Loader } from '../../components/loader/FullScreenLoader';
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
  return (
    <>
      {isLoading && <Loader />}
      {data && (
        <div className="relative bg-gray-50 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-28">
          <div className="absolute inset-0">
            <div className="h-1/3 bg-white sm:h-2/3" />
          </div>
          <div className="relative pt-3 lg:pt-8 mx-auto max-w-7xl">
            <div className="text-center mt-5">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Jardins</h2>
              <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                Liste de jardins qui semblent correspondre à votre recherche.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
              {data.map((garden, index) => (
                <GardenCard key={index} garden={garden}></GardenCard>
              ))}
            </div>
          </div>
        </div>
        
      )}
    </>
  );
}
