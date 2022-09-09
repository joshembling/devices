import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Navigation = () => {
    const { user } = useAuth({ middleware: 'guest' })

    const { logout } = useAuth()

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                {user ? (
                    <>
                        <Link href="/">
                            <a className="text-sm text-gray-700 underline">
                                Home
                            </a>
                        </Link>
                        <a className="ml-4 text-sm text-gray-700 underline">
                            <button onClick={logout}>Logout</button>
                        </a>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <a className="text-sm text-gray-700 underline">
                                Login
                            </a>
                        </Link>

                        <Link href="/register">
                            <a className="ml-4 text-sm text-gray-700 underline">
                                Register
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navigation
