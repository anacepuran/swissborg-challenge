/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};
config.exports = {
  plugins: [
    "autoprefixer",
    [
      "@fullhuman/postcss-purgecss",
      {
        content: ["./pages/**/*.js", "./components/**/*.js"],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ["html", "body"],
          deep: [],
          greedy: [],
        },
      },
    ],
  ],
};

export default config;
