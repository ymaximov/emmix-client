import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {Badge} from "antd";
import '../../Layout.css'
import {useNavigate, useLocation, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const user = useSelector((state) => state.user);
    const role = user.user.role;
    console.log(role, user)


    const adminMenu = [
        {
            name: 'Dashboard',
            path: '/'
        },
        {
            name: 'Onboarding',
            path: '/admin/onboarding'
        },
        {
            name: 'Companies',
            path: '/admin/companies'
        },
        {
            name: 'Users',
            path: '/admin/users'
        },
        {
            name: 'Billing',
            path: '/admin/billing'
        },
        {
            name: 'Reports',
            path: '/admin/reports'
        },


    ]
    const userMenu = [
        {
            name: 'Dashboard',
            path: '/'
        },
        {
            name: 'CRM',
            path: '/crm'
        },
        {
            name: 'Sales',
            path: '/service'
        },
        {
            name: 'Service',
            path: '/service'
        },
        {
            name: 'Purchasing',
            path: '/purchasing'
        },
        {
            name: 'Inventory',
            path: '/inventory'
        },
        {
            name: 'Accounting',
            path: '/accounting'
        },
        {
            name: 'Reports',
            path: '/reports'
        },
    ]

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

const menuToBeRendered = role === 'admin' ? adminMenu : userMenu
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            {/*<div className='ml-4 nav-left flex flex-1 items-center justify-center'>{user?.user.role}</div>*/}
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="block h-8 w-auto lg:hidden"
                                        src="https://s5p1b8.n3cdn1.secureserver.net/wp-content/uploads/2023/07/cropped-cropped-cropped-Logo-1@2x-100-1-scaled-1.jpg"
                                        alt="Your Company"
                                    />
                                    <img
                                        className="hidden h-8 w-auto lg:block"
                                        src="https://s5p1b8.n3cdn1.secureserver.net/wp-content/uploads/2023/07/cropped-cropped-cropped-Logo-1@2x-100-1-scaled-1.jpg"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                                    {menuToBeRendered.map((menu, index) => {
                                        const isActive = location.pathname === menu.path;
                                        return (
                                            <div
                                                key={index}
                                                className={isActive ? 'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900' : 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'}
                                            >
                                                {<Link to={menu.path}>{menu.name}</Link>}
                                            </div>
                                        )
                                    })}

                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"*/}
                                    {/*>*/}
                                    {/*    Dashboard*/}
                                    {/*</a>*/}
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
                                    {/*>*/}
                                    {/*    Team*/}
                                    {/*</a>*/}
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
                                    {/*>*/}
                                    {/*    Projects*/}
                                    {/*</a>*/}
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
                                    {/*>*/}
                                    {/*    Calendar*/}
                                    {/*</a>*/}
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
                                    {/*>*/}
                                    {/*    Calendar*/}
                                    {/*</a>*/}
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"*/}
                                    {/*>*/}
                                    {/*    Calendar*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <Badge count={user?.user.user_id} className='mr-1'>
                                        <i className="ri-notification-line header-action-icon px-3"></i>
                                    </Badge>
                                </button>
                                <i className="ri-user-line ml-4 cursor-pointer"></i>
                                <i className="ri-logout-circle-line ml-4 cursor-pointer" onClick={logout}></i>
                                {/* Right Side Items */}
                                {/*<div className='ml-4 nav-right'>Welcome, {user?.user.first_name} {user?.user.last_name}</div>*/}
                                {/*<div className='ml-4 logout nav-right'>My Account</div>*/}
                                {/*<div className="ml-4">{user?.user.role}</div>*/}
                                {/*<div className='ml-4 logout nav-right' onClick={logout}>Logout</div>*/}


                                {/*<Menu as="div" className="relative ml-3">*/}
                                {/*    <div>*/}
                                {/*        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">*/}
                                {/*            <span className="sr-only">Open user menu</span>*/}
                                {/*            <img*/}
                                {/*                className="h-8 w-8 rounded-full"*/}
                                {/*                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                                {/*                alt=""*/}
                                {/*            />*/}
                                {/*        </Menu.Button>*/}
                                {/*    </div>*/}
                                {/*    <Transition*/}
                                {/*        as={Fragment}*/}
                                {/*        enter="transition ease-out duration-200"*/}
                                {/*        enterFrom="transform opacity-0 scale-95"*/}
                                {/*        enterTo="transform opacity-100 scale-100"*/}
                                {/*        leave="transition ease-in duration-75"*/}
                                {/*        leaveFrom="transform opacity-100 scale-100"*/}
                                {/*        leaveTo="transform opacity-0 scale-95"*/}
                                {/*    >*/}
                                {/*        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
                                {/*            <Menu.Item>*/}
                                {/*                {({ active }) => (*/}
                                {/*                    <a*/}
                                {/*                        href="#"*/}
                                {/*                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                {/*                    >*/}
                                {/*                        Your Profile*/}
                                {/*                    </a>*/}
                                {/*                )}*/}
                                {/*            </Menu.Item>*/}
                                {/*            <Menu.Item>*/}
                                {/*                {({ active }) => (*/}
                                {/*                    <a*/}
                                {/*                        href="#"*/}
                                {/*                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                {/*                    >*/}
                                {/*                        Settings*/}
                                {/*                    </a>*/}
                                {/*                )}*/}
                                {/*            </Menu.Item>*/}
                                {/*            <Menu.Item>*/}
                                {/*                {({ active }) => (*/}
                                {/*                    <a onClick={logout}*/}
                                {/*                        href="#"*/}
                                {/*                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}*/}
                                {/*                    >*/}
                                {/*                        Sign out*/}
                                {/*                    </a>*/}
                                {/*                )}*/}
                                {/*            </Menu.Item>*/}
                                {/*        </Menu.Items>*/}
                                {/*    </Transition>*/}
                                {/*</Menu>*/}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pb-4 pt-2">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                            >
                                Dashboard
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                            >
                                Team
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                            >
                                Projects
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="#"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                            >
                                Calendar
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
