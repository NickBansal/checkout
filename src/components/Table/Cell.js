import React from 'react';
import { string, node } from 'prop-types';

export default function Cell({ children, className }) {
  return (
    <td className={className}>{children}</td>
  );
}

Cell.propTypes = {
  children: node,
  className: string,
};

Cell.defaultProps = {
  children: '',
  className: '',
};
