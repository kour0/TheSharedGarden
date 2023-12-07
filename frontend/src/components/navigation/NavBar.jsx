import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const navigation = [
  { name: 'Qui sommes nous ?', href: '/team' },
  { name: 'Le projet', href: '/about' },
];

export function NavBar() {
  return (
    <Popover>
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Global">
        <div className="flex flex-1 items-center">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link to="/" relative="path">
              <Logo></Logo>
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-700">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="hidden md:ml-10 md:block md:space-x-10">
            {navigation.map((item) => (
              <NavBar.Link
                key={item.name}
                to={item.href}
                path="path"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </NavBar.Link>
            ))}
          </div>
        </div>

        <div className="hidden text-right md:block">
          <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
            <Link
              to="/login"
              relative="path"
              className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-teal-700 hover:bg-gray-50"
            >
              Connexion
            </Link>
          </span>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu open state. */}
      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <Logo></Logo>
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-700">
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <NavBar.Link
                  key={item.name}
                  to={item.href}
                  path="path"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </NavBar.Link>
              ))}
            </div>
            <Link
              to="/login"
              relative="path"
              className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-teal-700 hover:bg-gray-100"
            >
              Connexion
            </Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

NavBar.Link = function NavBarLink({ children, ...props }) {
  return <Link {...props}>{children}</Link>;
};
