/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const listItem = 'border-dotted border-2 p-4 text-lg flex justify-between border-black items-center border-t-0';
const buttonWrapper = 'border-dotted border-black border-l-2 pl-4 w-1/5 md:w-1/4 text-center';
const buttonItem = 'mx-1 bg-orange-200 hover:bg-orange-600 transition-colors text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px]';

export default function Checkout() {
  const [items, setItems] = useState({
    'Face Masks': 0,
    'Toilet Paper': 0,
  });
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const addToBasket = (values, item) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: values[item] + 1,
    }));
  };

  const subtractFromBasket = (values, item) => {
    setItems((prevState) => ({
      ...prevState,
      [item]: values[item] - 1,
    }));
  };

  return (
    <div className="mx-0 my-8 md:mx-auto w-full lg:w-1/2">
      <ul>
        {Object.keys(items).map((item, index) => {
          const listItemStyled = index === 1 ? listItem : `${listItem} border-t-2`;
          return (
            <li key={item}>
              <div className={listItemStyled}>
                <p>
                  {item}
                  {' '}
                  (
                  {items[item]}
                  )
                </p>
                <p>
                  Discount:
                  {' '}
                  {items[item]}
                </p>
                <div className={buttonWrapper}>
                  <button
                    type="button"
                    className={buttonItem}
                    onClick={() => addToBasket(items, item)}
                  >
                    +

                  </button>
                  <button
                    type="button"
                    className={buttonItem}
                    onClick={() => subtractFromBasket(items, item)}
                    disabled={items[item] === 0}
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
            <p>Total Discount</p>
            <p>{discount}</p>
          </div>
        </li>
        <li className="flex justify-end">
          <div className={`${listItem} border-x-0 w-1/2 `}>
            <p>Total</p>
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
