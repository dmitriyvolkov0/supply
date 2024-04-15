const path = require("path");

module.exports = {
  webpack: {
    alias: {
        '@assets': path.resolve(__dirname, "src/assets"),
        '@components': path.resolve(__dirname, "src/components"),
        '@contexts': path.resolve(__dirname, "src/contexts"),
        '@pages': path.resolve(__dirname, "src/pages"),
        '@services': path.resolve(__dirname, "src/services"),
        '@widgets': path.resolve(__dirname, "src/widgets"),
        '@utils': path.resolve(__dirname, "src/utils"),
    },
  },
};