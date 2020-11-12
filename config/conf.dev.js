const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathConf = require('./conf.path');

const outputFile = '[name]';
const assetFile = '[name]';

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const confBase = require('./conf.base');

module.exports = (env, argv) => {
  // conf.base.jsのentryで追加したhtmlファイルを動的に生成する。
  const createHtmlPlugins = entry => {
    const htmpPlugins = [];
    Object.keys(entry).forEach(key => {
      htmpPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `../src/${key}.ejs`), // 入力ファイル名
          filename: `${key}.html`, // 出力されるファイル名
          inject: true,
          chunks: [key], // 読み込むjsファイルを指定
          myData: {
            TRACKING_CODE: pathConf.trackingCode[String(argv.deploy || 'local')],
          },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../src/img'),
            to: 'img',
          },
        ]),
        new MiniCssExtractPlugin({
          filename: `./css/${outputFile}.css`,
        }),
        new StylelintPlugin({
          configFile: './stylelint.config.js',
          files: './src/**/*.scss',
          fix: true,
        }),
      );
    });
    return htmpPlugins;
  };

  return merge(confBase({ argv, outputFile, assetFile }), {
    devtool: 'inline-source-map',
    plugins: createHtmlPlugins(confBase({ argv, outputFile, assetFile }).entry),
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      clientLogLevel: 'warning',
      host: 'localhost',
      compress: true,
      hot: false,
      quiet: false, // true: devServer起動時のconsole出力しない
      open: false, // npm run dev時にブラウザを開く場合true
      port: 3002, // port番号はデフォルトで8080, 既に使用されている場合は自動で8181になる。指定したい場合はここでする。
      watchOptions: { ignored: /node_modules/ }, // 差分を検知しないディレクトリ
    },
  });
};
