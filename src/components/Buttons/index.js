import React from 'react';
import {
  string, node, bool, func,
} from 'prop-types';

const buttonItem = 'w-[40px] mr-1 my-1 bg-orange-200 hover:bg-orange-600 transition-colors text-xl rounded-md border border-solid';
const disabledBtn = 'w-[40px] cursor-not-allowed bg-gray-200 mr-1 text-xl rounded-md border border-solid text-white';

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
