module.exports = {
  content: [
    './views/**/*.handlebars',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        'white': '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
      },
    },
  },
  plugins: [],
}
