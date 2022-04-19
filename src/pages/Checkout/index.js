/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import itemPrices from './itemPrices';

const listItem = 'border-dotted border-2 p-4 text-lg flex justify-between border-black items-center border-t-0';
const buttonWrapper = 'border-dotted border-black border-l-2 pl-4 w-1/5 md:w-1/4 text-center';
const buttonItem = 'mx-1 bg-orange-200 hover:bg-orange-600 transition-colors text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px]';
const disabledBtn = 'cursor-not-allowed bg-gray-200 mx-1 text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px] text-white';

export default function Checkout() {
  const shoppingItems = Object.keys(itemPrices);

  const [items, setItems] = useState(undefined);
  const [total, setTotal] = useState('0');
  const [totalDiscount, setTotalDiscount] = useState('0');

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

  const addToBasket = (item, values) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: {
        ...values,
        quantity: prevState[item].quantity + 1,
      },
    }));
    setTotal((Number(total) + Number(itemPrices[item])).toFixed(2));
  };

  const subtractFromBasket = (item, values) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: {
        ...values,
        quantity: prevState[item].quantity - 1,
      },
    }));
    setTotal((Number(total) - Number(itemPrices[item])).toFixed(2));
  };

  if (items === undefined) {
    return null;
  }
  return (
    <div className="mx-0 my-8 md:mx-auto w-full lg:w-1/2">
      <ul>
        {shoppingItems.map((item, index) => {
          const listItemStyled = index !== 0 ? listItem : `${listItem} border-t-2`;
          const disabled = items[item].quantity === 0;

          return (
            <li key={item}>
              <div className={listItemStyled}>
                <p className="w-1/2">
                  {item}
                  {' '}
                  (
                  {items[item].quantity}
                  )
                </p>
                <p className="w-1/2">
                  Discount:
                  {' '}
                  {items[item].discount}
                </p>
                <div className={buttonWrapper}>
                  <button
                    type="button"
                    className={buttonItem}
                    onClick={() => addToBasket(item, items[item])}
                  >
                    +

                  </button>
                  <button
                    type="button"
                    className={disabled ? disabledBtn : buttonItem}
                    onClick={() => subtractFromBasket(item, items[item])}
                    disabled={disabled}
                  >
                    -

                  </button>
                </div>
              </div>
            </li>
          );
        })}
        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2`}>
            <p>Total Discount:</p>
            <p>{totalDiscount}</p>
          </div>
        </li>
        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2 `}>
            <p>Total:</p>
            <p>
              £
              {total}
            </p>
          </div>
        </li>

      </ul>
    </div>
  );
}
