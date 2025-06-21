import React from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils'; // Optional utility to merge classNames

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'block w-full rounded-md shadow-sm focus:ring focus:ring-blue-500 bg-neutral-800 text-white placeholder:text-neutral-500',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
