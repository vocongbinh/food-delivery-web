"use client"
import { Field } from "formik";
import React, { InputHTMLAttributes, useState } from "react";
import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  colorClass?: string;
  rounded?: string;
  isFormik?: boolean;
  showEye?: boolean;
  validate?: boolean;
  label?: string;
}


// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      colorClass = "bg-white",
      rounded = "rounded-full",
      isFormik = false,
      showEye = false,
      validate,
      children,
      label,
      type = "text",
      ...args
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const Component = isFormik ? Field : "input";

    return (
      <div>
        {label && <h2 className="text-sm font-semibold mb-4">{label}</h2>}
        <div className="relative">
          <Component
            ref={ref}
            type={type == "password" ? showPassword ? "text" : "password" : type}
            className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200/50 dark:border-neutral-500 dark:focus:ring-primary-500/30 dark:bg-neutral-900 ${rounded} ${colorClass} ${fontClass} ${sizeClass} ${className}`}
            {...args}
          />
          {showEye && <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>}
          {validate && <div className={`absolute inset-y-0 right-0 items-center pr-3 ${validate ? "flex" : "hidden"}`}>
            <CheckCircleIcon className={`text-green-500 w-5 h-5`} />
          </div>
          }
        </div>
      </div>

    );
  }
);

export default Input;
