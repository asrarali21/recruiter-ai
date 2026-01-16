"use client"

import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from "react"
import { motion } from "framer-motion"

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string
    error?: string
    hint?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    size?: "sm" | "md" | "lg"
    variant?: "default" | "filled"
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            rightIcon,
            size = "md",
            variant = "default",
            className = "",
            id,
            required,
            ...props
        },
        ref
    ) => {
        const generatedId = useId()
        const inputId = id || generatedId

        const sizes = {
            sm: "py-2 text-sm",
            md: "py-3 text-base",
            lg: "py-4 text-lg",
        }

        const variants = {
            default: `
        bg-white/5 backdrop-blur-sm
        border-2 border-white/10
        hover:border-white/20
        focus:border-violet-500 focus:bg-white/10
        focus:shadow-lg focus:shadow-violet-500/20
      `,
            filled: `
        bg-white/10
        border-2 border-transparent
        hover:bg-white/15
        focus:border-violet-500 focus:bg-white/10
      `,
        }

        return (
            <div className="w-full">
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
                    >
                        {leftIcon && (
                            <span className="text-gray-400">{leftIcon}</span>
                        )}
                        {label}
                        {required && <span className="text-violet-400">*</span>}
                    </label>
                )}

                {/* Input Container */}
                <div className="relative group">
                    {/* Left Icon (inside input) */}
                    {leftIcon && !label && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    {/* Input Field */}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full rounded-xl
              text-white placeholder-gray-500
              transition-all duration-300 ease-out
              outline-none
              ${sizes[size]}
              ${variants[variant]}
              ${leftIcon && !label ? "pl-12" : "pl-4"}
              ${rightIcon ? "pr-12" : "pr-4"}
              ${error ? "border-red-500 focus:border-red-500" : ""}
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:scale-[1.01]
              ${className}
            `}
                        {...props}
                    />

                    {/* Right Icon */}
                    {rightIcon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            {rightIcon}
                        </div>
                    )}

                    {/* Focus Glow Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 rounded-xl bg-violet-500/10" />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {error}
                    </motion.p>
                )}

                {/* Hint Text */}
                {hint && !error && (
                    <p className="mt-2 text-sm text-gray-500">{hint}</p>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

// Textarea variant
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
    label?: string
    error?: string
    hint?: string
    leftIcon?: ReactNode
    size?: "sm" | "md" | "lg"
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            hint,
            leftIcon,
            size = "md",
            className = "",
            id,
            required,
            ...props
        },
        ref
    ) => {
        const generatedId = useId()
        const inputId = id || generatedId

        const sizes = {
            sm: "py-2 text-sm min-h-[80px]",
            md: "py-3 text-base min-h-[120px]",
            lg: "py-4 text-lg min-h-[160px]",
        }

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
                    >
                        {leftIcon && <span className="text-gray-400">{leftIcon}</span>}
                        {label}
                        {required && <span className="text-violet-400">*</span>}
                    </label>
                )}

                <textarea
                    ref={ref}
                    id={inputId}
                    className={`
            w-full px-4 rounded-xl
            bg-white/5 backdrop-blur-sm
            border-2 border-white/10
            text-white placeholder-gray-500
            transition-all duration-300 ease-out
            outline-none resize-y
            hover:border-white/20
            focus:border-violet-500 focus:bg-white/10
            focus:shadow-lg focus:shadow-violet-500/20
            focus:scale-[1.01]
            ${sizes[size]}
            ${error ? "border-red-500 focus:border-red-500" : ""}
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
                    {...props}
                />

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400"
                    >
                        {error}
                    </motion.p>
                )}

                {hint && !error && (
                    <p className="mt-2 text-sm text-gray-500">{hint}</p>
                )}
            </div>
        )
    }
)

Textarea.displayName = "Textarea"

// Select Component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    leftIcon?: ReactNode
    options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            leftIcon,
            options,
            className = "",
            id,
            required,
            ...props
        },
        ref
    ) => {
        const generatedId = useId()
        const inputId = id || generatedId

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2"
                    >
                        {leftIcon && <span className="text-gray-400">{leftIcon}</span>}
                        {label}
                        {required && <span className="text-violet-400">*</span>}
                    </label>
                )}

                <div className="relative group">
                    {leftIcon && !label && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300 pointer-events-none">
                            {leftIcon}
                        </div>
                    )}

                    <select
                        ref={ref}
                        id={inputId}
                        className={`
              w-full py-3 rounded-xl appearance-none cursor-pointer
              bg-white/5 backdrop-blur-sm
              border-2 border-white/10
              text-white
              transition-all duration-300 ease-out
              outline-none
              hover:border-white/20
              focus:border-violet-500 focus:bg-white/10
              focus:shadow-lg focus:shadow-violet-500/20
              ${leftIcon && !label ? "pl-12" : "pl-4"}
              pr-10
              ${error ? "border-red-500 focus:border-red-500" : ""}
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
                        {...props}
                    >
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="bg-gray-900 text-white"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        )
    }
)

Select.displayName = "Select"

export { Input, Textarea, Select }
export type { InputProps, TextareaProps, SelectProps }
