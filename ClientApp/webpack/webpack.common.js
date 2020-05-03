import Webpack from 'webpack'
import ManifestPlugin from 'webpack-manifest-plugin'
import Merge from 'webpack-merge'
import paths from './paths'

const GenerateProcessEnv = (mode) => {
  let path = '.env'
  if (mode !== 'production') path = `.env.${mode}`

  require('dotenv').config({
    path,
  })
  return {
    NODE_ENV: JSON.stringify(mode),
    API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
  }
}

const eslintLoader = {
  loader: 'eslint-loader',
  options: {
    eslintPath: require.resolve('eslint'),
    resolvePluginsRelativeTo: __dirname,
  },
}

const urlLoader = ({ namePattern }) => ({
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: `assets/${namePattern}.[ext]`,
  },
})

const fileLoader = ({ namePattern }) => ({
  loader: 'file-loader',
  options: {
    name: namePattern + '.[ext]',
    outputPath: 'assets',
  },
})

export const factoryPlugins = {
  Progress: () => new Webpack.ProgressPlugin(),
  Define: (mode) =>
    new Webpack.DefinePlugin({
      'process.env': GenerateProcessEnv(mode),
    }),  
  Manifest: () =>
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)

        const entrypointFiles = files
          .filter((x) => x.isInitial && !x.name.endsWith('.map'))
          .map((x) => x.path)

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),
}

export default (options) =>
  Merge({
    mode: options.mode,
    entry: paths.entryPath(options.mode),
    output: {
      filename: `${paths.jsFolder}/${options.namePattern}.js`,
      globalObject: 'this',
      path: paths.outputPath,
      chunkFilename: `${paths.jsFolder}/${options.namePattern}.[chunkhash].js`,
      publicPath: '/',
    },
    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          test: /\.js$/,
          include: paths.srcPath,
          enforce: 'pre',
          use: [eslintLoader],
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              use: [urlLoader(options)],
            },
            {
              test: /\.js$/,
              include: paths.srcPath,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [options.styleLoaderInitial, 'css-loader', 'postcss-loader'],
            },
            {
              test: /\.(sa|sc)ss$/,
              use: [options.styleLoaderInitial, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              use: [fileLoader(options)],
            },
          ],
        },
      ],
    },    
  })
