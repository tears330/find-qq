import { FC, memo } from 'react';
import './Result.css';

type Props = {
  msg: string;
};

export const Result: FC<Props> = memo(({ msg }) => (
  <div className="com-result">
    <p>Woops! Something went wrong :(</p>
    {msg && <p>{msg}</p>}
  </div>
));
