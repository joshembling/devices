import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Button from './Button'
import Success from './Success'

const AddDeviceForm = ({ deviceKeys, setStatus }) => {
    const [postedData, setPostedData] = useState({})
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    // new device
    const handleNewDevice = async e => {
        e.preventDefault()

        console.log('submit')

        Array.from(e.target.elements).map(element => {
            const newKey = element.id
            const newValue = element.value

            setPostedData(prev => ({ ...prev, [newKey]: newValue }))
            setShowErrors(true)
        })
    }

    useEffect(() => {
        axios
            .post(`http://localhost:8000/api/devices/`, postedData)
            .then(({ data }) => {
                setStatus(true)
                setErrors(false)
                setSuccessMsg('Submitted successfully!')
            })
            .catch(({ response }) => {
                if (response.status !== 200) {
                    setErrors(response.data.errors)
                    setStatus(false)
                    setSuccessMsg('')
                } else {
                    setErrors(false)
                    setStatus(false)
                }
            })
    }, [postedData])

    return (
        <form onSubmit={e => handleNewDevice(e)} className="w-full">
            <div className="flex flex-wrap -mx-3 mb-6">
                {Object.entries(formFields).map((field, i) => (
                    <div key={i} className="w-full px-3">
                        <label className={labelClasses} htmlFor={field[0]}>
                            {field[1]}
                        </label>
                        {field[0] === 'notes' ? (
                            <textarea
                                className={textareaClasses}
                                id={field[0]}></textarea>
                        ) : (
                            <input
                                className={inputClasses}
                                id={field[0]}
                                type="text"
                                required
                            />
                        )}
                    </div>
                ))}
            </div>

            {showErrors && (
                <ul>
                    {Object.values(errors).map((err, i) => (
                        <li className="text-red-500" key={i}>
                            <strong>{err}</strong>
                        </li>
                    ))}
                </ul>
            )}

            {successMsg !== '' && <Success msg={successMsg} />}

            <div className="md:flex md:items-center">
                <Button text="Submit new device" type="submit" />
            </div>
        </form>
    )
}

const labelClasses =
    'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
const inputClasses =
    'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
const textareaClasses =
    'no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none'
const formFields = {
    name: 'Name',
    address: 'Address',
    longitude: 'Longitude',
    latitude: 'Latitude',
    device_type: 'Device Type',
    manufacturer: 'Manufacturer',
    model: 'Model',
    install_date: 'Install Date',
    notes: 'Notes',
    eui: 'EUI',
    serial_number: 'Serial Number',
}

export default AddDeviceForm
