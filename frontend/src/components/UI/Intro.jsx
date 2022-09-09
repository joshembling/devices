import React from 'react'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

const Intro = () => {
    const { user } = useAuth({ middleware: 'guest' })
    return (
        <div className="container-md">
            <section className="intro mt-8 mb-10">
                {user !== undefined && Object.keys(user).length !== 0 ? (
                    <>
                        <h3>Hey {user.name}!</h3>
                        <h5>Get started:</h5>
                        <ul>
                            <li>
                                To add a single device, use the button below the
                                table.
                            </li>
                            <li>
                                To edit a device, click on the field you'd like
                                to edit and amend as you please.
                            </li>
                            <li>
                                To delete a device, just use the delete button
                                provided.
                            </li>
                            <li>
                                To upload a CSV,{' '}
                                <Link href="/import-csv">
                                    <a className="text-gray-700 underline">
                                        click here
                                    </a>
                                </Link>
                                .
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <h3>About:</h3>
                        <ul>
                            <li>
                                You can get all current available data without
                                logging in.
                            </li>
                            <li>
                                To import devices or submit, edit and delete
                                individual records, you will need to{' '}
                                <Link href="/login">
                                    <a className="text-gray-700 underline">
                                        login here
                                    </a>
                                </Link>{' '}
                                or{' '}
                                <Link href="/register">
                                    <a className="text-gray-700 underline">
                                        register an account
                                    </a>
                                </Link>
                                .
                            </li>
                        </ul>
                    </>
                )}
            </section>
        </div>
    )
}

export default Intro
