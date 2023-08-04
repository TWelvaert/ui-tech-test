import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const LINKS = [
  {
    name: 'Form Designer',
    path: '/designer',
  },
  {
    name: 'Form Filler',
    path: '/filler',
  },
  {
    name: 'Form Response',
    path: '/response',
  },
];

export default function Nav() {
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600'
                    alt='Your Company'
                  />
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  {/* Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {LINKS.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        classNames(
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                          {
                            'border-blue-500 text-gray-900': isActive,
                            'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                              !isActive,
                          }
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pb-4 pt-2'>
              {LINKS.map((link) => (
                <Disclosure.Button
                  as={NavLink}
                  to={link.path}
                  className={({
                    isActive,
                  }: {
                    isActive: boolean;
                    isPending: boolean;
                  }) =>
                    classNames(
                      'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                      {
                        'bg-blue-50 border-blue-500 text-blue-700': isActive,
                        'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700':
                          !isActive,
                      }
                    )
                  }
                >
                  {link.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
