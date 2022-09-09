import Button from '@/components/UI/Button'
import Papa from 'papaparse'
import Success from '@/components/UI/Success'
import Link from 'next/link'

import React, { useState, useEffect, useRef } from 'react'
import axios from '@/lib/axios'

const importCSV = () => {
    const fileInput = useRef()
    const [selectedFile, setSelectedFile] = useState(false)
    const [preview, setPreview] = useState({})
    const [showPreview, setShowPreview] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    const [importData, setImportData] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const handleSelect = e => {
        setSelectedFile(e.target.files[0])
        setSuccessMsg('')
        if (e.target.files[0].size > 4e6) {
            setShowPreview(false)
        }
    }

    const handleFileUpload = async e => {
        e.preventDefault()
        setShowConfirm(true)
        if (selectedFile && showPreview) {
            Papa.parse(selectedFile, {
                complete: function (results) {
                    setPreview(results.data)
                },
            })
        }
    }

    if (preview.length) {
        preview.slice(0, 50)
    }

    const handleUploadToServer = async e => {
        setImportData(true)

        const formData = new FormData()
        formData.append('selectedFile', selectedFile)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://localhost:8000/api/import',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (response.status === 200) {
                setImportData(false)
                setSuccessMsg('Data Uploaded Successfully!')
                setPreview([])
                setShowConfirm(false)
                fileInput.current.value = null
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            } else {
                console.log(error)
            }
        }
    }

    return (
        <div className="container-md">
            <section className="intro mt-8 mb-10 flex justify-center flex-col w-100 items-center m-auto text-center mb-10">
                <h3>Import your CSV:</h3>
                <ul>
                    <li>Select your file</li>
                    <li>Preview your upload</li>
                    <li>Confirm the upload</li>
                </ul>
                <form onSubmit={handleFileUpload}>
                    <input
                        ref={fileInput}
                        type="file"
                        name="deviceFile"
                        id="deviceFile"
                        onChange={handleSelect}
                    />
                    <Button text="Submit" type="submit" />
                </form>
            </section>

            {successMsg !== '' && (
                <>
                    <Success msg={successMsg} />
                    <Link href="/">
                        <Button text="View New Data" />
                    </Link>
                </>
            )}

            {showConfirm && (
                <div className="flex justify-center flex-col w-100 items-center m-auto text-center mb-10">
                    <h6 className="mb-0">Do you want to import this data?</h6>
                    <div className="flex gap-1">
                        <Button
                            noMargin={true}
                            text="Yes"
                            onClick={handleUploadToServer}
                        />
                        <Button
                            noMargin={true}
                            text="No"
                            onClick={() => setImportData(false)}
                        />
                    </div>
                </div>
            )}

            {preview.length && (
                <>
                    <h5>50 item preview:</h5>
                    <div className="overflow-x-auto table-container">
                        <table className="example text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                            <thead className="text-xs text-gray-100 uppercase bg-gray-900 ">
                                <tr>
                                    {preview[0].map((field, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="py-3 px-3">
                                            {field}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {preview.map(
                                    (field, i) =>
                                        i !== 0 && (
                                            <tr
                                                key={i}
                                                className="bg-white border-b dark:bg-gray-800">
                                                <td>{field[0]}</td>
                                                <td>{field[1]}</td>
                                                <td>{field[2]}</td>
                                                <td>{field[3]}</td>
                                                <td>{field[4]}</td>
                                                <td>{field[5]}</td>
                                                <td>{field[6]}</td>
                                                <td>{field[7]}</td>
                                                <td>{field[8]}</td>
                                                <td>{field[9]}</td>
                                                <td>{field[10]}</td>
                                                <td>{field[11]}</td>
                                            </tr>
                                        ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default importCSV
