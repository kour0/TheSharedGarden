import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, HomeIcon, PlusIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getProfile } from '../../lib/profile';
import { request } from '../../utils/axios-utils';
import { Logo } from '../navigation/Logo';

const navigation = [
  { name: 'Mes jardins', icon: HomeIcon, href: '/app/dashboard' },
  { name: 'Créer un jardin', icon: PlusIcon, href: '/app/create-garden' },
  { name: 'Rejoignez un jardin', icon: UserGroupIcon, href: '/app/join-garden' },
];

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [profilePicture, setProfilePicture] = useState(null)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }
  }, []);
  
  const { isLoading, isError, data, error } = getProfile();

  const {
    isLoading: imageLoading,
    isError: imageisError,
    data: imageData,
    error: imageError,
  } = useQuery(['profileImage'], async () => {
    const response = await request({ url: '/api/profile/image', method: 'get', responseType: 'blob' });
    return response.data;
  });

  if (!imageLoading && !imageisError) {
    const reader = new FileReader();
    reader.onload = (e) => setProfilePicture(e.target.result);
    reader.readAsDataURL(imageData);
  }

  return !isError && !isLoading && !imageLoading && !imageError ? (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Logo />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          relative="path"
                          onClick={() => setActive(index)}
                          className={
                            (index === active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md')
                          }
                        >
                          <item.icon
                            className={
                              (index === active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6')
                            }
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <Link to="/app/profile" relative="path" onClick={() => setActive(-1)}>
                    <div
                      className={
                        (-1 == active ? 'bg-gray-100' : '') + ' flex flex-shrink-0 border-t border-gray-200 p-4'
                      }
                    >
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://i.seadn.io/gae/Tg1-LZaAv95ggi3IqUkKcdiMbyQinuKs5paMhCFj4lS8liodkI6Tt5_Sexlucsa2byQyv1cPriRLKDkAuoLqqTxg89gypPrXBXn4MCs?auto=format&w=1000"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {data.first_name + ' ' + data.last_name}
                          </p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Logo />
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    relative="path"
                    onClick={() => setActive(index)}
                    className={
                      (index === active
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900') +
                      ' group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    }
                  >
                    <item.icon
                      className={
                        (index === active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500') +
                        ' mr-3 flex-shrink-0 h-6 w-6'
                      }
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <Link to="/app/profile" relative="path" onClick={() => setActive(-1)}>
              <div className={(-1 == active ? 'bg-gray-100' : '') + ' flex flex-shrink-0 border-t border-gray-200 p-4'}>
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={profilePicture}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {data.first_name + ' ' + data.last_name}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
