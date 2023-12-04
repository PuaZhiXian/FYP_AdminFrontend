/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    fontSize: {
      base: '18px',
      md: '30px',
      lg: '56px',
      'table-row': '14px',
      'table-header': '16px',
      'xs': '10px',
      'sm': '14px',
      'button': '14px',
      'input': '14px',
      'label': '14px',
      'title': '30px',
      'subtitle': '16px',
      'header': '18px',
      'side-header': '12px',
      'side-sub': '10px',
      'doc-title': '22px',
      'doc-text': '12px'
    },
    extend: {
      colors: {
        'danger': '#EA4335',
        'warning': '#F55D53',
        'theme': '#2453EE',
        'primary-900': '#10064D',
        'primary-600':'#CAE5FF',
        'success': '#27C468'
      },
    },
  },
  plugins: [],
}

