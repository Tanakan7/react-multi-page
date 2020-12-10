import 'intersection-observer';
import React from 'react';
import { css } from '@emotion/css';
import clsx from 'clsx';

// 指定した要素が一部でも画面に表示されていたらTrue
const checkElmVisible = elm => {
  const rect = elm.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
};

const ZERO_TO_SIXTY = [...Array(61).keys()];
const DEFAULT_THRESHOLD = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

const ScrollTest = () => {
  const headerElm = React.useRef(null);
  const footerElm = React.useRef(null);
  const bodyElm = React.useRef(null);
  const leftElm = React.useRef(null);
  const btnElm = React.useRef(null);

  /**
   * 左カラムの高さを表示している高さと同等にする
   * @type {number} visibleAreaHeight 左カラム以外の要素の高さ
   */
  const adjustLeftColHeight = React.useCallback(visibleAreaHeight => {
    leftElm.current.style.height = `${window.innerHeight - visibleAreaHeight}px`;
  }, []);

  // 左カラムの高さ調整処理
  React.useEffect(() => {
    const ADJUST_DEFAULT_OPTIONS = { threshold: DEFAULT_THRESHOLD };
    // ヘッダーが見えている時の調整
    const begin = () => {
      const callback = entries => {
        if (entries[0].isIntersecting) {
          // ヘッダーが見えているとき
          const visibleAreaHeight = entries[0].intersectionRect.height;
          const MARGIN_HEIGHT = 32;
          adjustLeftColHeight(visibleAreaHeight + MARGIN_HEIGHT);
        } else {
          // ヘッダーが見えなくなったとき
          leftElm.current.style.height = '';
        }
      };
      const observer = new IntersectionObserver(callback, ADJUST_DEFAULT_OPTIONS);
      const targets = document.querySelectorAll('.js-observe-top');
      targets.forEach(target => observer.observe(target)); // 複数の要素を考慮する必要はなさそう
    };
    // フッターが見えている時の調整
    const end = () => {
      const callback = entries => {
        if (entries[0].isIntersecting) {
          // フッターが見えているとき
          const visibleAreaHeight = entries[0].intersectionRect.height;
          const MARGIN_HEIGHT = 32;
          adjustLeftColHeight(visibleAreaHeight + MARGIN_HEIGHT);
        } else {
          // フッターが見えなくなったとき
          leftElm.current.style.height = '';
        }
      };
      const observer = new IntersectionObserver(callback, ADJUST_DEFAULT_OPTIONS);
      const targets = document.querySelectorAll('.js-observe-bottom');
      targets.forEach(target => observer.observe(target));
    };

    begin();
    end();
  }, []);

  // 左カラムと「検索する」ボタン固定処理
  React.useEffect(() => {
    // ヘッダーとカセットエリア間をスクロールで行き来するときに要素を固定する処理
    const begin = () => {
      const options = {
        rootMargin: '32px', // ヘッダーとのマージン分
      };
      const callback = entries => {
        if (entries[0].isIntersecting) {
          // ヘッダーが見えるようになったとき
          if (checkElmVisible(footerElm.current)) return;
          leftElm.current.classList.remove('-fixed');
          btnElm.current.classList.add('-fixed');
        } else {
          // ヘッダーが見えなくなったとき

          // カセットエリアを通過しているときは、左カラム固定をしない(end関数に任せる)
          // 理由: フッターが見えるときに endによって左カラムの固定が解除 → beginで左カラム固定 の順で実行されたときに意図せず左カラムが固定されてしまうから
          const footerVisible = leftElm.current.classList.contains('-fixToBottom');
          if (footerVisible) return;

          leftElm.current.classList.add('-fixed');
          btnElm.current.classList.remove('-fixed');
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(headerElm.current); // ターゲット要素を監視
    };

    // フッターとカセットエリア間をスクロールで行き来するときに要素を固定する処理
    const end = () => {
      const callback = entries => {
        if (entries[0].isIntersecting) {
          // フッターが見えたとき
          leftElm.current.classList.remove('-fixed');
          leftElm.current.classList.add('-fixToBottom');
        } else {
          // フッターが見えなくなったとき
          if (checkElmVisible(headerElm.current)) return;
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
      <div className={clsx([header, 'js-observe-top'])} ref={headerElm}>
        ヘッダー
      </div>
      <div className={bodyWrap} ref={bodyElm}>
        <div className={clsx([leftWrap])} ref={leftElm}>
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
      <div className={clsx([footer, 'js-observe-bottom'])} ref={footerElm}>
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
  -webkit-overflow-scrolling: touch;

  /*
  PC版のときだけ(SPではsmooth scroll付与。多分両立は不可)
  -ms-overflow-style: none; // IE, Edge 対応
  scrollbar-width: none; // Firefox 対応
  &::-webkit-scrollbar {
    display: none;
  }
  */
`;

const btnContainer = css`
  width: ${LEFT_COL_W};
  height: 64px;
  padding: 8px;
  position: absolute;
  bottom: 0;
  background-color: gray;

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
  height: 200px;
  margin-top: 32px;
`;

export default ScrollTest;
