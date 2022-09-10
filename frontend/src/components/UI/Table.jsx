import React, { useState } from 'react'
import { useAuth } from '@/hooks/auth'
import axios from '@/lib/axios'

const Table = ({ deviceKeys, devices, setStatus }) => {
    const { user } = useAuth({ middleware: 'guest' })
    const [errorMsg, setErrorMsg] = useState('')

    // update
    const handleUpdateDevice = async e => {
        const rowId = e.target.parentElement.parentElement.parentElement.id

        await axios
            .put(`http://localhost:8000/api/devices/${rowId}`, {
                [e.target.id]: e.target.value,
            })
            .then(({ data }) => {
                setStatus(true)
            })
            .catch(({ response }) => {
                if (response) {
                    console.log(response)
                    alert(
                        `Status: ${response.status}\n${response.data.message}`,
                    )
                }
            })

        setStatus(false)
    }

    // delete
    const handleDeleteDevice = async e => {
        e.preventDefault()
        const id = e.target.value

        if (confirm(`Are you sure you want to delete device ID:${id}?`)) {
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

    return (
        <div className="overflow-x-auto table-container">
            <table className="text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="text-xs text-gray-100 uppercase bg-gray-900 ">
                    <tr>
                        {deviceKeys.map((key, i) => (
                            <th key={i} scope="col" className="py-3 px-2">
                                {key}
                            </th>
                        ))}
                        {user && (
                            <th scope="col" className="py-3 px-3">
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
                                {deviceKeys.map((key, i) => (
                                    <td key={i}>
                                        {user ? (
                                            <span>
                                                {i <= 1 ? (
                                                    device[key]
                                                ) : i === 3 || i === 10 ? (
                                                    <textarea
                                                        id={key}
                                                        onBlur={
                                                            handleUpdateDevice
                                                        }
                                                        defaultValue={
                                                            device[key]
                                                        }
                                                        key={
                                                            device[key]
                                                        }></textarea>
                                                ) : (
                                                    <>
                                                        <input
                                                            type="text"
                                                            id={key}
                                                            onBlur={
                                                                handleUpdateDevice
                                                            }
                                                            defaultValue={
                                                                device[key]
                                                            }
                                                            key={device[key]}
                                                        />
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span className="py-3 px-2">
                                                {i === 3 || i === 10 ? (
                                                    device[key].substr(0, 70) +
                                                    '...'
                                                ) : (
                                                    <span>{device[key]}</span>
                                                )}
                                            </span>
                                        )}
                                    </td>
                                ))}
                                {user && (
                                    <td className="py-4 px-6 mx-auto d-flex justify-center align-center">
                                        <button
                                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded d-block"
                                            onClick={handleDeleteDevice}
                                            value={device.id}>
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
    )
}

export default Table
