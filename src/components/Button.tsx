import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  buttonType?: 'primary' | 'secondary';
}

export default function Button({ buttonType = 'primary', children, ...props }: Props) {
  return (
    <button
      className={`flex items-center justify-center px-2 py-3 outline-none w-full rounded-3xl shadow-md transition-color duration-200 disabled:pointer-events-none disabled:bg-gray-300  ${
        buttonType === 'primary'
          ? 'bg-[#007aff] text-white hover:bg-transparent hover:text-[#007aff] border-transparent border hover:border-[#007aff]'
          : 'bg-transparent text-[#007aff] border-2 border-[#007aff] hover:bg-[#007aff] hover:text-white'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
