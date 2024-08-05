import React from 'react';

type ButtonProps = {
  children: React.ReactNode | string;
  styles: string;
  link: string;
};

const Button = ({ children, styles, link }: ButtonProps) => {
  return (
    <button
      className={`text-nowrap font-normal border border-gray-300 px-6 py-2 rounded-md ${styles} cursor-pointer `}
    >
      <a href={link}>{children}</a>
    </button>
  );
};

export default Button;
