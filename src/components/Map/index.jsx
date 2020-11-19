import 'intersection-observer';
import React from 'react';
import { css } from '@emotion/css';
// import clsx from 'clsx';

/**
 * 指定した要素が一部でも画面に表示されていたらTrue
 */
const checkElmVisible = elm => {
  const rect = elm.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
};

const ZERO_TO_SIXTY = [...Array(61).keys()];

const ScrollTest = () => {
  const headerElm = React.useRef(null);
  const footerElm = React.useRef(null);
  const bodyElm = React.useRef(null);
  const leftElm = React.useRef(null);
  const btnElm = React.useRef(null);

  React.useEffect(() => {
    /**
     * ヘッダーとカセットエリア間をスクロールで行き来するときに要素を固定する処理
     */
    const begin = () => {
      const options = {
        rootMargin: '32px', // ヘッダーとのマージン分
      };
      const callback = entries => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          // ヘッダーが見えるようになったとき
          if (checkElmVisible(footerElm.current)) return;
          console.log('begin 解除');
          leftElm.current.classList.remove('-fixed');
          btnElm.current.classList.add('-fixed');
        } else {
          // ヘッダーが見えなくなったとき

          // カセットエリアを通過しているときは、左カラム固定をしない(end関数に任せる)
          // 理由: フッターが見えるときに endによって左カラムの固定が解除 → beginで左カラム固定 の順で実行されたときに意図せず左カラムが固定されてしまうから
          const footerVisible = leftElm.current.classList.contains('-fixToBottom');
          if (footerVisible) return;

          console.log('begin 固定');
          leftElm.current.classList.add('-fixed');
          btnElm.current.classList.remove('-fixed');
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(headerElm.current); // ターゲット要素を監視
    };

    /**
     * フッターとカセットエリア間をスクロールで行き来するときに要素を固定する処理
     */
    const end = () => {
      const callback = entries => {
        if (entries[0].isIntersecting) {
          // フッターが見えたとき
          console.log('end 解除');
          leftElm.current.classList.remove('-fixed');
          leftElm.current.classList.add('-fixToBottom');
        } else {
          // フッターが見えなくなったとき
          if (checkElmVisible(headerElm.current)) return;
          console.log('end 固定');
          leftElm.current.classList.add('-fixed');
          leftElm.current.classList.remove('-fixToBottom');
        }
      };
      const observer = new IntersectionObserver(callback);
      observer.observe(footerElm.current);
    };

    begin();
    end();
  }, []);

  return (
    <div>
      <div className={header} ref={headerElm}>
        ヘッダー
      </div>
      <div className={bodyWrap} ref={bodyElm}>
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
      <div className={footer} ref={footerElm}>
        フッター
      </div>
    </div>
  );
};

/* ============ スタイル ============ */
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

  &.-fixed {
    position: fixed;
    top: 0;
  }
  &.-fixToBottom {
    bottom: 0;
  }
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
  position: absolute;
  bottom: 0;

  &.-fixed {
    position: fixed;
  }
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
