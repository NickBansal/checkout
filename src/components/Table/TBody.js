import React from 'react';
import { string, node } from 'prop-types';

export default function TBody({ children, className }) {
  return (
    <tbody className={className}>{children}</tbody>
  );
}

TBody.propTypes = {
  children: node.isRequired,
  className: string,
};

TBody.defaultProps = {
  className: '',
};
