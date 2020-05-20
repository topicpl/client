const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');

const TRANSLATIONS = glob.sync('./src/assets/locales/*.json').map((file) => ({
  lang: path.basename(file, path.extname(file)),
  translation: require(file),
}));

module.exports = TRANSLATIONS.map(({ lang, translation }) => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/public/' + lang),
    filename: `[name].${lang}.js`,
    // remove public path when using state management
    publicPath: '/' + lang,
  },
  devServer: {
    contentBase: path.join(__dirname, '/public'),
    inline: true,
    port: 3001,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new I18nPlugin(translation),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
}));
