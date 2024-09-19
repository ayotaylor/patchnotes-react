import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <button onClick={onPress}>{title}</button>
  );
};