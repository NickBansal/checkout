import React from 'react';
import {
  string, node, bool, func,
} from 'prop-types';

const buttonItem = 'mx-1 my-1 bg-orange-200 hover:bg-orange-600 transition-colors text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px]';
const disabledBtn = 'cursor-not-allowed bg-gray-200 mx-1 text-base md:text-xl px-0 md:px-2 rounded-md border border-solid w-[40px] text-white';

export default function Button({
  testId, children, disabled, handleClick, label, ...rest
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      aria-label={label}
      disabled={disabled}
      className={disabled ? disabledBtn : buttonItem}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  testId: string.isRequired,
  children: node.isRequired,
  disabled: bool.isRequired,
  handleClick: func.isRequired,
  label: string,
};

Button.defaultProps = {
  label: '',
};
