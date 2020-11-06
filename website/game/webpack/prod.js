const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");
const userPath = process.env.userPath;
console.log("prod.js:"+userPath);
//const userPath = "jyT2CIqmRAW6zGmo";
const outputPath = "../dist/" + userPath;

module.exports = merge(base, {
  mode: "production",
  output: {
    publicPath: "/game/dist/" + userPath + "/",    //主要改這條更換儲存路徑
    path: path.resolve(__dirname, outputPath),
    filename: "bundle.min.js"
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
