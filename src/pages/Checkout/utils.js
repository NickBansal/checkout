import ITEM_PRICES from '../../constants/ITEM_PRICES';

const addItems = (a, b) => a + b;
const subtractItems = (a, b) => a - b;

const setDiscounts = (item, add, quantity, totalDiscount, previous, fn) => {
  const currentItem = ITEM_PRICES[item];
  const sum = add ? addItems : subtractItems;
  const totalQuantity = add ? quantity : quantity + 1;

  if (currentItem && totalQuantity % currentItem.discountAmount === 0) {
    fn(sum(totalDiscount, currentItem.discount));
    return sum(previous, currentItem.discount);
  }
  return previous;
};

export { setDiscounts, addItems, subtractItems };
