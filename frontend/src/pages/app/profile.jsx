import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import axios from 'axios';
import { Loader } from '../../components/loader/FullScreenLoader';
import { request } from '../../utils/axios-utils';

export default function Profile() {
  const { isLoading, isError, data, error } = useQuery(['profile'], async () => {
    const response = await request({ url: '/api/profile', method: 'get' });
    return response.data;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    //formData.append('file', selectedImage);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      await axios.patch('http://127.0.0.1:5454/api/profile', formData, { withCredentials: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const onSubmit2 = async (data) => {
    const formData = new FormData();
    //formData.append('file', selectedImage);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    try {
      await axios.patch('http://127.0.0.1:5454/api/personnal_info', formData, { withCredentials: true });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(image);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <div>Error: {error.message}</div>}
      {data && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-8">
          <div className="text-center mt-5 mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mon compte</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
            </p>
          </div>

          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Ces informations seront affichées publiquement. Faites donc attention à ce que vous partagez.{' '}
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="PATCH" onSubmit={handleSubmit(onSubmit)}>
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Pseudo
                          </label>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="given-name"
                            defaultValue={data.username}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('username', { required: true })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            {previewUrl ? (
                              <img src={previewUrl} alt="preview" className="h-full w-full" />
                            ) : (
                              <img
                                src="http://127.0.0.1:5454/api/profile/picture"
                                alt=" preview"
                                className="h-full w-full"
                              />
                            )}
                            {/* <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                        </svg> */}
                          </span>
                          <div className="overflow-hidden relative inline-block mt-1 sm:col-span-2 sm:mt-0">
                            <button
                              type="button"
                              className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Modifier
                              <input
                                type="file"
                                name="image"
                                id="image"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 text-2xl opacity-0"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Informations personnelles</h3>
                  <p className="mt-1 text-sm text-gray-600">Modifiez ici vos informations personnelles</p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit2)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Prénom
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            defaultValue={data.first_name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('first_name', { required: true })}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Nom
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            defaultValue={data.last_name}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('last_name', { required: true })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
