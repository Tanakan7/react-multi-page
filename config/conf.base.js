const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AutoPreFixer = require('autoprefixer')
const pathConf = require('./conf.path')
const webpack = require('webpack')

const getAssetPath = mode => {
  return `${pathConf.host[mode]}${pathConf.projectPath}`
}

module.exports = ({ argv, outputFile }) => {
  return {
    entry: {
      // htmlが増える毎にここに追記(ページ名: そのページのJSファイル)
      index: path.resolve(__dirname, '../src/index.js'),
      map: path.resolve(__dirname, '../src/map/map.jsx'),
    },
    output: {
      filename: `./js/${outputFile}.js`,
      path: path.resolve(__dirname, '../dist'),
    },
    devtool: String(argv.deploy) ? 'none' : 'source-map', // テスト・本番環境用ビルド時はソースマップを生成しない
    plugins: [
      // スタイル情報をcssファイルとして出力
      new MiniCssExtractPlugin({
        filename: `./css/${outputFile}.css`,
      }),
      new webpack.DefinePlugin({
        MODE: JSON.stringify(argv.mode),
        STATIC_PATH: JSON.stringify(pathConf.staticFiles[String(argv.deploy || 'local')]),
        SEARCH_API_URL: JSON.stringify(pathConf.searchApi[String(argv.deploy || 'local')].url),
        SEARCH_API_KEY: JSON.stringify(pathConf.searchApi[String(argv.deploy || 'local')].key),
        TRACKING_CODE: JSON.stringify(pathConf.trackingCode[String(argv.deploy || 'local')]),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
              options: {
                formatter: require('eslint-friendly-formatter'),
                emitWarning: true,
              },
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                url: false, // css内で画像の相対パス指定したい場合はfalseにする
                sourceMap: argv.deploy ? false : true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [AutoPreFixer()],
                sourceMap: argv.deploy ? false : true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: argv.deploy ? false : true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                regExp: /src\/img\/((?:[^\/]*\/)*)(.*)/,
                // サブディレクトリがあれば「サブディレクトリ名 + /」、なければ空文字列が[1]に入る
                name: '[1][name].[ext]?v=[hash]',
                outputPath: `./${pathConf.assetsDir}img/`,
                publicPath: path => {
                  const excludeCommonImgPath = path.replace('img/', '')
                  return argv.deploy
                    ? `${getAssetPath(argv.deploy)}${pathConf.assetsDir}img/${excludeCommonImgPath}`
                    : `${getAssetPath('local')}${pathConf.assetsDir}img/${excludeCommonImgPath}`
                },
              },
            },
          ],
        },
        {
          test: /\.ejs$/,
          use: [
            {
              loader: 'ejs-easy-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, '../src'),
        '@img': path.resolve(__dirname, '../src/img'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@store': path.resolve(__dirname, '../src/store'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@common': path.resolve(__dirname, '../src/common'),
      },
    },
  }
}
