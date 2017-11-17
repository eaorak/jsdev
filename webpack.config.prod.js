import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
  debug: true,
  devtool: "source-map",
  noInfo: false,
  entry: { main: path.resolve(__dirname, "src/index"), vendor: path.resolve(__dirname, "src/vendor") },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[chunkhash].js"
  },
  plugins: [
    // Generate external css file with hash
    new ExtractTextPlugin("[name].[contenthash].css"),
    new WebpackMd5Hash(),
    // This plugin will split bundles matching with name "vendor"
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      prod: true
    }),
    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap") }
    ]
  }
};
