module.exports = {
  purge: [],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ["hover"],
    },
  },
  plugins: [require("postcss-import")],
};
