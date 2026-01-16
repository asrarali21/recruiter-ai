"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface JobFormData {
  title: string
  experience: string
  salary_range: string
  skills: string[]
  location: string
  employment_type: string
}

const createJob = async (data: JobFormData) => {
  const response = await axios.post("http://localhost:8000/jobs/create_job", data)
  return response.data
}

// Icons
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CurrencyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const skillChipVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 500, damping: 25 } },
  exit: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
}

export default function JobCreationPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isSuccess, setIsSuccess] = useState(false)
  const [createdJobId, setCreatedJobId] = useState<number | null>(null)

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    experience: '',
    salary_range: '',
    skills: [],
    location: '',
    employment_type: ''
  })

  const [skillsInput, setSkillsInput] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      console.log('✅ Job created:', data)
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      setIsSuccess(true)
      setCreatedJobId(data.id)
    },
    onError: (error) => {
      console.error('❌ Error:', error)
    }
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSkillsInput(value)

    const skillsArray = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)

    setFormData(prev => ({ ...prev, skills: skillsArray }))
  }

  const removeSkill = (skillToRemove: string) => {
    const newSkills = formData.skills.filter(skill => skill !== skillToRemove)
    setFormData(prev => ({ ...prev, skills: newSkills }))
    setSkillsInput(newSkills.join(', '))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-4 pl-12
    bg-white/5 backdrop-blur-sm
    border-2 rounded-xl
    text-white placeholder-gray-400
    transition-all duration-300 ease-out
    outline-none
    ${focusedField === fieldName
      ? 'border-violet-500 shadow-lg shadow-violet-500/20 bg-white/10'
      : 'border-white/10 hover:border-white/20'}
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const labelClasses = (fieldName: string) => `
    flex items-center gap-2 text-sm font-medium mb-3
    transition-colors duration-300
    ${focusedField === fieldName ? 'text-violet-400' : 'text-gray-300'}
  `

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />

        <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
          <AnimatedBackground variant="default" showDots />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 text-center max-w-lg"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mb-8 shadow-lg shadow-emerald-500/30"
            >
              <CheckCircleIcon />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Job Created Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-8"
            >
              Your job posting for <span className="text-violet-400 font-semibold">{formData.title}</span> has been created.
              Generate an AI-powered job description next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="primary"
                leftIcon={<SparklesIcon />}
                onClick={() => router.push(`/job/${createdJobId}/generate-jd`)}
              >
                Generate JD with AI
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/admin")}
              >
                View All Jobs
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <AnimatedBackground variant="default" showDots />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <ArrowLeftIcon />
            </span>
            <span className="font-medium">Back</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6 shadow-lg shadow-violet-500/30"
            >
              <SparklesIcon />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
              Create New Position
            </h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Fill in the details below to create an attractive job posting that stands out
            </p>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {mutation.isError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl backdrop-blur-sm flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Something went wrong</p>
                  <p className="text-sm text-red-400/80">{mutation.error.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card */}
          <Card variant="glass" padding="lg">
            <form onSubmit={handleSubmit}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                {/* Job Title */}
                <motion.div variants={fadeInUp} className="group">
                  <label htmlFor="title" className={labelClasses('title')}>
                    <BriefcaseIcon />
                    Job Title
                    <span className="text-violet-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300">
                      <BriefcaseIcon />
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('title')}
                      onBlur={() => setFocusedField(null)}
                      disabled={mutation.isPending}
                      className={inputClasses('title')}
                      placeholder="e.g., Senior Backend Engineer"
                    />
                  </div>
                </motion.div>

                {/* Two column layout for Experience and Salary */}
                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience */}
                  <div className="group">
                    <label htmlFor="experience" className={labelClasses('experience')}>
                      <ClockIcon />
                      Experience Required
                      <span className="text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300">
                        <ClockIcon />
                      </div>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('experience')}
                        onBlur={() => setFocusedField(null)}
                        disabled={mutation.isPending}
                        className={inputClasses('experience')}
                        placeholder="e.g., 5+ years"
                      />
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="group">
                    <label htmlFor="salary_range" className={labelClasses('salary_range')}>
                      <CurrencyIcon />
                      Salary Range
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300">
                        <CurrencyIcon />
                      </div>
                      <input
                        type="text"
                        id="salary_range"
                        name="salary_range"
                        value={formData.salary_range}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('salary_range')}
                        onBlur={() => setFocusedField(null)}
                        disabled={mutation.isPending}
                        className={inputClasses('salary_range')}
                        placeholder="e.g., $120k - $180k"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div variants={fadeInUp} className="group">
                  <label htmlFor="skills" className={labelClasses('skills')}>
                    <CodeIcon />
                    Required Skills
                    <span className="text-violet-400">*</span>
                    <span className="text-gray-500 font-normal ml-1">(comma-separated)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300">
                      <CodeIcon />
                    </div>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      required
                      value={skillsInput}
                      onChange={handleSkillsChange}
                      onFocus={() => setFocusedField('skills')}
                      onBlur={() => setFocusedField(null)}
                      disabled={mutation.isPending}
                      className={inputClasses('skills')}
                      placeholder="e.g., Python, FastAPI, PostgreSQL, Docker"
                    />
                  </div>
                  {/* Skills preview chips */}
                  <AnimatePresence>
                    {formData.skills.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {formData.skills.map((skill, index) => (
                          <motion.span
                            key={skill}
                            variants={skillChipVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            layout
                            className="group/chip inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 rounded-full text-sm font-medium transition-all duration-300 hover:from-violet-500/30 hover:to-fuchsia-500/30 hover:border-violet-500/50"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="opacity-0 group-hover/chip:opacity-100 transition-opacity duration-200 hover:text-white"
                            >
                              <XIcon />
                            </button>
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Two column layout for Location and Employment Type */}
                <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location */}
                  <div className="group">
                    <label htmlFor="location" className={labelClasses('location')}>
                      <LocationIcon />
                      Location
                      <span className="text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300">
                        <LocationIcon />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('location')}
                        onBlur={() => setFocusedField(null)}
                        disabled={mutation.isPending}
                        className={inputClasses('location')}
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div className="group">
                    <label htmlFor="employment_type" className={labelClasses('employment_type')}>
                      <UsersIcon />
                      Employment Type
                      <span className="text-violet-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors duration-300 pointer-events-none">
                        <UsersIcon />
                      </div>
                      <select
                        id="employment_type"
                        name="employment_type"
                        required
                        value={formData.employment_type}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('employment_type')}
                        onBlur={() => setFocusedField(null)}
                        disabled={mutation.isPending}
                        className={`${inputClasses('employment_type')} cursor-pointer appearance-none`}
                      >
                        <option value="" className="bg-gray-900">Select type</option>
                        <option value="full-time" className="bg-gray-900">Full-time</option>
                        <option value="part-time" className="bg-gray-900">Part-time</option>
                        <option value="contract" className="bg-gray-900">Contract</option>
                        <option value="internship" className="bg-gray-900">Internship</option>
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={fadeInUp} className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={mutation.isPending}
                    leftIcon={<SparklesIcon />}
                  >
                    {mutation.isPending ? "Creating Your Job..." : "Create Job Posting"}
                  </Button>
                </motion.div>

                {/* Helper text */}
                <motion.p variants={fadeInUp} className="text-center text-gray-500 text-sm">
                  Fields marked with <span className="text-violet-400">*</span> are required
                </motion.p>
              </motion.div>
            </form>
          </Card>

          {/* Footer decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-2 text-gray-500 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your data is securely stored</span>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}