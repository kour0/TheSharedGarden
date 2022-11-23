import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavBar } from '../components/navigation/NavBar'

const navigation = [
    { name: 'Rejoignez un jardin', href: '/join'},
    { name: 'Qui sommes nous ?', href: '/' },
    { name: 'Le projet', href: '/' },
]

export default function Index() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:5454/api/signup', data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/app/dashboard');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className="relative overflow-hidden bg-white lg-h-screen">
            <div className="hidden lg:absolute lg:inset-0 lg:block" aria-hidden="true">
                <svg
                    className="absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform"
                    width={640}
                    height={784}
                    fill="none"
                    viewBox="0 0 640 784"
                >
                    <defs>
                        <pattern
                            id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                            x={118}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect y={72} width={640} height={640} className="text-gray-50" fill="currentColor" />
                    <rect x={118} width={404} height={784} fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
                </svg>
            </div>

            <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
                
                <NavBar/>
                <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
                            <a
                                href="#"
                                className="inline-flex items-center rounded-full bg-gray-900 p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                            >
                                <span className="rounded-full bg-teal-700 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                                    En savoir plus sur le projet
                                </span>
                                <span className="ml-4 text-sm">Visitez notre page</span>
                                <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                            </a>
                            <h1>
                                <span className="mt-4 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                                    <span className="block text-gray-900">Crée ton</span>
                                    <span className="block text-teal-700">jardin</span>
                                    <span className="block text-gray-900">et partage le !</span>
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                Modélise numériquement ton jardin conformément à la réalité.
                                Organise la gestion de ton jardin avec plusieurs collaborateurs.
                            </p>
                        </div>
                        <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                            <div className="bg-white sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                                <div className="px-4 py-8 sm:px-10">
                                    {/* <div>
                                        <p className="text-sm font-medium text-gray-700">Sign in with</p>

                                        <div className="mt-1 grid grid-cols-3 gap-3">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Sign in with Facebook</span>
                                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a
                                                    href="#"
                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Sign in with Twitter</span>
                                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                    </svg>
                                                </a>
                                            </div>

                                            <div>
                                                <a
                                                    href="#"
                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                                >
                                                    <span className="sr-only">Sign in with GitHub</span>
                                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-6">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-white px-2 text-gray-500">Or</span>
                                        </div>
                                    </div> */}

                                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                                        Inscrivez-vous
                                    </h1>

                                    <div className="mt-6">
                                        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                            <div>
                                                <label htmlFor="name" className="sr-only">
                                                    Nom complet
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="name"
                                                    placeholder="Nom complet"
                                                    required
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring-teal-700 sm:text-sm"
                                                    {...register('name', { required: true })}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="sr-only">
                                                    Pseudo
                                                </label>
                                                <input
                                                  type="text"
                                                  name="username"
                                                  id="username"
                                                  autoComplete="username"
                                                  placeholder="Pseudo"
                                                  required
                                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring-teal-700 sm:text-sm"
                                                  {...register('username', { required: true })}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="mobile-or-email" className="sr-only">
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    name="mobile-or-email"
                                                    id="mobile-or-email"
                                                    autoComplete="email"
                                                    placeholder="Email"
                                                    required
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-7000 focus:ring-teal-700 sm:text-sm"
                                                    {...register('email', { required: true })}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="password" className="sr-only">
                                                    Mot de passe
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    placeholder="Mot de passe"
                                                    autoComplete="current-password"
                                                    required
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring-teal-700 sm:text-sm"
                                                    {...register('password', { required: true })}
                                                />
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="flex w-full justify-center rounded-md border border-transparent bg-teal-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Créez votre compte
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="border-t-2 border-gray-200 bg-gray-50 px-4 py-6 sm:px-10">
                                    <p className="text-xs leading-5 text-gray-500">
                                        En vous inscrivant, vous acceptez les{" "}
                                        <a href="#" className="font-medium text-gray-900 hover:underline">
                                            Conditions d'utilisations
                                        </a>
                                        ,{' '}
                                        <a href="#" className="font-medium text-gray-900 hover:underline">
                                            Politique de confidentialité
                                        </a>{' '}
                                        et{' '}
                                        <a href="#" className="font-medium text-gray-900 hover:underline">
                                            Politique relative aux cookies
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
            
        </div >
    )
}
