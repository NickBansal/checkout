import React from 'react';
import { string, node } from 'prop-types';

export default function THead({ children, className }) {
  return (
    <thead className={`font-bold border-b-2 border-black border-dashed ${className}`}>{children}</thead>
  );
}

THead.propTypes = {
  children: node.isRequired,
  className: string,
};

THead.defaultProps = {
  className: '',
};
