import React, { ChangeEventHandler, FC, useCallback, useState } from 'react';
import { AccountCard } from './components/account-card';
import { Result } from './components/result';
import { SearchInput } from './components/search-input';
import { Spin } from './components/spin';
import { useDebounce, useRequest } from './hooks';
import { fetchQqInfo } from './service';

import './App.css';

export const App: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue, 800);

  const {
    data: accountInfo,
    loading,
    error,
  } = useRequest(fetchQqInfo, {
    params: debounceValue,
    paramsValidate: Boolean,
  });

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearchValue(e.target.value.replace(/[^0-9]/g, ''));
    },
    [],
  );

  return (
    <div className="App">
      <header className="App-header">🕵️ QQ 号查询</header>
      <section className="search-section">
        <SearchInput
          value={searchValue}
          onChange={handleSearch}
          type="search"
          maxLength={10}
        />
      </section>
      <Spin spinning={loading}>
        <section className="result-section">
          {accountInfo && accountInfo.code === 1 && (
            <AccountCard account={accountInfo} />
          )}
          {error && <Result msg={error.message || '网络异常'} />}
        </section>
      </Spin>
    </div>
  );
};
