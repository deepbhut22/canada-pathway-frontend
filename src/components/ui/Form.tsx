import React from 'react';
import { cn } from '../../utils/helpers';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  children: React.ReactNode;
}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
}

interface FormSectionProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, className, children }: FormSectionProps) {
  return (
    <div className={cn('mb-8', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-secondary-900 mb-1">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-secondary-600 mb-4">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface FormGroupProps {
  className?: string;
  children: React.ReactNode;
}

export function FormGroup({ className, children }: FormGroupProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  required?: boolean;
}

export function FormLabel({ className, children, required, ...props }: FormLabelProps) {
  return (
    <label className={cn('text-sm font-medium text-secondary-900', className)} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

interface FormControlProps {
  className?: string;
  children: React.ReactNode;
}

export function FormControl({ className, children }: FormControlProps) {
  return <div className={cn('mt-1', className)}>{children}</div>;
}

interface FormHelperTextProps {
  className?: string;
  children: React.ReactNode;
}

export function FormHelperText({ className, children }: FormHelperTextProps) {
  return (
    <p className={cn('mt-1 text-xs text-secondary-500', className)}>{children}</p>
  );
}

interface FormErrorMessageProps {
  className?: string;
  children: React.ReactNode;
}

export function FormErrorMessage({ className, children }: FormErrorMessageProps) {
  return (
    <p className={cn('mt-1 text-xs text-red-600', className)}>{children}</p>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-secondary-300 bg-white py-2 px-3 shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'placeholder:text-secondary-400 sm:text-sm',
          error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  error?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-secondary-300 bg-white py-2 px-3 shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'placeholder:text-secondary-400 sm:text-sm',
          error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-secondary-300 bg-white py-2 px-3 shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'placeholder:text-secondary-400 sm:text-sm',
          error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('flex items-center', className)}>
      <input
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border-secondary-300 text-primary-600',
          'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0'
        )}
        {...props}
      />
      {label && <span className="ml-2 text-sm text-secondary-700">{label}</span>}
    </label>
  );
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Radio({ label, className, ...props }: RadioProps) {
  return (
    <label className={cn('flex items-center', className)}>
      <input
        type="radio"
        className={cn(
          'h-4 w-4 border-secondary-300 text-primary-600',
          'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0'
        )}
        {...props}
      />
      {label && <span className="ml-2 text-sm text-secondary-700">{label}</span>}
    </label>
  );
}

interface RadioGroupProps {
  options: { value: string; label: string }[];
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export function RadioGroup({ 
  options, 
  name, 
  value, 
  onChange, 
  className,
  direction = 'vertical'
}: RadioGroupProps) {
  return (
    <div className={cn(
      direction === 'horizontal' ? 'flex space-x-4' : 'space-y-2',
      className
    )}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  );
}