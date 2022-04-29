import React, { FC, memo, ReactElement } from 'react';
import './Spin.css';

type Props = {
  spinning: boolean;
  children: ReactElement;
};

export const Spin: FC<Props> = memo(({ spinning, children }) =>
  spinning ? (
    <div className="com-spin">
      <div className="com-spin-loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="com-spin-wrapper">{children}</div>
    </div>
  ) : (
    children
  ),
);
