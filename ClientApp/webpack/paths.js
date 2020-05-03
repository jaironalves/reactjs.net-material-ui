import path from 'path'

export default {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../../', 'wwwroot/dist'),
  srcPath: path.resolve(__dirname, '../', 'src'),
  entryPath: (mode) =>
    mode === 'production'
      ? path.resolve(__dirname, '../', 'expose-components.js')
      : path.resolve(__dirname, '../', 'src/index.js'),
  publicPath: path.resolve(__dirname, '../', 'src/public'),
  templatePath: path.resolve(__dirname, '../', 'src/public/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
}
