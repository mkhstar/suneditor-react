const path = require("path");

module.exports = {
  mode: "production",
  entry: "./main.js",
  output: {
    path: path.resolve("dist"),
    filename: "main.js",
    libraryTarget: "commonjs2"
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  externals: {
    react: "react"
  }
};