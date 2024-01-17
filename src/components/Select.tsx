import { SelectHTMLAttributes } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<string>;
}

export default function Select({ label, options, ...props }: Props) {
  return (
    <div className={` max-w-md w-full ${label && 'space-y-2'}`}>
      <label
        className="block text-lg font-semibold"
        htmlFor={props.name}
      >
        {label}
      </label>

      <div className="relative">
        <select
          className="py-3 px-4 focus:outline-none appearance-none text-lg w-full rounded-3xl shadow-md text-[#11103E]"
          id={props.name}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <div
          className={`pointer-events-none absolute right-0 z-40 flex items-center px-2 text-neutral-500 inset-y-0`}
        >
          <MdKeyboardArrowDown size={32} />
        </div>
      </div>
    </div>
  );
}
