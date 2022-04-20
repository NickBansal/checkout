const addItems = (a, b) => a + b;
const subtractItems = (a, b) => a - b;

const setDiscounts = (item, add, quantity, totalDiscount, previous, fn) => {
  const sum = add ? addItems : subtractItems;
  const totalQuantity = add ? quantity : quantity + 1;

  if (item === 'Face Masks' && totalQuantity % 2 === 0) {
    fn(sum(totalDiscount, 1));
    return sum(previous, 1);
  }
  if (item === 'Toilet Paper' && totalQuantity % 6 === 0) {
    fn(sum(totalDiscount, 0.65));
    return sum(previous, 0.65);
  }
  return previous;
};

export { setDiscounts, addItems, subtractItems };
