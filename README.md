# パッケージインストール

nodeバージョン: `14.15.0`<br>

```sh
npm ci
```

# Tree

```
├── config              // webpack設定
│     ├── conf.base.js  // 基本設定
│     ├── conf.dev.js   // ローカル開発時の設定
│     ├── conf.prod.js  // ビルド時の設定
│     ├── conf.path.js  // ビルドコマンド別で変更するパス・Key情報
│     └── mock          // npm run mockコマンド時に読み込むAPIモックファイル
│
├── dist                // ビルド後の納品物
├── src
│     ├── common               // プロダクト内の共通処理
│     ├── components           // Reactコンポーネント群
│     │     └── Map            // マップ画面のコンポーネント群
│     │         ├── MapBody    // GoogleMapを描画
│     │         ├── Watcher    // 通信・再描画処理など
│     │         ├── common     // マップ画面の共通処理群
│     │         └── index.jsx  // マップ画面のコンポーネント取りまとめ
│     ├── css
│     │     ├── _reset.scss      // リセットCSS(ブラウザ標準スタイルを矯正)
│     │     └── _variables.scss  // SCSSで使用するグローバル変数
│     ├── ejs                    // ejsコンポーネント群
│     │     └── index            // ホーム画面のejsコンポーネント群
│     │
│     ├── index.ejs           // ホーム画面用HTMLルート
│     ├── index.js            // ホーム画面用JSルート
│     ├── index.scss          // ホーム画面用CSSルート
│     ├── map                 // マップ画面root系資産取りまとめディレクトリ
│     │     ├── App.jsx       // マップ画面用のReact定義
│     │     ├── map.jsx       // マップ画面のエントリーポイント
│     │     └── map.scss      // マップ画面のSCSSルート
│     ├── map.ejs             // マップ画面のHTMLルート
│     ├── store               // 状態管理
│     │     └── mapStore
│     │         └── index.js  // マップ画面用の状態管理ファイル
│     └── utils               // 汎用処理
└── package-lock.json                 // NodeJSパッケージ群のバージョン情報
```

# その他ドキュメント

- [実行コマンド](./docs/commands.md)
- [ビルド環境](./docs/env.md)
- [新規ページの作成方法](./docs/how2addPage.md)
