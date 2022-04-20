/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import ITEM_PRICES from '../../constants/ITEM_PRICES';
import ShoppingItemRow from '../../components/ShoppingItemRow';
import Table, {
  THead, TBody, Row, Cell,
} from '../../components/Table';

import { setDiscounts, addItems, subtractItems } from './utils';

export default function Checkout() {
  const shoppingItems = Object.keys(ITEM_PRICES);

  const [items, setItems] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    setItems(shoppingItems.reduce((acc, item) => {
      acc[item] = {
        quantity: 0,
        price: 0,
        discount: 0,
      };
      return acc;
    }, {}));
  }, []);

  const itemDiscounts = (item, previous, quantity, add) => setDiscounts(
    item,
    add,
    quantity,
    totalDiscount,
    previous,
    setTotalDiscount,
  );

  const updateBasket = (item, values, add) => {
    const sum = add ? addItems : subtractItems;

    setItems((prevState) => {
      const quantity = sum(prevState[item].quantity, 1);
      return ({
        ...prevState,
        [item]: {
          ...values,
          quantity,
          discount: itemDiscounts(item, prevState[item].discount, quantity, add),
        },
      });
    });
    setTotal(sum(Number(total), Number(ITEM_PRICES[item])).toFixed(2));
  };

  if (items === undefined) {
    return null;
  }

  const totalIsDiscounted = Boolean(totalDiscount);

  return (
    <Table className="w-full mx-auto my-4 md:w-4/5">
      <THead className="font-bold border-b-2 border-black border-dashed">
        <Row>
          <Cell>Item</Cell>
          <Cell>Price</Cell>
          <Cell>Amount</Cell>
          <Cell>Discount</Cell>
          <Cell />
        </Row>
      </THead>
      <TBody>
        {shoppingItems.map((item, index) => {
          const props = {
            item,
            items,
            index,
            handleClick: updateBasket,
          };

          return (
            <ShoppingItemRow {...props} />
          );
        })}
        <Row className="font-bold border-t-2 border-black border-dashed">
          <Cell />
          <Cell />
          <Cell />
          <Cell className="py-2">Total Amount:</Cell>
          <Cell className="py-2">
            £
            {!total ? '0.00' : total}
          </Cell>
        </Row>

        <Row className="font-bold">
          <Cell />
          <Cell />
          <Cell />
          <Cell className="py-2">Total Discount:</Cell>
          <Cell className="py-2">
            {totalIsDiscounted ? `- £${totalDiscount.toFixed(2)}` : '£0.00'}
          </Cell>
        </Row>

        <Row className="font-bold">
          <Cell />
          <Cell />
          <Cell />
          <Cell className="py-2">Total Cost:</Cell>
          <Cell className="py-2">
            £
            {(total - totalDiscount).toFixed(2)}
          </Cell>
        </Row>

      </TBody>
    </Table>
  );
}
