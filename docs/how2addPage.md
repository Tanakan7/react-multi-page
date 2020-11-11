# 新規ページの作成方法

articleページ(例)を作成する流れ<br>
設定ファイル `名` が正しくないと、ビルドが正常に動作しないことにご注意下さい<br>

* HTML環境の作成
  * src/article.ejsを作成
  * 必要に応じてコンポーネントを切ってもOK (例: src/ejs/article/_header.ejs)
* CSS・JS環境の作成
  * `src/article/article.js(または.jsx)` を作成し、その内部で `src/article.scss` をインポートする
  * Reactを利用する場合は `src/components/Article` 配下にコンポーネントを作成していく
  * CSSの分割ファイル数が多い場合は、`src/css/article/header.scss` のように分離してもOK
* webpack設定の追記
  * `config/conf.base.js` の `entry` に設定を追加する。他の箇所は基本触らなくてOK
  * 書き方→ `article: path.resolve(__dirname, '../src/article/article.js'),`
