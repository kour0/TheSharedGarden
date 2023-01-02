import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { request } from '../../utils/axios-utils';
import { useState } from 'react';

export function GardenCard({ garden }) {
  // const image_url = 'http://127.0.0.1:5454/api/garden/' + garden.name + '/image';

  const [gardenPicture, setGardenPicture] = useState(null)
  const [profilePicture, setProfilePicture] = useState(null)

  const {
    isLoading: imageLoadingGarden,
    isError: imageisErrorGarden,
    data: imageDataGarden,
    error: imageErrorGarden,
  } = useQuery([garden.id+'Image'], async () => {
    const response = await request({ url: '/api/garden/'+garden.id+'/image', method: 'get', responseType: 'blob' });
    return response.data;
  });

  const {
    isLoading: imageLoadingProfile,
    isError: imageisErrorProfile,
    data: imageDataProfile,
    error: imageErrorProfile,
  } = useQuery(['profileImage'], async () => {
    const response = await request({ url: '/api/profile/image', method: 'get', responseType: 'blob' });
    return response.data;
  });

  if (!imageLoadingGarden && !imageisErrorGarden && !imageLoadingProfile && !imageisErrorProfile) {
    const readerGarden = new FileReader();
    readerGarden.onload = (e) => setGardenPicture(e.target.result);
    readerGarden.readAsDataURL(imageDataGarden);
    const readerProfile = new FileReader();
    readerProfile.onload = (e) => setProfilePicture(e.target.result);
    readerProfile.readAsDataURL(imageDataProfile);
  }

  return !imageLoadingGarden && !imageisErrorGarden && !imageLoadingProfile && !imageisErrorProfile ? (
    <>
    <Link to={`/app/dashboard/${garden.id}`} relative="path" className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={gardenPicture} alt="" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-xl font-semibold text-gray-900">{garden.name}</p>
          <p className="mt-3 text-base text-gray-500">
            {garden.street_address +
              ', ' +
              garden.city +
              ', ' +
              garden.country +
              ', ' +
              garden.postal_code +
              ', ' +
              garden.province}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{garden.owner.username}</span>
            <img className="h-10 w-10 rounded-full" src={profilePicture} alt="" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{garden.owner.username}</p>
            <div className="flex space-x-1 text-sm text-gray-500">
              {/* <time dateTime={garden.datetime}>Crée le {garden.date}</time> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
</>)
    :
    (
    <></>
    );
}
