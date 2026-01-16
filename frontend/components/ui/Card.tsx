"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { forwardRef, type ReactNode } from "react"

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: "default" | "glass" | "elevated" | "gradient"
    padding?: "none" | "sm" | "md" | "lg"
    hover?: boolean
    glow?: boolean
    children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = "default",
            padding = "md",
            hover = true,
            glow = false,
            children,
            className = "",
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      relative rounded-2xl overflow-hidden
      transition-all duration-300 ease-out
    `

        const variants = {
            default: `
        bg-white/[0.03] backdrop-blur-xl
        border border-white/10
      `,
            glass: `
        bg-white/[0.05] backdrop-blur-2xl
        border border-white/15
      `,
            elevated: `
        bg-[#12121a]
        border border-white/10
        shadow-xl shadow-black/20
      `,
            gradient: `
        bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10
        border border-white/10
      `,
        }

        const paddings = {
            none: "",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
        }

        const hoverStyles = hover
            ? `
        hover:bg-white/[0.06]
        hover:border-white/20
        hover:shadow-2xl hover:shadow-violet-500/5
      `
            : ""

        const glowStyles = glow
            ? "shadow-lg shadow-violet-500/20"
            : ""

        return (
            <motion.div
                ref={ref}
                className={`
          ${baseStyles}
          ${variants[variant]}
          ${paddings[padding]}
          ${hoverStyles}
          ${glowStyles}
          ${className}
        `}
                whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
                {...props}
            >
                {/* Optional gradient overlay */}
                {variant === "gradient" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />
                )}

                {/* Content */}
                <div className="relative z-10">{children}</div>
            </motion.div>
        )
    }
)

Card.displayName = "Card"

// Card Header Component
const CardHeader = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => (
    <div className={`mb-4 ${className}`}>{children}</div>
)

// Card Title Component
const CardTitle = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => (
    <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>
)

// Card Description Component
const CardDescription = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => (
    <p className={`text-gray-400 mt-1 ${className}`}>{children}</p>
)

// Card Content Component
const CardContent = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => <div className={className}>{children}</div>

// Card Footer Component
const CardFooter = ({
    children,
    className = "",
}: {
    children: ReactNode
    className?: string
}) => (
    <div className={`mt-6 pt-4 border-t border-white/10 ${className}`}>
        {children}
    </div>
)

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
}
export type { CardProps }
