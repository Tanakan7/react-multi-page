# 各種コマンド

[[_TOC_]]


## 開発

```sh
npm run dev
```


## ビルド

### テスト環境向けビルド

- APIのURLをテスト環境(test-)に向ける

```sh
npm run build:stage
```


### 本番環境向けビルド

- APIの向き先を本番環境に設定

```sh
npm run build:prod
```

### リリース用ビルド

- APIの向き先を本番環境に設定
- GoogleAnalyticsのトラッキングコードを本番用に切り替えます

```sh
npm run build:release
```

### 通常ビルド

- `npm run mock` + `npm run view` でデプロイせずに確認するときのビルド
- ローカルのモックAPIを利用できる

```sh
npm run build
```

## ビルドファイルのプレビュー

`./dist` 以下が `http://127.0.0.1:3100/` で閲覧できます

```sh
npm run view
```

## ローカルのモックAPI起動

```sh
npm run mock
```


## バンドルサイズの内訳表示

ビルド後JSのサイズを確認

```sh
npm run analyze
```
