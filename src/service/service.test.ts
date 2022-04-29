import { fetchQqInfo } from './qq';

describe('service', () => {
  it('fetch qq info - valid', async () => {
    const res = await fetchQqInfo('9998123');
    expect(res).toBeDefined();
    expect(res.code).toBe(1);
  });

  it('fetch qq info - invalid', async () => {
    expect.assertions(1);
    try {
      await fetchQqInfo('123');
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toBeDefined();
    }
  });
});
