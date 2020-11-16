import React from 'react';
import { css } from '@emotion/css';
import stickybits from 'stickybits';
import clsx from 'clsx';

/**
 * TODO:
 * 右カラムに標準でmargin-leftを与える
 * (IEで微妙なタイミングで切り替わる問題があるため)
 *
 * 左カラムが画面トップに来たら固定
 * 下端で左カラム固定解除
 * スクロールバー削除
 * Enterボタン作成
 */

export const ZERO_TO_FIFTY_NINE = [...Array(60).keys()];

const ScrollTest = () => {
  const leftElm = React.useRef(null);
  const btnElm = React.useRef(null);

  React.useEffect(() => {
    stickybits(leftElm.current, { useFixed: true });
    stickybits(btnElm.current, { verticalPosition: 'bottom', useFixed: true });
  }, []);

  return (
    <div>
      <div className={header}>ヘッダー</div>
      <div className={bodyWrap}>
        <div className={leftWrap} ref={leftElm}>
          <div className={scrollItems}>
            {ZERO_TO_FIFTY_NINE.map(i => (
              <div className={mockItem} key={`left${i}`}>{`アイテム ${i}`}</div>
            ))}
          </div>
          <div className={btnContainer} ref={btnElm}>
            <button className={btn} type="button">
              検索する
            </button>
          </div>
        </div>
        <div className={rightWrap}>
          <div className={rightContainer}>
            {ZERO_TO_FIFTY_NINE.map(i => (
              <div className={mockItem} key={`right${i}`}>{`アイテム ${i}`}</div>
            ))}
          </div>
        </div>
      </div>
      <div className={footer}>フッター</div>
    </div>
  );
};

const LEFT_COL_W = '200px';

const header = css`
  background-color: aquamarine;
  width: 100%;
  height: 200px;
`;

const bodyWrap = css`
  position: relative;
  margin-top: 32px;
`;

const leftWrap = css`
  position: absolute;
  background-color: #ffff99;
  width: ${LEFT_COL_W};
  height: 100vh;
  max-height: 100vh;
`;

const scrollItems = css`
  height: calc(100% - 64px);
  //padding-bottom: 64px;
  overflow-y: scroll;

  // PC版のときだけ(SPではsmooth scroll付与。多分両立は不可)
  /* IE, Edge 対応 */
  -ms-overflow-style: none;
  /* Firefox 対応 */
  scrollbar-width: none;
  /* 追加で必要なコード */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const btnContainer = css`
  width: ${LEFT_COL_W};
  height: 64px;
  padding: 8px;
`;

const btn = css`
  background-color: indianred;
  height: 100%;
  width: 100%;
  text-align: center;
`;

const rightWrap = css`
  position: relative;
  left: ${LEFT_COL_W};
  background-color: cornflowerblue;
  width: calc(100% - ${LEFT_COL_W});
`;

const rightContainer = css``;

const mockItem = css`
  margin: 16px auto;
`;

const footer = css`
  background-color: darkgreen;
  width: 100%;
  height: 150px;
  margin-top: 32px;
`;

export default ScrollTest;
