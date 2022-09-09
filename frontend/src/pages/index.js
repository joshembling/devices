import { useEffect, useState, useRef } from 'react'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { DropdownButton } from '@/components/DropdownLink'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const { logout } = useAuth()
    const [devices, setDevices] = useState([])
    const [deviceKeys, setDeviceKeys] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(false)
    const [postedData, setPostedData] = useState({})
    const [errors, setErrors] = useState([])
    const [selectedFile, setSelectedFile] = useState(false)
    const url = `http://localhost:8000/api/devices?page=${page}`

    const deviceHeading = useRef(null)

    // get all devices
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setDevices(data)
                setDeviceKeys(Object.keys(data.data[0]))
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                setLoading(false)
            })
    }, [page, status])

    // update
    const handleUpdateDevice = async e => {
        const rowId = e.target.parentElement.parentElement.id

        await axios
            .put(`http://localhost:8000/api/devices/${rowId}`, {
                [e.target.id]: e.target.value,
            })
            .then(({ data }) => {
                setStatus(true)
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    console.log(response.data.errors)
                } else {
                    console.log('error')
                }
            })

        setStatus(false)
    }

    // delete
    const handleDeleteDevice = async e => {
        e.preventDefault()
        const id = e.target.value

        if (confirm('Are you sure you want to delete this?')) {
            await axios
                .delete(`http://localhost:8000/api/devices/${id}`, {
                    id: id,
                })
                .then(({ data }) => {
                    setStatus(true)
                })
                .catch(({ response }) => {
                    if (response.status === 422) {
                        console.log(response.data.errors)
                    } else {
                        console.log('error')
                    }
                })
        }

        setStatus(false)
    }

    // new device
    const handleNewDevice = async e => {
        e.preventDefault()

        Array.from(e.target.elements).map(element => {
            const newKey = element.id
            const newValue = element.value

            return setPostedData(prev => ({ ...prev, [newKey]: newValue }))
        })
    }

    useEffect(() => {
        axios
            .post(`http://localhost:8000/api/devices/`, postedData)
            .then(({ data }) => {
                setStatus(true)
                setErrors(false)
            })
            .catch(({ response }) => {
                setErrors(response.data.errors)
            })
    }, [postedData])

    const handleFileUpload = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('selectedFile', selectedFile)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/api/import',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <form onSubmit={handleFileUpload}>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={e => setSelectedFile(e.target.files[0])}
                />
                <button type="submit">Submit</button>
            </form>

            <div className="relative bg-gray-100 dark:bg-gray-900 sm:pt-0">
                <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <a className="ml-4 text-sm text-gray-700 underline">
                                    Dashboard
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

                <main className="container-xl">
                    {user !== undefined && Object.keys(user).length !== 0 ? (
                        <>
                            <h3>Hey {user.name}!</h3>
                            <section className="intro mt-8 mb-10">
                                <h5>Get started:</h5>
                                <ul>
                                    <li>
                                        To add a single device{' '}
                                        <a
                                            href="#addDevice"
                                            className="text-gray-700 underline">
                                            click here
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        To edit a device, click on the field
                                        you'd like to edit and amend as you
                                        please.
                                    </li>
                                    <li>
                                        To delete a device, just use the delete
                                        button provided.
                                    </li>
                                </ul>
                            </section>
                        </>
                    ) : (
                        <section className="intro mb-10">
                            <h3>About:</h3>
                            <ul>
                                <li>
                                    You can get all current available data
                                    without logging in.
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
                        </section>
                    )}

                    {loading ? (
                        'loading'
                    ) : (
                        <>
                            <h4 ref={deviceHeading}>Current device list:</h4>
                            {devices ? (
                                <div className="overflow-x-auto table-container">
                                    <table className="text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                                        <thead className="text-xs text-gray-100 uppercase bg-gray-900 ">
                                            <tr>
                                                {deviceKeys.map((key, i) => (
                                                    <th
                                                        key={i}
                                                        scope="col"
                                                        className="py-3 px-2">
                                                        {key}
                                                    </th>
                                                ))}
                                                {user && (
                                                    <th
                                                        scope="col"
                                                        className="py-3 px-3">
                                                        Update
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devices.data.map((device, i) => (
                                                <>
                                                    <tr
                                                        key={i}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-100"
                                                        id={device.id}>
                                                        {deviceKeys.map(
                                                            (key, i) => (
                                                                <td key={i}>
                                                                    {user ? (
                                                                        <span>
                                                                            {i <=
                                                                            1 ? (
                                                                                device[
                                                                                    key
                                                                                ]
                                                                            ) : i ===
                                                                                  3 ||
                                                                              i ===
                                                                                  10 ? (
                                                                                <textarea
                                                                                    onBlur={
                                                                                        handleUpdateDevice
                                                                                    }
                                                                                    defaultValue={
                                                                                        device[
                                                                                            key
                                                                                        ]
                                                                                    }></textarea>
                                                                            ) : (
                                                                                <>
                                                                                    <input
                                                                                        type="text"
                                                                                        id={
                                                                                            key
                                                                                        }
                                                                                        onBlur={
                                                                                            handleUpdateDevice
                                                                                        }
                                                                                        defaultValue={
                                                                                            device[
                                                                                                key
                                                                                            ]
                                                                                        }
                                                                                        key={
                                                                                            device[
                                                                                                key
                                                                                            ]
                                                                                        }
                                                                                    />
                                                                                </>
                                                                            )}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="py-3 px-2">
                                                                            {i ===
                                                                                3 ||
                                                                            i ===
                                                                                10 ? (
                                                                                device[
                                                                                    key
                                                                                ].substr(
                                                                                    0,
                                                                                    70,
                                                                                ) +
                                                                                '...'
                                                                            ) : (
                                                                                <span>
                                                                                    {
                                                                                        device[
                                                                                            key
                                                                                        ]
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                            ),
                                                        )}
                                                        {user && (
                                                            <td className="py-4 px-6 mx-auto d-flex justify-center align-center">
                                                                <button
                                                                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded d-block"
                                                                    onClick={
                                                                        handleDeleteDevice
                                                                    }
                                                                    value={
                                                                        device.id
                                                                    }>
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        )}
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                'there are no devices'
                            )}
                        </>
                    )}

                    <div className="mt-5 flex justify-between">
                        <button
                            className="mb-10 text-gray-100 bg-gray-900 py-2 px-4 border border-dark-500 hover:border-transparent rounded d-block"
                            onClick={() =>
                                setPage(prev => (prev === 1 ? 1 : prev - 1))
                            }
                            disabled={
                                devices.current_page === 1 ? true : false
                            }>
                            Prev
                        </button>
                        <button
                            className="mb-10 text-gray-100 bg-gray-900 py-2 px-4 border border-dark-500 hover:border-transparent rounded d-block"
                            onClick={() => {
                                setPage(prev => prev + 1)
                                // deviceHeading.current.scrollIntoView()
                            }}
                            disabled={
                                devices.last_page === page ? true : false
                            }>
                            Next
                        </button>
                    </div>

                    <button
                        id="#addDevice"
                        className="mb-5 text-gray-100 bg-gray-900  py-2 px-4 border border-dark-500 hover:border-transparent rounded d-block">
                        Add device
                    </button>

                    <form
                        onSubmit={e => handleNewDevice(e)}
                        className="w-full max-w-lg">
                        {deviceKeys.map((key, i) => (
                            <div key={i}>
                                {i >= 2 && i !== 10 && (
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor={`${key}`}>
                                                {key}
                                            </label>
                                            <input
                                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id={`${key}`}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                )}

                                {i === 10 && (
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label
                                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                htmlFor={`${key}`}>
                                                {key}
                                            </label>
                                            <textarea
                                                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                                id={`${key}`}></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {errors && (
                            <ul>
                                {Object.values(errors).map((err, i) => (
                                    <li className="text-red-500" key={i}>
                                        <strong>{err}</strong>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3">
                                <button
                                    className="mb-10 text-gray-100 bg-gray-900 py-3 px-4 border border-dark-500 hover:border-transparent rounded d-block"
                                    type="submit">
                                    Submit new device
                                </button>
                            </div>
                            <div className="md:w-2/3"></div>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}
