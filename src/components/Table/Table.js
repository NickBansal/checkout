import React from 'react';
import { string, node } from 'prop-types';

export default function Table({ children, className }) {
  return (
    <table className={className}>{children}</table>
  );
}

Table.propTypes = {
  children: node.isRequired,
  className: string,
};

Table.defaultProps = {
  className: '',
};
