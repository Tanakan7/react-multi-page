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

  React.useEffect(() => {
    stickybits(leftElm.current);
  }, []);

  return (
    <div>
      <div className={header}>ヘッダー</div>
      <div className={bodyWrap}>
        <div className={leftWrap} ref={leftElm}>
          {ZERO_TO_FIFTY_NINE.map(i => (
            <div className={mockItem} key={`left${i}`}>{`アイテム ${i}`}</div>
          ))}
        </div>
        <div className={clsx([rightWrap, 'rightWrapForIE11'])}>
          <div className={rightContiner}>
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

const header = css`
  background-color: aquamarine;
  width: 100%;
  height: 200px;
`;

const bodyWrap = css`
  display: flex;
  position: relative;
  margin-top: 32px;
`;

const leftWrap = css`
  flex-shrink: 0;
  background-color: #ffff99;
  width: 200px;
  height: 100vh;
  max-height: 100vh;
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

  // IE11のときは左カラムに position:fixed が付与され、右要素が左カラムの下に隠れるため、その対策
  &.js-is-sticky + .rightWrapForIE11 {
    margin-left: 200px;
  }
`;

const rightWrap = css`
  background-color: cornflowerblue;
  width: 100%;
`;

const rightContiner = css``;

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
