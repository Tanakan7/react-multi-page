module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss'],
  syntax: 'scss',
  rules: {
    // extendsのルールを基準にカスタムしていく
    // インデントの指定
    indentation: 2,
    // ダブルクォートを使う
    'string-quotes': 'double',
    // 1未満の少数の先頭の0を省略する
    'number-leading-zero': 'never',
    // 変数定義等とプロパティ宣言との間に改行は入れない
    'declaration-empty-line-before': 'never',
    // プロパティのネストを禁止
    'scss/declaration-nested-properties': 'never',
    // @ルールの前に1行空けることを必須としない
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment',
          'first-nested',
          'inside-block',
          'blockless-after-same-name-blockless',
          'blockless-after-blockless',
        ],
      },
    ],
    // ルールを消す or オプションを指定し直すでエラーの制御ができます
    // セレクターごとの改行
    'rule-empty-line-before': null,
    // 重複セレクタの許可
    'no-duplicate-selectors': null,
    // 詳細度の高いセレクタの後に詳細度の低いセレクタを禁止
    'no-descending-specificity': null,
    // 空行の数を制限
    'max-empty-lines': null,
    // IDへのスタイルを許可するか
    'selector-max-id': null,
    // ネストの深さで警告を出す
    'max-nesting-depth': null,
    // class名の命名規則
    'selector-class-pattern': null,
    // プロパティと値のペアのブラックリスト
    'declaration-property-value-blacklist': null,
    // タグをセレクターに指定するのを許可するか
    'selector-no-qualifying-type': null,
    // プロパティのvendor-prefixを許可するか
    'property-no-vendor-prefix': null,
    // 値のvendor-prefixを許可するか
    'value-no-vendor-prefix': null,
    // 複合セレクタの数を制限
    'selector-max-compound-selectors': null,
    // プロパティのアルファベット順ソート
    'order/properties-alphabetical-order': null,
    // 冗長なネスティングセレクタを許可するか
    'scss/selector-no-redundant-nesting-selector': null,
    // scss変数名の命名規則
    'scss/dollar-variable-pattern': null,
    // @extend する場合はプレースホルダーに限定するかどうか
    'scss/at-extend-no-missing-placeholder': null,
    // 並び順
    'order/order': null,
    // mixinの命名規則
    'scss/at-mixin-pattern': null,
    // placeholderの命名規則
    'scss/percent-placeholder-pattern': null,
  },
}
