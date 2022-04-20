/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import itemPrices from './itemPrices';
import Button from '../../components/Buttons';

import { setDiscounts, addItems, subtractItems } from './utils';

const listItem = 'border-dotted border-2 p-4 text-base flex justify-between border-black items-center border-t-0';
const buttonWrapper = 'border-dotted border-black border-l-2 pl-4 w-1/3 md:w-1/4 text-center';

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
          const listItemStyled = index !== 0 ? listItem : `${listItem} border-t-2`;
          const disabled = items[item].quantity === 0;
          const isDiscounted = Number(items[item].discount) > 0;
          const discountText = isDiscounted ? 'text-red-600' : 'text-black';

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
        })}
        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2 `}>
            <p>Total Amount:</p>
            <p>
              £
              {!total ? '0.00' : total}
            </p>
          </div>
        </li>
        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2`}>
            <p>Total Discount:</p>
            <p className={`${totalIsDiscounted ? 'text-red-500' : 'text-black'}`}>
              {totalIsDiscounted ? `- £${totalDiscount.toFixed(2)}` : '£0.00'}
            </p>
          </div>
        </li>

        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2 `}>
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
