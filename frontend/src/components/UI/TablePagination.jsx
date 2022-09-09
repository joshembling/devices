import React from 'react'

const TablePagination = ({ devices, page, setPage }) => {
    return (
        <div className="mt-5 flex justify-between">
            <button
                className="mb-10 text-gray-100 bg-gray-900 py-2 px-4 border border-dark-500 hover:border-transparent rounded d-block"
                onClick={() => setPage(prev => (prev === 1 ? 1 : prev - 1))}
                disabled={devices.current_page === 1 ? true : false}>
                Prev
            </button>
            <button
                className="mb-10 text-gray-100 bg-gray-900 py-2 px-4 border border-dark-500 hover:border-transparent rounded d-block"
                onClick={() => {
                    setPage(prev => prev + 1)
                    // deviceHeading.current.scrollIntoView()
                }}
                disabled={devices.last_page === page ? true : false}>
                Next
            </button>
        </div>
    )
}

export default TablePagination
