import { render } from '@testing-library/react';
import { Spin } from '.';
describe('Spin', () => {
  it('render spin', () => {
    const { baseElement, rerender } = render(
      <Spin spinning={false}>
        <>test</>
      </Spin>,
    );
    expect(baseElement).toMatchSnapshot();
    rerender(
      <Spin spinning={true}>
        <>test again</>
      </Spin>,
    );
    expect(baseElement).toMatchSnapshot();
    rerender(
      <Spin spinning={false}>
        <>test</>
      </Spin>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
