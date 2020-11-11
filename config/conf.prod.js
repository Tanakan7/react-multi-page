const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pathConf = require('./conf.path')
const confBase = require('./conf.base')

const outputFile = '[name].[chunkhash]'

module.exports = (env, argv) => {
  // conf.base.jsのentryで追加したhtmlファイルを動的に生成する。
  const createHtmlPlugins = entry => {
    const htmpPlugins = []

    Object.keys(entry).forEach(key => {
      htmpPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `../src/${key}.ejs`), // 入力ファイル名
          filename: `./${key}.html`, // 出力ファイル名
          inject: true,
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            preserveLineBreaks: true,
            removeScriptTypeAttributes: true,
          },
          chunks: [key], // 読み込むjsファイルを指定(このプロパティがないと個別に分けたいJS・CSSが各.htmlに出力されるため必須プロパティ)
          myData: {
            TRACKING_CODE: pathConf.trackingCode[String(argv.deploy || 'local')],
          },
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../src/img'),
            to: `${pathConf.assetsDir}img`,
          },
        ]),
      )
    })
    return htmpPlugins
  }

  return merge(confBase({ argv, outputFile }), {
    plugins: createHtmlPlugins(confBase({ argv, outputFile }).entry),
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true,
          extractComments: 'all', // コメント削除
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  })
}
