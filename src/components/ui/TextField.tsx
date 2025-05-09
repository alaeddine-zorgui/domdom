import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leadingIcon, 
    trailingIcon, 
    className, 
    ...props 
  }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leadingIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-md sm:text-sm border-gray-300 shadow-sm',
              'focus:ring-primary-500 focus:border-primary-500',
              error && 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500',
              leadingIcon && 'pl-10',
              trailingIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {trailingIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {trailingIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;