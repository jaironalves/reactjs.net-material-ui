import HtmlWebpackPlugin from 'html-webpack-plugin'
import Merge from 'webpack-merge'

export default options =>
  Merge({
    mode: options.mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [options.cssStyleLoader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [options.fileLoader],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
    ],
  })
