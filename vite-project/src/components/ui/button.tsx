import React from 'react';
import { cn } from '../../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded shadow transition-colors';
  const variantStyle =
    variant === 'primary'
      ? 'bg-blue-600 hover:bg-blue-700 text-white'
      : 'bg-neutral-700 hover:bg-neutral-600 text-white';

  return <button className={cn(baseStyle, variantStyle, className)} {...props} />;
};
