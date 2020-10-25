const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
//const userPath = sessionStorage.getItem(userPath);
const userPath = "jyT2CIqmRAW6zGmo";
const outputPath = "../dist/" + userPath +"/game";

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
