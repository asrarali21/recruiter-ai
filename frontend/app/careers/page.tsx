"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import axios from "axios"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface Job {
  id: number
  title: string
  status: string
  description: string
  created_at: string
}

const fetchJobs = async (): Promise<Job[]> => {
  const response = await axios.get("http://localhost:8000/jobs/get_jobs")
  return response.data
}

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
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

// Skeleton loader component
function JobCardSkeleton() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-7 w-48 bg-white/10 rounded-lg mb-3" />
          <div className="h-5 w-32 bg-white/10 rounded-lg" />
        </div>
        <div className="h-8 w-24 bg-white/10 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="h-5 w-24 bg-white/10 rounded-full" />
        <div className="h-5 w-24 bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

export default function CareersPage() {
  const router = useRouter()

  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ["careers-jobs"],
    queryFn: fetchJobs
  })

  const handleApply = (jobId: number) => {
    router.push(`/careers/${jobId}/apply`)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedBackground variant="default" showDots />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Icon */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-8 shadow-lg shadow-violet-500/30"
            >
              <BriefcaseIcon />
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Join Our{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Growing Team
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Explore exciting career opportunities and be part of something amazing.
              We&apos;re building the future of AI-powered recruiting.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
            >
              {[
                { icon: <CheckCircleIcon />, text: "Remote Friendly" },
                { icon: <CheckCircleIcon />, text: "Competitive Salary" },
                { icon: <CheckCircleIcon />, text: "Great Benefits" },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <span className="text-violet-400">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-10 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">
                  {jobs?.length || 0}
                </div>
                <div className="text-gray-400 text-sm">Open Positions</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                  5+
                </div>
                <div className="text-gray-400 text-sm">Departments</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-1">
                  100+
                </div>
                <div className="text-gray-400 text-sm">Team Members</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Open Positions {jobs && `(${jobs.length})`}
            </h2>

            {/* Search Bar (placeholder for future functionality) */}
            <div className="relative max-w-sm w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search positions..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none transition-all duration-300"
              />
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-1">Error Loading Jobs</h3>
                <p className="text-red-400/80 text-sm">{error?.message || "Something went wrong. Please try again."}</p>
              </div>
            </motion.div>
          )}

          {/* Jobs List */}
          {jobs && jobs.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <Card variant="default" padding="none" className="group overflow-hidden">
                    <div className="p-6 md:p-8">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">
                              {job.title}
                            </h3>
                            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                              {job.status}
                            </span>
                          </div>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <LocationIcon />
                              <span>Remote / Hybrid</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <ClockIcon />
                              <span>Full-time</span>
                            </div>
                            {job.created_at && (
                              <div className="flex items-center gap-1.5">
                                <ClockIcon />
                                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Apply Button - Desktop */}
                        <div className="hidden md:block">
                          <Button
                            variant="primary"
                            rightIcon={<ArrowRightIcon />}
                            onClick={() => handleApply(job.id)}
                          >
                            Apply Now
                          </Button>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Job Description
                        </h4>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line line-clamp-3">
                          {job.description}
                        </p>
                      </div>

                      {/* Apply Button - Mobile */}
                      <div className="md:hidden">
                        <Button
                          variant="primary"
                          fullWidth
                          rightIcon={<ArrowRightIcon />}
                          onClick={() => handleApply(job.id)}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>

                    {/* Bottom Gradient Accent */}
                    <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Jobs State */}
          {jobs && jobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <BriefcaseIcon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No Open Positions Right Now
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                We don&apos;t have any open positions at the moment, but we&apos;re always looking for talented people.
                Check back soon or send us your resume!
              </p>
              <Button variant="primary">
                Submit General Application
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 border-t border-white/10 bg-[#0f0f17]">
        <AnimatedBackground variant="subtle" showDots={false} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Don&apos;t See the Right Role?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              We&apos;re always interested in meeting talented people. Send us your resume
              and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Button variant="secondary" size="lg">
              Send Your Resume
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}