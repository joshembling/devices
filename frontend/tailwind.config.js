const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    // content: [
    //     './pages/**/*.{js,ts,jsx,tsx}',
    //     './components/**/*.{js,ts,jsx,tsx}',
    // ],
    theme: {
        extend: {},
    },
    plugins: [],
    content: ['./src/**/*.{js,jsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
