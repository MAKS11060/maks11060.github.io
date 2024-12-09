/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //
    './index.html',
    './src/**/*.{html,js,ts,svelte}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'dark',
    // themes: ['black', 'light']
    themes: [
      {
        light: {
          primary: '#24292e',
          secondary: '#586069',
          accent: '#1f6feb',
          neutral: '#f6f8fa',
          'base-100': '#ffffff',
          info: '#2196F3',
          success: '#4caf50',
          warning: '#fbc02d',
          error: '#f44336',
        },
      },
      {
        dark: {
          primary: '#58a6ff',
          secondary: '#8b949e',
          accent: '#1f6feb',
          neutral: '#161b22',
          'base-100': '#0d1117',
          info: '#2196F3',
          success: '#4caf50',
          warning: '#fbc02d',
          error: '#f44336',
        },
      },
    ],
  },
}
