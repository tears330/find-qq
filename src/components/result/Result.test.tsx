import { render } from '@testing-library/react';
import { Result } from '.';
describe('Result', () => {
  it('render result', () => {
    const { baseElement, rerender } = render(<Result msg="test" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Result msg="test2" />);

    expect(baseElement).toMatchSnapshot();
  });
});
