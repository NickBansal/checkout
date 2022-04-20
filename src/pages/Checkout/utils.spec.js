import { setDiscounts, addItems, subtractItems } from './utils';

const fn = jest.fn();

describe('Utils unit testing', () => {
  describe('Adding items', () => {
    it('should add two numbers together', () => {
      expect(addItems(3, 4)).toEqual(7);
    });
    it('should add two numbers together and ignore any other numbers', () => {
      expect(addItems(3, 4, 8676)).toEqual(7);
    });
  });

  describe('Subtracting items', () => {
    it('should subtract two numbers together', () => {
      expect(subtractItems(7, 4)).toEqual(3);
    });
    it('should add subtract numbers together and ignore any other numbers', () => {
      expect(subtractItems(7, 4, 8676)).toEqual(3);
    });
  });

  describe('Set dicounts', () => {
    it('should return previous value if item is not recognised', () => {
      expect(setDiscounts('', true, 1, 0, 2, fn)).toBe(2);
    });

    it('should return previous value if face masks have not reached discount amount', () => {
      expect(setDiscounts('Face Masks', true, 1, 4, 2, fn)).toBe(2);
    });

    describe('Face Masks', () => {
      it('should increase discount if face masks have reached discount amount', () => {
        expect(setDiscounts('Face Masks', true, 2, 0, 2, fn)).toBe(3);
      });
      it('should increase discount correctly for face masks', () => {
        expect(setDiscounts('Face Masks', true, 24, 0, 30, fn)).toBe(31);
        expect(setDiscounts('Face Masks', true, 18, 0, 27, fn)).toBe(28);
        expect(setDiscounts('Face Masks', true, 8, 0, 13, fn)).toBe(14);
      });
      it('should decrease discount correctly for face masks', () => {
        expect(setDiscounts('Face Masks', false, 23, 0, 30, fn)).toBe(29);
        expect(setDiscounts('Face Masks', false, 17, 0, 27, fn)).toBe(26);
        expect(setDiscounts('Face Masks', false, 7, 0, 13, fn)).toBe(12);
      });
    });

    describe('Toilet Paper', () => {
      it('should return previous value if toilet paper have not reached discount amount', () => {
        expect(setDiscounts('Toilet Paper', true, 1, 4, 2, fn)).toBe(2);
      });
      it('should increase discount if toilet paper have reached discount amount', () => {
        expect(setDiscounts('Toilet Paper', true, 6, 0, 0, fn)).toBe(0.65);
      });
      it('should increase discount correctly for toilet paper ', () => {
        expect(setDiscounts('Toilet Paper', true, 24, 0, 30, fn)).toBe(30.65);
        expect(setDiscounts('Toilet Paper', true, 18, 0, 27, fn)).toBe(27.65);
        expect(setDiscounts('Toilet Paper', true, 12, 0, 13, fn)).toBe(13.65);
      });
      it('should decrease discount correctly for toilet paper ', () => {
        expect(setDiscounts('Toilet Paper', false, 23, 0, 30, fn)).toBe(29.35);
        expect(setDiscounts('Toilet Paper', false, 17, 0, 27, fn)).toBe(26.35);
        expect(setDiscounts('Toilet Paper', false, 5, 0, 13, fn)).toBe(12.35);
      });
    });
  });
});

// const setDiscounts = (item, add, quantity, totalDiscount, previous, fn) => {
//     const sum = add ? addItems : subtractItems;
//     const totalQuantity = add ? quantity : quantity + 1;

//     if (item === 'Face Masks' && totalQuantity % 2 === 0) {
//       fn(sum(totalDiscount, 1));
//       return sum(previous, 1);
//     }
//     if (item === 'Toilet Paper' && totalQuantity % 6 === 0) {
//       fn(sum(totalDiscount, 0.65));
//       return sum(previous, 0.65);
//     }
//     return previous;
//   };
