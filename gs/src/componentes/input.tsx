import type { InputHTMLAttributes, ChangeEvent, ReactNode } from "react";
import { useCallback, useState, useMemo } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  customError?: string | null;
}

const Input = ({
  handleChange,
  disabled,
  readOnly,
  className = "",
  label = "",
  customError = "",
  ...props
}: InputProps) => {
  const [error, setError] = useState<string | null>(null);

  const onHandleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { validity, validationMessage, value } = e.target;
      setError(!validity.valid ? validationMessage : null);
      if (handleChange instanceof Function) handleChange(value, e);
    },
    [handleChange]
  );

  const errorMessage = useMemo(() => customError || error, [customError, error]);
  const hasActionsState = useMemo(() => disabled || readOnly, [disabled, readOnly]);
  const hasControllState = useMemo(() => hasActionsState || errorMessage, [hasActionsState, errorMessage]);
  const canShowError = useMemo(() => errorMessage && !hasActionsState, [errorMessage, hasActionsState]);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id ?? props.name ?? ""}
          className="block font-medium mb-0.5 px-0.5 text-left text-neutral-900 text-sm"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        onChange={onHandleChange}
        className={`
          w-full block p-2 border rounded
          text-black focus:outline-none focus:ring-1 ring-current border-neutral-900
          ${!hasControllState ? "bg-white border-neutral-900" : ""}
          ${disabled ? "bg-gray-300 border-gray-300 cursor-not-allowed" : ""}
          ${readOnly ? "bg-gray-100 border-gray-100" : ""}
          ${canShowError ? "border-red-500 border-2 ring-red-500" : ""}
          ${className}
        `}
        style={{
          color: "black",
          background: "white",
          ...props.style,
        }}
        disabled={disabled}
        readOnly={readOnly}
      />

      <span
        className={`
        min-h-4 text-red-500 text-xs px-0.5 pt-0.5 block leading-none 
        ${canShowError ? "opacity-100" : "opacity-0"}
      `}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default Input;