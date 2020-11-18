import React from 'react';
import { css } from '@emotion/css';
import stickybits from 'stickybits';
// import clsx from 'clsx';

export const ZERO_TO_SIXTY = [...Array(61).keys()];

const ScrollTest = () => {
  const leftElm = React.useRef(null);
  const btnElm = React.useRef(null);

  React.useEffect(() => {
    stickybits(leftElm.current, { useFixed: true });
    stickybits(btnElm.current, { verticalPosition: 'bottom', useFixed: true });

    /**
     * リロード時に左カラムが画面上部に見切れているときに、stickybitsに付与されるtop:0により左カラムが見えない問題の対策
     * Safari/Firefox/IE11 で発生
     * (その後の位置は、stickybitsによって制御)
     */
    const adjustLeftColPosition = () => {
      const leftElmTop = leftElm.current.getBoundingClientRect().top; // 左カラムのスクロール位置
      console.log(leftElmTop, 'timeout');
      if (leftElmTop < 0) {
        console.log('画面下部でリロードされた', leftElmTop);
        leftElm.current.style.top = 'auto';
        leftElm.current.style.bottom = 0;
      }
    };
    /**
     * ページ最上部でのページ読み込み時に検索ボタンの位置を初期化する
     * (その後の位置は、stickybitsによって制御)
     */
    const adjustLeftColBtnPosition = () => {
      const scrollPositon = window.pageYOffset;
      if (scrollPositon === 0) {
        btnElm.current.style.position = 'fixed';
        btnElm.current.style.bottom = 0;
      }
    };

    setTimeout(() => {
      adjustLeftColPosition();
      adjustLeftColBtnPosition();
    }, 500);
  }, []);

  return (
    <div>
      <div className={header}>ヘッダー</div>
      <div className={bodyWrap}>
        <div className={leftWrap} ref={leftElm}>
          <div className={scrollItems}>
            {ZERO_TO_SIXTY.map(i => (
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
          {ZERO_TO_SIXTY.map(i => (
            <div className={mockItem} key={`right${i}`}>{`アイテム ${i}`}</div>
          ))}
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
  overflow-y: scroll;

  // PC版のときだけ(SPではsmooth scroll付与。多分両立は不可)
  -ms-overflow-style: none; // IE, Edge 対応
  scrollbar-width: none; // Firefox 対応
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

const mockItem = css`
  margin: 16px auto;
`;

const footer = css`
  background-color: darkgreen;
  width: 100%;
  height: 2000px;
  margin-top: 32px;
`;

export default ScrollTest;
