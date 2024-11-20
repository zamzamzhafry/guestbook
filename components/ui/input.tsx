import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    Error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    className={cn(
                        'flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className,
                        {
                            'border-red-600 text-black focus-visible:ring-red-600':
                                !!Error, // Highlight if error
                            'border-gray-300': !Error,
                        }
                    )}
                    ref={ref}
                    {...props}
                />
                {Error && (
                    <span className="text-sm text-red-600 mt-1">{Error}</span>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
