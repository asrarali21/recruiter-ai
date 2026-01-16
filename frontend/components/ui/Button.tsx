"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef, type ReactNode } from "react"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: "sm" | "md" | "lg"
    isLoading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    children: ReactNode
    fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            fullWidth = false,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-xl
      transition-all duration-300 ease-out
      outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      overflow-hidden
    `

        const variants = {
            primary: `
        bg-gradient-to-r from-violet-600 to-fuchsia-600
        text-white
        shadow-lg shadow-violet-500/30
        hover:shadow-xl hover:shadow-violet-500/40
        focus-visible:ring-violet-500
      `,
            secondary: `
        bg-white/5 backdrop-blur-sm
        border border-white/10
        text-white
        hover:bg-white/10 hover:border-white/20
        focus-visible:ring-white/30
      `,
            ghost: `
        bg-transparent
        text-gray-400
        hover:text-white hover:bg-white/5
        focus-visible:ring-white/20
      `,
            outline: `
        bg-transparent
        border-2 border-violet-500/50
        text-violet-400
        hover:bg-violet-500/10 hover:border-violet-500
        focus-visible:ring-violet-500
      `,
        }

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        }

        return (
            <motion.button
                ref={ref}
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
                disabled={disabled || isLoading}
                whileHover={!disabled && !isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                {...props}
            >
                {/* Shimmer effect for primary button */}
                {variant === "primary" && (
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100"
                        initial={false}
                        whileHover={{ opacity: 0.2 }}
                    >
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent" />
                    </motion.div>
                )}

                {/* Content */}
                <span className="relative flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <motion.svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </motion.svg>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                            {children}
                            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                        </>
                    )}
                </span>
            </motion.button>
        )
    }
)

Button.displayName = "Button"

export { Button }
export type { ButtonProps }
