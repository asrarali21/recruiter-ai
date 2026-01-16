"use client"

import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
    variant?: "default" | "subtle" | "intense"
    showDots?: boolean
    showGrid?: boolean
    className?: string
}

export function AnimatedBackground({
    variant = "default",
    showDots = true,
    showGrid = false,
    className = "",
}: AnimatedBackgroundProps) {
    const orbConfigs = {
        default: [
            {
                position: "-top-[40%] -left-[20%]",
                size: "w-[80%] h-[80%]",
                gradient: "from-violet-600/20 to-fuchsia-600/20",
                blur: "blur-[120px]",
                delay: 0,
            },
            {
                position: "-bottom-[40%] -right-[20%]",
                size: "w-[80%] h-[80%]",
                gradient: "from-cyan-600/20 to-blue-600/20",
                blur: "blur-[120px]",
                delay: 1,
            },
            {
                position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                size: "w-[60%] h-[60%]",
                gradient: "from-purple-600/10 to-pink-600/10",
                blur: "blur-[100px]",
                delay: 2,
            },
        ],
        subtle: [
            {
                position: "-top-[30%] -left-[15%]",
                size: "w-[60%] h-[60%]",
                gradient: "from-violet-600/10 to-fuchsia-600/10",
                blur: "blur-[100px]",
                delay: 0,
            },
            {
                position: "-bottom-[30%] -right-[15%]",
                size: "w-[60%] h-[60%]",
                gradient: "from-cyan-600/10 to-blue-600/10",
                blur: "blur-[100px]",
                delay: 1.5,
            },
        ],
        intense: [
            {
                position: "-top-[50%] -left-[25%]",
                size: "w-[100%] h-[100%]",
                gradient: "from-violet-600/30 to-fuchsia-600/30",
                blur: "blur-[150px]",
                delay: 0,
            },
            {
                position: "-bottom-[50%] -right-[25%]",
                size: "w-[100%] h-[100%]",
                gradient: "from-cyan-600/25 to-blue-600/25",
                blur: "blur-[150px]",
                delay: 0.5,
            },
            {
                position: "top-1/4 right-1/4",
                size: "w-[50%] h-[50%]",
                gradient: "from-purple-600/20 to-pink-600/20",
                blur: "blur-[120px]",
                delay: 1,
            },
            {
                position: "bottom-1/4 left-1/4",
                size: "w-[40%] h-[40%]",
                gradient: "from-emerald-600/15 to-teal-600/15",
                blur: "blur-[100px]",
                delay: 1.5,
            },
        ],
    }

    const orbs = orbConfigs[variant]

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Animated Gradient Orbs */}
            {orbs.map((orb, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${orb.position} ${orb.size} rounded-full bg-gradient-to-r ${orb.gradient} ${orb.blur}`}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: orb.delay,
                    }}
                />
            ))}

            {/* Dot Pattern Overlay */}
            {showDots && (
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                        backgroundSize: "40px 40px",
                    }}
                />
            )}

            {/* Grid Pattern Overlay */}
            {showGrid && (
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                    }}
                />
            )}
        </div>
    )
}

// Floating Particles Component
export function FloatingParticles({
    count = 20,
    className = "",
}: {
    count?: number
    className?: string
}) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    }))

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-white/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay,
                    }}
                />
            ))}
        </div>
    )
}

// Gradient Mesh Background
export function GradientMesh({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <svg
                className="absolute w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <radialGradient id="mesh1" cx="30%" cy="30%" r="50%">
                        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.15)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <radialGradient id="mesh2" cx="70%" cy="70%" r="50%">
                        <stop offset="0%" stopColor="rgba(34, 211, 238, 0.1)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <radialGradient id="mesh3" cx="80%" cy="20%" r="40%">
                        <stop offset="0%" stopColor="rgba(217, 70, 239, 0.1)" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#mesh1)" />
                <rect width="100%" height="100%" fill="url(#mesh2)" />
                <rect width="100%" height="100%" fill="url(#mesh3)" />
            </svg>
        </div>
    )
}
