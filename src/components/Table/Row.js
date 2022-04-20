import React from 'react';
import { string, node } from 'prop-types';

export default function Row({ children, className }) {
  return (
    <tr className={className}>{children}</tr>
  );
}

Row.propTypes = {
  children: node.isRequired,
  className: string,
};

Row.defaultProps = {
  className: '',
};
