import { useEffect, useState, useRef } from 'react'
import axios from '@/lib/axios'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { ClipLoader } from 'react-spinners'

// main components
import AddDeviceForm from '@/components/UI/AddDeviceForm'
import Intro from '@/components/UI/Intro'
import Table from '@/components/UI/Table'
import TablePagination from '@/components/UI/TablePagination'
import ExampleTable from '@/components/UI/ExampleTable'
import Button from '@/components/UI/Button'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    const [devices, setDevices] = useState([])
    const [deviceKeys, setDeviceKeys] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(false)

    const url = `http://localhost:8000/api/devices?page=${page}`

    const deviceHeading = useRef(null)

    const [toggleDeviceForm, setToggleDeviceForm] = useState(false)

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

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <div>
                <Intro />
                {loading ? (
                    <div className="flex flex-column justify-center items-center">
                        <ClipLoader
                            color="black"
                            loading={loading}
                            size={150}
                        />
                    </div>
                ) : (
                    <>
                        {devices.data.length ? (
                            <>
                                <div className="flex justify-between">
                                    <h4 ref={deviceHeading}>
                                        Current device list:
                                    </h4>
                                    <Link href="/import-csv">
                                        <Button
                                            text="Import CSV"
                                            noMargin={true}
                                        />
                                    </Link>
                                </div>

                                <Table
                                    deviceKeys={deviceKeys}
                                    devices={devices}
                                    setStatus={setStatus}
                                />
                                <TablePagination
                                    devices={devices}
                                    page={page}
                                    setPage={setPage}
                                />
                            </>
                        ) : (
                            <>
                                <p className="mb-10">
                                    There are currently no devices. If you have
                                    just uploaded a file, please run{' '}
                                    <code>php artisan queue:work</code> from the
                                    terminal to dispatch the job.
                                </p>

                                <h5>Example view:</h5>
                                <ExampleTable />
                            </>
                        )}
                    </>
                )}
                {user && (
                    <>
                        <Button
                            onClick={() => setToggleDeviceForm(prev => !prev)}
                            text="Add a single device"
                        />

                        {toggleDeviceForm && (
                            <AddDeviceForm
                                deviceKeys={deviceKeys}
                                setStatus={setStatus}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    )
}
