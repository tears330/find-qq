import { render } from '@testing-library/react';
import { AccountCard } from '.';
describe('AccountCard', () => {
  it('render card element', () => {
    const { baseElement, rerender } = render(
      <AccountCard
        account={{
          code: 1,
          name: '木小末',
          qlogo: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=876192777',
          qq: '876192777',
        }}
      />,
    );
    expect(baseElement).toMatchSnapshot();

    rerender(
      <AccountCard
        account={{
          code: 1,
          name: '木小末',
          qlogo: 'https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=876192777',
          qq: '7777777',
        }}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
