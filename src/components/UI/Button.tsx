import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: string;
}

const Button : FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button {...props}>
      { props.icon ? props.icon : null }
      { props.label ? props.label : null }
    </button>
  );
};

export default Button;