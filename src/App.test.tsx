import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from './App';
import { act } from 'react-dom/test-utils';
import { fetchQqInfo } from './service';

jest.mock('./service');

const mockFetchQqInfo = fetchQqInfo as typeof fetchQqInfo & jest.Mock;

describe('find qq', () => {
  it('basic render', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();

    mockFetchQqInfo.mockResolvedValue({
      name: 'test',
      qq: '123123',
      code: 1,
      qlogo: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=123123',
    });

    const input = screen.getByRole('searchbox');

    fireEvent.input(input, { target: { value: '123123' } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });

    expect(baseElement).toMatchSnapshot();

    mockFetchQqInfo.mockRejectedValue(new Error('error-test'));

    fireEvent.input(input, { target: { value: '123' } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(screen.getByText('error-test')).toBeInTheDocument();
    });

    expect(baseElement).toMatchSnapshot();

    mockFetchQqInfo.mockRejectedValue(new Error());

    fireEvent.input(input, { target: { value: '1233' } });

    act(() => {
      jest.advanceTimersByTime(800);
    });

    await waitFor(() => {
      expect(screen.getByText('网络异常')).toBeInTheDocument();
    });

    expect(baseElement).toMatchSnapshot();
  });
});
