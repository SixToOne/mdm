/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                PRIMARY: '#0064FF',
                PRIMARY_LIGHT: '#D7E2FB',
                BACKGROUND_LIGHT_GRAY: '#F4F4F4',
                SECONDARY: '',
                BORDER_LIGHT: '#EDEDED',
                DARK_BLACK: '#696969',
                LIGHT_BLACK: '#A1A5AC',
                RED: '#FF1C1C',
                DARK_RED: '#D40707',
                WHITE: '#FFFFFF',
            },
        },
    },
    plugins: [],
};
