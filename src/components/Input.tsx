import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div className={` max-w-md w-full ${label && 'space-y-2'}`}>
      <label
        className="block text-lg font-semibold text-[#11103E]"
        htmlFor={props.name}
      >
        {label}
      </label>
      <input
        id={props.name}
        className="py-3 px-4 focus:outline-none text-lg w-full rounded-3xl shadow-md text-[#11103E]"
        {...props}
      />
    </div>
  );
}
