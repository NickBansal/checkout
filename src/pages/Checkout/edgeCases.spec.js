import { setDiscounts } from './utils';

const fn = jest.fn();

jest.mock('../../constants/ITEM_PRICES', () => ({
  AHAH: {
    price: 3.25,
    discountAmount: 3,
    discount: 1.25,
  },
}), { virtual: true });

describe('Edge case examples', () => {
  it('should show the correct added discount if the data has been changed', () => {
    expect(setDiscounts('AHAH', true, 18, 0, 30, fn)).toBe(31.25);
    expect(setDiscounts('AHAH', true, 6, 0, 10, fn)).toBe(11.25);
    expect(setDiscounts('AHAH', true, 3, 0, 80, fn)).toBe(81.25);
  });

  it('should show the correct added discount if the data has been changed', () => {
    expect(setDiscounts('AHAH', false, 17, 0, 30, fn)).toBe(28.75);
    expect(setDiscounts('AHAH', false, 5, 0, 10, fn)).toBe(8.75);
    expect(setDiscounts('AHAH', false, 2, 0, 80, fn)).toBe(78.75);
  });
});
