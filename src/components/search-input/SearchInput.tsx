import React, { FC, InputHTMLAttributes, memo } from 'react';
import './SearchInput.css';

type Props = {} & InputHTMLAttributes<HTMLInputElement>;

export const SearchInput: FC<Props> = memo((props) => (
  <div className="com-search">
    <input autoComplete="off" autoFocus type="search" {...props} />
  </div>
));
