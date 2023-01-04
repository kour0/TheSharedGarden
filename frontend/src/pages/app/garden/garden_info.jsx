import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/forms/Form';
import FormField from '../../../components/forms/FormField'
import MainPage from '../../../components/layout/MainPage'
import { Loader } from '../../../components/loader/FullScreenLoader';
import { getGarden, patchGarden, getGardenPicture, deleteGarden } from '../../../lib/gardens';
import { classNames } from '../../../utils/helpers';
import { request } from '../../../utils/axios-utils';
import { toast } from 'react-hot-toast';
import { getProfilePicture, patchProfile } from '../../../lib/profile';
import { useQueryClient } from '@tanstack/react-query';

export default function GardenInfo() {

    const { gardenId } = useParams();
    const queryClient = useQueryClient()

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [privateGarden, setPrivateGarden] = useState(false);
    const [gardenPicture, setGardenPicture] = useState(null);
    const updateGarden = patchGarden(queryClient, gardenId);
    const postDeleteGarden = deleteGarden(queryClient, gardenId);

    const { isLoading, data, isError, error } = getGarden(gardenId);
    const { isLoading: imageLoading, isError: imageisError, data: imageData, error: imageError } = getGardenPicture(gardenId);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        console.log(typeof data);
        const formData = new FormData();
        formData.append('file', selectedImage);

        formData.append('gardenType', privateGarden ? 'private' : 'public')
        // Ajouter des données à un formulaire
        console.log(data);
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        updateGarden.mutate(formData, gardenId);

    };

    const handleDeleteGarden = async () => {
        postDeleteGarden.mutate();
    }


    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);

        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(image);
    };

    if (!imageLoading && !imageisError) {
        const reader = new FileReader();
        reader.onload = (e) => setGardenPicture(e.target.result);
        reader.readAsDataURL(imageData);
    }

    return !isLoading ? (
        <MainPage title="Les informations du jardin" subtitle="Retrouvez ici toutes les informations concernant votre jardin">
            <Form onSubmit={handleSubmit(onSubmit)} title="Informations" subtitle="Retrouvez ici toutes les informations concernant votre jardin" submitIsLoading={updateGarden.isLoading}>
                <FormField register={register} name="gardenName" label="Nom du jardin" type="text" placeholder="Mon jardin" required={true} defaultValue={data.name} />

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Pays
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 sm:max-w-xs sm:text-sm"
                            {...register('country', { required: true })}
                        >
                            <option>France</option>
                        </select>
                    </div>
                </div>


                <FormField register={register} name="street-address" label="Adresse" type="text" placeholder="1 rue de la paix" required={true} defaultValue={data.street_address} />

                <FormField register={register} name="city" label="Ville" type="text" placeholder="Paris" required={true} defaultValue={data.city} />

                <FormField register={register} name="region" label="Région / Département" type="text" placeholder="Île-de-France" required={true} defaultValue={data.province} />

                <FormField register={register} name="postal-code" label="Code postal" type="text" placeholder="75000" required={true} defaultValue={data.postal_code} />

                {/* Uploader une image et afficher un aperçu */}
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Image du jardin
                    </label>
                    <div className="overflow-hidden relative inline-block mt-1 flex flex-col items-center justify-center sm:mt-0">
                        <button className="rounded-md w-full max-w-lg border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">
                            Ajouter une image
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleImageChange}
                                className="absolute top-0 left-0 text-2xl opacity-0"
                            />
                        </button>
                        {previewUrl ? (
                            <div className="pt-5">
                                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                            </div>
                        ) : imageLoading ? (
                            <p>Load</p>
                        ) : (
                            imageData && (
                                <div className="pt-5">
                                    <img src={gardenPicture} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="sm:col-span-2 sm:border-t sm:border-gray-200 sm:pt-5">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Switch
                                checked={privateGarden}
                                onChange={setPrivateGarden}
                                className={classNames(
                                    privateGarden ? 'bg-teal-700' : 'bg-gray-200',
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
                                )}
                            >
                                <span className="sr-only">Agree to policies</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        privateGarden ? 'translate-x-5' : 'translate-x-0',
                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </div>
                        <div className="ml-3">
                            <p className="text-base text-gray-500">
                                Ce jardin est-il privé ? (seulement visible par les membres de votre jardin)
                            </p>
                        </div>
                    </div>
                </div>

            </Form>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>

            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Supprimer le jardin</h3>
                            <p className="mt-1 text-sm text-gray-600">Vous pouvez supprimer votre jardin en cliquant sur le bouton ci-dessous. Cette action est irréversible.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                                <div className="col-span-6 sm:col-span-3 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={handleDeleteGarden}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Supprimer le jardin
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MainPage>
    ) : (
        <Loader />
    );
}


