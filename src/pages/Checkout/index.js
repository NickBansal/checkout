import React from 'react';

const listItem = 'border-dotted border-2 p-4 text-2xl flex justify-between border-black items-center';
const buttonWrapper = 'border-dotted border-black border-l-2 pl-4';
const buttonItem = 'mx-2 bg-orange-200 hover:bg-orange-600 transition-colors text-3xl py-1 px-4 rounded-md border border-solid';

export default function Checkout() {
  return (
    <div className="my-8 mx-auto w-1/2">
      <ul>
        <li>
          <div className={listItem}>
            First Item
            <div className={buttonWrapper}>
              <button type="button" className={buttonItem}>+</button>
              <button type="button" className={buttonItem}>-</button>
            </div>
          </div>
        </li>
        <li>
          <div className={`${listItem} border-t-0`}>
            Second Item
            <div className={buttonWrapper}>
              <button type="button" className={buttonItem}>+</button>
              <button type="button" className={buttonItem}>-</button>
            </div>
          </div>
        </li>
        <li>
          <div className={`${listItem} border-t-0`}>
            <p>Total</p>
            <p>£0.00</p>
          </div>
        </li>
        <li>
          <div className={`${listItem} border-t-0`}>
            <p>Discount</p>
            <p>0</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
