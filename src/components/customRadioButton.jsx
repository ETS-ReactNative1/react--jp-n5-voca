import React from 'react';
import _ from 'lodash';

const CustomRadioButton = ({
  label,
  value,
  range = [],
  selected = false,
  description,
  onClick,
}) => {
  let isSelected = false;
  isSelected = range.length > 0 ? _.includes(range, value) : value == selected;

  return (
    <div
      onClick={() => onClick(value)}
      className={`py-2 px-2 inline-block bg-white cursor-pointer rounded-lg font-medium border-4 border-white-300 ${
        isSelected && 'border-purple-400 text-purple-700'
      }`}>
      <span>{label}</span>
      <small className="text-purple-500 text-xs">{description}</small>
    </div>
  );
};

export default CustomRadioButton;
