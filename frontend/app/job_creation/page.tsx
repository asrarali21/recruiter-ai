"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react"

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

export default function JobCreationPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

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
      router.push('/jobs')
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-[100px]" />
      </div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <ArrowLeftIcon />
            </span>
            <span className="font-medium">Back</span>
          </button>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6 shadow-lg shadow-violet-500/30">
              <SparklesIcon />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
              Create New Position
            </h1>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Fill in the details below to create an attractive job posting that stands out
            </p>
          </div>

          {/* Error message */}
          {mutation.isError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl backdrop-blur-sm flex items-center gap-3 animate-shake">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Something went wrong</p>
                <p className="text-sm text-red-400/80">{mutation.error.message}</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            {/* Glow effect on the card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 pointer-events-none" />

            <div className="relative space-y-6">
              {/* Job Title */}
              <div className="group">
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
              </div>

              {/* Two column layout for Experience and Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Skills */}
              <div className="group">
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
                {formData.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
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
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Two column layout for Location and Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="relative w-full group overflow-hidden rounded-xl font-semibold text-lg py-4 px-8 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* Button gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white to-transparent" />
                  </div>

                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-3 text-white">
                    {mutation.isPending ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Your Job...
                      </>
                    ) : (
                      <>
                        <SparklesIcon />
                        Create Job Posting
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Helper text */}
              <p className="text-center text-gray-500 text-sm">
                Fields marked with <span className="text-violet-400">*</span> are required
              </p>
            </div>
          </form>

          {/* Footer decoration */}
          <div className="mt-12 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Your data is securely stored</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}