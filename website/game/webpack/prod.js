const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
//const userPath = sessionStorage.getItem(userPath);
const userPath = "U3d5ed62dc56e57382acad4d9254111e1";
const outputPath = "../dist/" + userPath;

module.exports = merge(base, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: "bundle.min.js"
    //publicPath: "/game/dist/"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
