# 環境について

webpackでHTML, JS, CSSのビルドを行う

## 設定ファイル

```md
├── config
│   ├── conf.base.js  // 基本設定
│   ├── conf.dev.js   // ローカル開発用設定
│   ├── conf.prod.js  // ビルド設定
│   └── conf.path.js  // 各種path・keyなど
```

### 設定ファイル内変数

#### argv.mode

コマンド実行時に `--mode` で指定した値が入る
例: `webpack-dev-server --config config/conf.dev.js --mode development`

#### argv.deploy

ビルドコマンド実行時に `--deploy` で指定した値が入る(staging/productionビルド時のみ)
例: `npm run build -- --deploy stage`
