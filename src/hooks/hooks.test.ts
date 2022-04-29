import { renderHook, act, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { useDebounce, useRequest } from '.';
it('useDebounce', () => {
  const { result, rerender } = renderHook(() => {
    const [value, setValue] = useState(0);
    const debouncedValue = useDebounce(value, 500);
    return { debouncedValue, setValue };
  });

  const {
    current: { debouncedValue, setValue },
  } = result;

  expect(debouncedValue).toBe(0);

  act(() => {
    setValue(1);
  });

  rerender();
  expect(debouncedValue).toBe(0);

  act(() => {
    jest.advanceTimersByTime(500);
  });
  rerender();

  expect(result.current.debouncedValue).toBe(1);
});

describe('useRequest', () => {
  it('resolves', async () => {
    const fetcherPromise = Promise.resolve(1);
    const fetch = jest.fn(() => fetcherPromise);
    const { result } = renderHook(() => useRequest(fetch, { params: 1 }));
    await act(() => fetcherPromise as any);
    expect(result.current.data).toBe(1);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
  });

  it('reject', async () => {
    try {
      const fetcherPromise = Promise.reject(1);
      const fetch = jest.fn(() => fetcherPromise);
      const { result } = renderHook(() => useRequest(fetch, { params: 1 }));
      await act(() => fetcherPromise as any);
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBe(1);
    } catch (error) {}
  });

  it('with validator', async () => {
    const fetcherPromise = Promise.resolve(1);
    const fetch = jest.fn(() => fetcherPromise);
    const { result } = renderHook(() =>
      useRequest(fetch, { params: '', paramsValidate: Boolean }),
    );
    await act(() => fetcherPromise as any);
    expect(fetch).toBeCalledTimes(0);
    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
  });
});
