"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground, FloatingParticles } from "@/components/ui/AnimatedBackground"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

// Icons
const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const LightningIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const BrainIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// Features data
const features = [
  {
    icon: <SparklesIcon />,
    title: "AI Job Descriptions",
    description: "Generate compelling, professional job descriptions in seconds with AI that understands your needs.",
  },
  {
    icon: <DocumentIcon />,
    title: "Smart Resume Parsing",
    description: "Automatically extract skills, experience, and qualifications from any resume format.",
  },
  {
    icon: <ChartIcon />,
    title: "Intelligent Matching",
    description: "Match candidates to jobs with explainable AI scoring that you can trust and verify.",
  },
  {
    icon: <BrainIcon />,
    title: "Explainable Insights",
    description: "Understand why candidates match with clear strengths, gaps, and confidence scores.",
  },
  {
    icon: <ShieldIcon />,
    title: "Human-in-the-Loop",
    description: "AI assists, humans decide. Every shortlist action is explicit and auditable.",
  },
  {
    icon: <LightningIcon />,
    title: "10x Faster Hiring",
    description: "Reduce time-to-hire dramatically while maintaining quality and compliance.",
  },
]

// How it works steps
const steps = [
  {
    number: "01",
    title: "Create Job",
    description: "Define requirements and let AI generate a polished job description for approval.",
    icon: <BriefcaseIcon />,
  },
  {
    number: "02",
    title: "Collect Applications",
    description: "Candidates apply via your job link. Resumes are parsed and analyzed automatically.",
    icon: <UsersIcon />,
  },
  {
    number: "03",
    title: "Smart Matching",
    description: "AI scores and ranks candidates with explainable insights for each match.",
    icon: <ChartIcon />,
  },
  {
    number: "04",
    title: "Human Decision",
    description: "Review ranked candidates, understand the AI's reasoning, and shortlist with confidence.",
    icon: <CheckIcon />,
  },
]

// Stats
const stats = [
  { value: "70%", label: "Faster Screening" },
  { value: "10x", label: "More Efficient" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "24/7", label: "AI Availability" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground variant="intense" showDots showGrid />
        <FloatingParticles count={30} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-sm text-violet-300 font-medium">AI-Powered Recruiting Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Hire Smarter with</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Recruiting
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Automate resume screening, generate job descriptions, and match candidates intelligently —
              while keeping humans in control of every decision.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 "
            >
              <Link href="/job_creation">
                <Button
                  variant="primary"
                  size="lg"
                  className="cursor-pointer"
                  rightIcon={<ArrowRightIcon />}
                >
                  I&apos;m Hiring
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  variant="secondary"
                  className="cursor-pointer"
                  size="lg"
                >
                  I&apos;m Looking for Jobs
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500"
            >
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-sm">Free to get started</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon />
                <span className="text-sm">Built for teams of all sizes</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-2 bg-white/40 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/10 bg-[#0f0f17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedBackground variant="subtle" showDots={false} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-4 block"
            >
              How It Works
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Streamlined Hiring in 4 Steps
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              From job creation to final decision, our AI guides you through every step
              while keeping you in complete control.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-60px)] h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
                )}

                <Card variant="glass" padding="lg" className="relative h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-500/30">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-[#0f0f17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-4 block"
            >
              Features
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              Everything You Need to Hire Better
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Powerful AI capabilities designed with real hiring workflows in mind.
              Built for reliability and scale.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card variant="default" padding="lg" className="h-full group">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Recruiters & Candidates Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedBackground variant="default" showDots />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Recruiters */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="gradient" padding="lg">
                <div className="p-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6">
                    <BriefcaseIcon />
                    For Recruiters
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Hire 10x Faster Without Sacrificing Quality
                  </h3>

                  <p className="text-gray-400 mb-8">
                    Let AI handle the repetitive tasks so you can focus on what matters —
                    connecting with the right candidates and making great hires.
                  </p>

                  <ul className="space-y-4 mb-8">
                    {[
                      "AI-generated job descriptions in seconds",
                      "Automatic resume screening and ranking",
                      "Explainable match scores for every candidate",
                      "Full control over final decisions",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center mt-0.5">
                          <CheckIcon />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/job_creation">
                    <Button variant="primary" rightIcon={<ArrowRightIcon />}>
                      Start Hiring
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* For Candidates */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="gradient" padding="lg">
                <div className="p-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-6">
                    <UsersIcon />
                    For Candidates
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Find Roles That Actually Match Your Skills
                  </h3>

                  <p className="text-gray-400 mb-8">
                    No more guessing if you&apos;re qualified. Our AI matches you with positions
                    where your skills and experience truly shine.
                  </p>

                  <ul className="space-y-4 mb-8">
                    {[
                      "Browse curated job openings",
                      "Simple and fast application process",
                      "Your resume is analyzed, not lost",
                      "Fair evaluation based on your actual skills",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                          <CheckIcon />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/careers">
                    <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-16 border-y border-white/10 bg-[#0f0f17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">
              Built with Modern Technology
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {["LangChain", "LangGraph", "FastAPI", "PostgreSQL", "Gemini AI", "Next.js"].map(
                (tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm font-medium hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedBackground variant="intense" showDots={false} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join modern teams using AI to hire smarter, faster, and fairer.
              Get started in minutes — no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/job_creation">
                <Button variant="primary" size="lg" rightIcon={<ArrowRightIcon />}>
                  Start Hiring for Free
                </Button>
              </Link>
              <Link href="/careers">
                <Button variant="ghost" size="lg">
                  Or Browse Open Jobs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
