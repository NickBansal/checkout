import React from 'react';
import {
  string, shape, number, func,
} from 'prop-types';

import { Row, Cell } from '../Table';
import Button from '../Buttons';
import ITEM_PRICES from '../../constants/ITEM_PRICES';

export default function ShoppingItemRow({
  item, items, index, handleClick,
}) {
  const disabled = items[item].quantity === 0;
  const isDiscounted = Number(items[item].discount) > 0;

  return (
    <Row>
      <Cell>
        {item}
      </Cell>
      <Cell>
        £
        {Number(ITEM_PRICES[item].price).toFixed(2)}
      </Cell>
      <Cell>
        {items[item].quantity}
      </Cell>
      <Cell className={isDiscounted ? 'text-red-500' : 'text-black'}>
        {isDiscounted ? `- £${Number(items[item].discount).toFixed(2)}` : '£0.00'}
      </Cell>
      <Cell className="w-1/5">
        <Button
          testId={`addBtn${index}`}
          label="add item to list"
          disabled={false}
          handleClick={() => handleClick(item, items[item], true)}
        >
          +
        </Button>
        <Button
          testId={`minusBtn${index}`}
          label="subtract item from list"
          disabled={disabled}
          handleClick={() => handleClick(item, items[item], false)}
        >
          -
        </Button>
      </Cell>
    </Row>
  );
}

ShoppingItemRow.propTypes = {
  item: string.isRequired,
  items: shape({
    quantity: number,
    price: number,
    discount: number,
  }).isRequired,
  handleClick: func.isRequired,
  index: number.isRequired,
};
