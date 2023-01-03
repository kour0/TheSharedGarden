import { Switch } from '@headlessui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Form from '../../../components/forms/Form';
import FormField from '../../../components/forms/FormField'
import MainPage from '../../../components/layout/MainPage'
import { Loader } from '../../../components/loader/FullScreenLoader';
import { getGarden } from '../../../lib/gardens';
import { classNames } from '../../../utils/helpers';

export default function GardenInfo() {

    const { gardenId } = useParams();

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [privateGarden, setPrivateGarden] = useState(false)

    const { isLoading, data, isError, error } = getGarden(gardenId);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);

        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target.result);
        reader.readAsDataURL(image);
    };

    return !isLoading ? (
        <MainPage title="Les informations du jardin" subtitle="Retrouvez ici toutes les informations concernant votre jardin">
            {console.log(data)}
            <Form title="Informations" subtitle="Retrouvez ici toutes les informations concernant votre jardin">
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
                    <div className="overflow-hidden relative inline-block mt-1 sm:col-span-2 sm:mt-0">
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
                        {previewUrl && (
                            <div className="flex flex-col items-center justify-center pt-5">
                                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                            </div>
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
        </MainPage>
    ) : (
        <Loader />
    );
}


