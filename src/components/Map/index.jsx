import React from 'react';
import { css } from 'emotion';

/**
 * TODO:
 * 左カラムが画面トップに来たら固定
 * 下端で左カラム固定解除
 */

export const ZERO_TO_FIFTY_NINE = [...Array(60).keys()];

export const Map = () => (
  <div>
    <div className={header}>ヘッダー</div>
    <div className={bodyWrap}>
      <div className={leftWrap}>
        {ZERO_TO_FIFTY_NINE.map(i => (
          <div className={mockItem} key={`left${i}`}>{`アイテム ${i}`}</div>
        ))}
      </div>
      <div className={rightWrap}>
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
  background-color: #ffff99;
  width: 200px;
  height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
`;

const rightWrap = css`
  background-color: cornflowerblue;
  width: 100%;
  margin-left: 200px; // 左カラムと同じ幅
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
