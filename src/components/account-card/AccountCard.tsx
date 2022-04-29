import { FC, memo } from 'react';
import { QqInfo } from '../../service';
import './AccountCard.css';

type Props = {
  account: QqInfo;
};

export const AccountCard: FC<Props> = memo(
  ({ account: { qlogo, qq, name } }) => (
    <div className="com-account-card">
      <img src={qlogo} alt={qq} />
      <div className="com-account-card-info">
        <div className="com-account-card-info-name">{name}</div>
        <div className="com-account-card-info-qq">{qq}</div>
      </div>
    </div>
  ),
);
