/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import itemPrices from './itemPrices';

const listItem = 'border-dotted border-2 p-4 text-base flex justify-between border-black items-center border-t-0';
const buttonWrapper = 'border-dotted border-black border-l-2 pl-4 w-1/3 md:w-1/4 text-center';
const buttonItem = 'mx-1 my-1 bg-orange-200 hover:bg-orange-600 transition-colors text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px]';
const disabledBtn = 'cursor-not-allowed bg-gray-200 mx-1 text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px] text-white';

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

  const addItemDiscounts = (item, previous, quantity) => {
    if (item === 'Face Masks' && quantity % 2 === 0) {
      setTotalDiscount(totalDiscount + 1);
      return previous + 1;
    }
    if (item === 'Toilet Paper' && quantity % 6 === 0) {
      setTotalDiscount(totalDiscount + 0.65);
      return previous + 0.65;
    }
    return previous;
  };

  const subtractItemDiscounts = (item, previous, quantity) => {
    const lowerAmount = quantity < items[item].quantity;
    if (item === 'Face Masks' && lowerAmount && (quantity - 1) % 2 === 0) {
      setTotalDiscount(totalDiscount - 1);
      return previous - 1;
    }
    if (item === 'Toilet Paper' && lowerAmount && (quantity + 1) % 6 === 0) {
      setTotalDiscount(totalDiscount - 0.65);
      return previous - 0.65;
    }
    return previous;
  };

  const addToBasket = (item, values) => {
    setItems((prevState) => {
      const quantity = prevState[item].quantity + 1;
      return ({
        ...prevState,
        [item]: {
          ...values,
          quantity,
          discount: addItemDiscounts(item, prevState[item].discount, quantity),
        },
      });
    });
    setTotal((Number(total) + Number(itemPrices[item])).toFixed(2));
  };

  const subtractFromBasket = (item, values) => {
    setItems((prevState) => {
      const quantity = prevState[item].quantity - 1;
      return ({
        ...prevState,
        [item]: {
          ...values,
          quantity,
          discount: subtractItemDiscounts(item, prevState[item].discount, quantity),
        },
      });
    });
    setTotal((Number(total) - Number(itemPrices[item])).toFixed(2));
  };

  if (items === undefined) {
    return null;
  }

  const totalIsDiscounted = Boolean(totalDiscount);

  return (
    <div className="mx-0 my-12 md:mx-auto w-full lg:w-4/5">
      <ul>
        <li className="flex w-4/5">
          <p className="w-1/3 ml-4 text-xl font-bold">Item</p>
          <p className="w-1/3 text-xl font-bold -ml-4 md:-ml-2">Amount</p>
          <p className="w-1/3 text-xl font-bold -ml-4">Discount</p>
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
                  <button
                    type="button"
                    data-testid={`addBtn${index}`}
                    className={buttonItem}
                    onClick={() => addToBasket(item, items[item])}
                  >
                    +

                  </button>
                  <button
                    type="button"
                    data-testid={`minusBtn${index}`}
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
