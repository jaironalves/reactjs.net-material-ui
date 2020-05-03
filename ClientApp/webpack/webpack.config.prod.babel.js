import Merge from 'webpack-merge'
import Common, { factoryPlugins } from './webpack.common.js'
import Path from 'path'

// Plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
//import CopyWebpackPlugin from 'copy-webpack-plugin'

import paths from './paths'

const namePattern = '[name]-[hash:8]'

const optionsCommon = {
  mode: 'production',
  namePattern,
  styleLoaderInitial: MiniCssExtractPlugin.loader,
}

export default Merge(Common(optionsCommon), {
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})],
    runtimeChunk: {
      name: 'runtime', // necessary when using multiple entrypoints on the same page
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 20000000,
    maxEntrypointSize: 8500000,
    assetFilter: (assetFilename) => {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
    },
  },
  plugins: [
    factoryPlugins.Progress(),        
    factoryPlugins.Define(),       
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: Path.join(paths.cssFolder, namePattern + '.css'),
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin(),
    //new CopyWebpackPlugin([
    //  {
    //    from: paths.publicPath,
    //    to: paths.outputPath,
    //    ignore: [paths.templatePath],
    //  },
    //]),
    factoryPlugins.Manifest(),
  ],
})

//const path = require('path');
//const ManifestPlugin = require('webpack-manifest-plugin');

//module.exports = {
//	entry: path.resolve(__dirname, '../', 'expose/expose-components.js'),
//	output: {
//		filename: '[name].js', // change this to '[name].[contenthash:8].js' if using the asset manifest for better caching
//		globalObject: 'this',
//		path: path.resolve(__dirname, '../../', 'wwwroot/dist'),
//		publicPath: 'dist/'
//	},
//	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//	optimization: {
//		runtimeChunk: {
//			name: 'runtime', // necessary when using multiple entrypoints on the same page
//		},
//		splitChunks: {
//			cacheGroups: {
//				commons: {
//					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
//					name: 'vendor',
//					chunks: 'all',
//				},
//			},
//		},
//	},
//	module: {
//		rules: [
//			{
//				test: /\.jsx?$/,
//				exclude: /node_modules/,
//				loader: 'babel-loader',
//			},
//		],
//	},
//	plugins: [
//		new ManifestPlugin({
//			fileName: 'asset-manifest.json',
//			generate: (seed, files) => {
//				const manifestFiles = files.reduce((manifest, file) => {
//					manifest[file.name] = file.path;
//					return manifest;
//				}, seed);

//				const entrypointFiles = files.filter(x => x.isInitial && !x.name.endsWith('.map')).map(x => x.path);

//				return {
//					files: manifestFiles,
//					entrypoints: entrypointFiles,
//				};
//			},
//		}),
//	]
//};
