import React, { ChangeEvent, FocusEvent } from "react";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  setFormError: (error: string | null) => void;
  setSuccessMss?: (message: string | null) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  placeholder,
  setFormError,
  setSuccessMss,
  handleChange,
  handleBlur,
  className = "",
}) => (
  <div className={`input-box h-auto md:h-[80px] ${className}`}>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFormError(null);
          if (setSuccessMss) setSuccessMss(null);
          handleChange(e);
        }}
        onBlur={handleBlur}
        aria-required="true"
        className="block w-full rounded-md border-0 py-1.5 px-3 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset bg-[#fdfdfdab] ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-focusColor"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  </div>
);

export default FormInput;