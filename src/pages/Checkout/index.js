/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import itemPrices from '../../constants/ITEM_PRICES';
import Button from '../../components/Buttons';
import ListItem from '../../components/ListItem';

import { setDiscounts, addItems, subtractItems } from './utils';

const listItemStyled = 'border-dotted border-2 p-4 text-base flex justify-between border-black items-center border-t-0 border-x-0 w-1/2';

export default function Checkout() {
  const shoppingItems = Object.keys(itemPrices);

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
    setTotal(sum(Number(total), Number(itemPrices[item])).toFixed(2));
  };

  if (items === undefined) {
    return null;
  }

  const totalIsDiscounted = Boolean(totalDiscount);

  return (
    <div className="w-full mx-0 my-12 md:mx-auto lg:w-4/5">
      <ul>
        <li className="flex w-4/5">
          <p className="w-1/3 ml-4 text-xl font-bold">Item</p>
          <p className="w-1/3 -ml-4 text-xl font-bold md:-ml-2">Amount</p>
          <p className="w-1/3 -ml-4 text-xl font-bold">Discount</p>
        </li>

        {shoppingItems.map((item, index) => {
          const props = {
            item, items, updateBasket, index,
          };
          return (
            <ListItem {...props} />
          );
        })}
        <li className="flex justify-end">
          <div className={listItemStyled}>
            <p>Total Amount:</p>
            <p>
              £
              {!total ? '0.00' : total}
            </p>
          </div>
        </li>
        <li className="flex justify-end">
          <div className={listItemStyled}>
            <p>Total Discount:</p>
            <p className={`${totalIsDiscounted ? 'text-red-500' : 'text-black'}`}>
              {totalIsDiscounted ? `- £${totalDiscount.toFixed(2)}` : '£0.00'}
            </p>
          </div>
        </li>

        <li className="flex justify-end">
          <div className={listItemStyled}>
            <p>Total Cost:</p>
            <p>
              £
              {(total - totalDiscount).toFixed(2)}
            </p>
          </div>
        </li>

      </ul>
    </div>
  );
}
