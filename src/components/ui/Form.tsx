import React, { useEffect, useRef, useState } from 'react';
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
          'focus:outline-none focus:ring-1 focus:ring-secondary-900 focus:border-secondary-900',
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
          'block w-full rounded-md border border-secondary-300 bg-white bg-secondary-100 py-2 px-3 shadow-sm',
          'focus:outline-none focus:ring-1 focus:ring-secondary-900 focus:border-secondary-900',
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
          'focus:outline-none focus:ring-1 focus:ring-secondary-900 focus:border-secondary-900',
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
          'h-4 w-4 text-secondary-900',
          'accent-secondary-900',
          'focus:ring-secondary-400 focus:ring-offset-0'
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

/**
 * SearchSelect component for searching and selecting items from an array of objects
 * 
 * @param {Object[]} items - Array of items to search through
 * @param {string} items[].title - The title of the item used for searching
 * @param {string} items[].tier - The tier of the item
 * @param {string} items[].noc - The NOC code of the item
 * @param {Object} value - The currently selected item
 * @param {function} onChange - Function to call when selection changes
 * @param {string} label - Label text for the form element
 * @param {string} placeholder - Placeholder text for the search input
 * @param {boolean} required - Whether the field is required
 * @param {boolean} error - Whether the field has an error
 * @param {string} errorMessage - Error message to display
 * @param {string} helperText - Helper text to display
 * @param {string} className - Additional CSS classes for the component
 */



/**
 * SearchSelect component for searching and selecting items from an array of objects
 * 
 * @param {Object[]} items - Array of items to search through
 * @param {string} items[].title - The title of the item used for searching
 * @param {string} items[].tier - The tier of the item
 * @param {string} items[].noc - The NOC code of the item
 * @param {Object} value - The currently selected item
 * @param {function} onChange - Function to call when selection changes
 * @param {string} label - Label text for the form element
 * @param {string} placeholder - Placeholder text for the search input
 * @param {boolean} required - Whether the field is required
 * @param {boolean} error - Whether the field has an error
 * @param {string} errorMessage - Error message to display
 * @param {string} helperText - Helper text to display
 * @param {string} className - Additional CSS classes for the component
 */

interface SearchSelectProps {
  items: { title: string; teer: string; noc: string }[];
  value: { title: string; teer: string; noc: string } | null;
  onChange: (item: { title: string; teer: string; noc: string } | null) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  className?: string;
  name: string;
}

export function SearchSelect({
  items = [],
  value = null,
  onChange,
  label,
  placeholder = "Search...",
  required = false,
  error = false,
  errorMessage,
  helperText,
  className,
  name
}: SearchSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef(null);

  // Filter items when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // setIsOpen(false);
      // }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle item selection
  const handleSelectItem = (item: { title: string; teer: string; noc: string }) => {
    onChange(item);
    setIsOpen(false);
    setSearchTerm('');
  };

  // Handle input focus
  const handleFocus = () => {
    setIsOpen(true);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);

    // If search field is cleared, reset the selection
    if (e.target.value === '' && value) {
      onChange(null);
    }
  };

  return (
    <FormGroup className={className}>
      {label && (
        <FormLabel required={required}>{label}</FormLabel>
      )}
      <FormControl>
        <div className="relative" ref={dropdownRef}>
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              autoComplete="off"
              className={cn(
                'block w-full rounded-md border border-secondary-300 bg-white py-2 px-3 shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                'placeholder:text-secondary-400 sm:text-sm',
                error && 'border-red-300 focus:ring-red-500 focus:border-red-500'
              )}
              placeholder={placeholder}
              value={isOpen ? searchTerm : (value ? value.title : '')}
              onChange={handleSearchChange}
              onFocus={handleFocus}
              name={name}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-secondary-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setIsOpen(!isOpen)}
              >
                <path
                  fillRule="evenodd"
                  d={isOpen
                    ? "M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                    : "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  }
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Dropdown list */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-secondary-200">
              <ul className="py-1 text-sm">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 hover:bg-primary-100 cursor-pointer flex flex-col"
                      onClick={() => handleSelectItem(item)}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className="text-xs text-secondary-500">
                        Teer: {item.teer} | NOC: {item.noc}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-secondary-500">No items found</li>
                )}
              </ul>
            </div>
          )}

          {/* Hidden input to store the full value for form submission */}
          {value && (
            <input
              type="hidden"
              name={`${name}_full`}
              value={JSON.stringify(value)}
            />
          )}
        </div>
      </FormControl>

      {helperText && !error && (
        <FormHelperText>{helperText}</FormHelperText>
      )}

      {error && errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormGroup>
  );
}