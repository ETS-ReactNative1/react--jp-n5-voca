import React from 'react';

const CustomRadioButton = ({
  label,
  value,
  selected,
  description,
  onClick,
}) => {
  const isSelected = value == selected;

  return (
    <div
      onClick={() => onClick(value)}
      className={`py-2 px-2 inline-block bg-white cursor-pointer rounded-lg font-medium border-4 border-white-300 ${
        isSelected && 'border-purple-300'
      }`}>
      <span>{label}</span>
      <small className="text-purple-500 text-xs">{description}</small>
    </div>
  );
};

export default CustomRadioButton;
