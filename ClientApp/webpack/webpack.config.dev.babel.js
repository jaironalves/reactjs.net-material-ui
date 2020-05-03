import Common, { factoryPlugins } from "./webpack.common.js";
import Merge from "webpack-merge";
import Webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import paths from "./paths";

const optionsCommon = {
  mode: "development",
  namePattern: "[name]",
  styleLoaderInitial: "style-loader",
};

export default Merge(Common(optionsCommon), {
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    contentBase: paths.outputPath,
    port: process.env.PORT || 3000,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    factoryPlugins.Progress(),    
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      templateParameters: {
        'PUBLIC_URL': ''
      },
    }),    
    factoryPlugins.Define(),    
    factoryPlugins.Manifest(),
    new Webpack.HotModuleReplacementPlugin(),
  ],
});
