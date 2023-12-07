import { TrashIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteGardenMember } from '../lib/gardens';
import { getProfileImage } from '../lib/profile';

export default function MemberCard({ member, gardenId, isManager }) {
  const queryClient = useQueryClient();

  const [profilePicture, setProfilePicture] = useState(null);

  const {
    isLoading: imageLoadingProfile,
    isError: imageisErrorProfile,
    data: imageDataProfile,
    error: imageErrorProfile,
  } = getProfileImage(member.id);

  const deleteMember = deleteGardenMember(queryClient, gardenId, member.id);

  const handleDelete = () => {
    deleteMember.mutate();
  };

  if (!imageLoadingProfile && !imageisErrorProfile) {
    const readerProfile = new FileReader();
    readerProfile.onload = (e) => setProfilePicture(e.target.result);
    readerProfile.readAsDataURL(imageDataProfile);
  }

  return !imageLoadingProfile && !imageisErrorProfile ? (
    <>
      <div className="flex items-center flex-1 w-0">
        <img className="h-10 w-10 rounded-full" src={profilePicture} alt="" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{member.username}</p>
          <p className="text-sm text-gray-500">{member.first_name + ' ' + member.last_name}</p>
        </div>
      </div>
      {isManager && (
        <div className="ml-auto">
          <button type="button" className="inline-flex items-center px-2.5 py-1.5 " onClick={handleDelete}>
            <TrashIcon className="-ml-1 mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  ) : null;
}
