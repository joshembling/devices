import React from 'react'

const ExampleTable = () => {
    return (
        <div className="overflow-x-auto table-container">
            <table className="example text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead className="text-xs text-gray-100 uppercase bg-gray-900 ">
                    <tr>
                        {Object.keys(formFields).map((field, i) => (
                            <th scope="col" className="py-3 px-3">
                                {field}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800">
                        <td>Device John Doe</td>
                        <td>123 Test St</td>
                        <td>101.9876</td>
                        <td>-66.99992</td>
                        <td>node</td>
                        <td>CISCO</td>
                        <td>F6810</td>
                        <td>29/06/1981</td>
                        <td>
                            Architecto quo voluptatem est eum voluptatem debitis
                            suscipit...
                        </td>
                        <td>94-5c-1c-68-2d-62</td>
                        <td>X0EPLL6X</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800">
                        <td>Device John Doe</td>
                        <td>123 Test St</td>
                        <td>101.9876</td>
                        <td>-66.99992</td>
                        <td>node</td>
                        <td>CISCO</td>
                        <td>F6810</td>
                        <td>29/06/1981</td>
                        <td>
                            Architecto quo voluptatem est eum voluptatem debitis
                            suscipit...
                        </td>
                        <td>94-5c-1c-68-2d-62</td>
                        <td>X0EPLL6X</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800">
                        <td>Device John Doe</td>
                        <td>123 Test St</td>
                        <td>101.9876</td>
                        <td>-66.99992</td>
                        <td>node</td>
                        <td>CISCO</td>
                        <td>F6810</td>
                        <td>29/06/1981</td>
                        <td>
                            Architecto quo voluptatem est eum voluptatem debitis
                            suscipit...
                        </td>
                        <td>94-5c-1c-68-2d-62</td>
                        <td>X0EPLL6X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ExampleTable

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
