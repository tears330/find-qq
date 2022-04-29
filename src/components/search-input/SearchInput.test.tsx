import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from '.';
describe('SearchInput', () => {
  it('render search input', () => {
    const { baseElement } = render(<SearchInput />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(baseElement).toMatchSnapshot();
  });

  it('controll mode', () => {
    const fn = jest.fn();
    render(<SearchInput value="123123" onChange={fn} />);

    const result = screen.getByRole('searchbox') as HTMLInputElement;
    expect(result.value).toBe('123123');

    fireEvent.change(result, { target: { value: 'test' } });

    expect(fn).toBeCalled();
  });

  it('custom input properties', () => {
    render(<SearchInput type="checkbox" />);
    const result = screen.getByRole('checkbox') as HTMLInputElement;
    expect(result.type).toBe('checkbox');
  });
});
