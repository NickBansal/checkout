import React from 'react';
import {
  string, func, objectOf, number,
} from 'prop-types';

import Button from '../Buttons';
import itemPrices from '../../constants/ITEM_PRICES';

const buttonWrapper = 'border-dotted border-black border-l-2 pl-4 w-1/3 md:w-1/4 text-center';
const listStyles = 'border-dotted border-2 p-4 text-base flex justify-between border-black items-center border-t-0';

export default function ListItem({
  item,
  items,
  updateBasket,
  index,
}) {
  const disabled = items[item].quantity === 0;
  const isDiscounted = Number(items[item].discount) > 0;

  const discountText = isDiscounted ? 'text-red-600' : 'text-black';
  const listItemStyled = index !== 0 ? listStyles : `${listStyles} border-t-2`;

  return (
    <li key={item}>
      <div className={listItemStyled}>
        <p className="w-1/3 mr-2">
          {item}
          {' '}
          (
          {items[item].quantity}
          )
        </p>
        <p className="w-1/3">
          £
          {Number(itemPrices[item]).toFixed(2)}
        </p>
        <p className={`w-1/3 ${discountText}`}>
          {isDiscounted ? `- £${Number(items[item].discount).toFixed(2)}` : '£0.00'}
        </p>
        <div className={buttonWrapper}>
          <Button
            testId={`addBtn${index}`}
            disabled={false}
            handleClick={() => updateBasket(item, items[item], true)}
          >
            +
          </Button>
          <Button
            testId={`minusBtn${index}`}
            disabled={disabled}
            handleClick={() => updateBasket(item, items[item], false)}
          >
            -
          </Button>
        </div>
      </div>
    </li>
  );
}

ListItem.propTypes = {
  item: string.isRequired,
  items: objectOf(number.isRequired).isRequired,
  updateBasket: func.isRequired,
  index: number.isRequired,
};
