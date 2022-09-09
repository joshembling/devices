import React from 'react'

const Button = ({ text, noMargin, ...props }) => {
    return (
        <button
            className={`${
                noMargin === true ? 'my-1' : 'my-10'
            } text-gray-100 bg-gray-900 py-3 px-4 border border-dark-500 hover:border-transparent rounded d-block font-bold	`}
            {...props}>
            {text}
        </button>
    )
}

export default Button
