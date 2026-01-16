"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent, useCallback } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { uploadToCloudinary, validateResumeFile } from "@/lib/cloudinary"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

interface Job {
  id: number
  title: string
  description: string
}

interface ApplicationData {
  name: string
  email: string
  resume_link: string
  github_link?: string
}

const fetchJob = async (jobId: number): Promise<Job> => {
  const response = await axios.get(`http://localhost:8000/jobs/get_jobs/${jobId}`)
  return response.data
}

const submitApplication = async (data: { jobId: number; application: ApplicationData }) => {
  const response = await axios.post(
    `http://localhost:8000/applications/${data.jobId}/submit`,
    data.application
  )
  return response.data
}

// Icons
const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

// Progress steps
const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Resume" },
  { id: 3, label: "Submit" },
]

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = Number(params.id)

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ApplicationData>({
    name: "",
    email: "",
    resume_link: "",
    github_link: ""
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId)
  })

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      setCurrentStep(3)
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle file selection
  const handleFileChange = useCallback((file: File | null) => {
    if (!file) return

    const validation = validateResumeFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid file")
      setResumeFile(null)
      return
    }

    setUploadError(null)
    setResumeFile(file)
  }, [])

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleFileChange(file || null)
  }

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    handleFileChange(file || null)
  }, [handleFileChange])

  // Upload resume to Cloudinary
  const handleUploadResume = async () => {
    if (!resumeFile) {
      setUploadError("Please select a resume file")
      return
    }

    setIsUploading(true)
    setUploadError(null)
    setUploadProgress(0)

    try {
      const result = await uploadToCloudinary(resumeFile, (progress) => {
        setUploadProgress(progress)
      })

      setFormData(prev => ({
        ...prev,
        resume_link: result.secure_url
      }))
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!formData.resume_link) {
      setUploadError("Please upload your resume first")
      return
    }

    mutation.mutate({ jobId, application: formData })
  }

  const canProceedToStep2 = formData.name.trim() !== "" && formData.email.trim() !== ""
  const canSubmit = formData.resume_link !== ""

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full"
        />
      </div>
    )
  }

  // Success State
  if (currentStep === 3) {
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
            {/* Success Icon with Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mb-8 shadow-lg shadow-emerald-500/30"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <CheckCircleIcon />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Application Submitted!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-8"
            >
              Thank you for applying to <span className="text-violet-400 font-semibold">{job?.title}</span>.
              We&apos;ll review your application and get back to you soon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="primary" onClick={() => router.push("/careers")}>
                Browse More Jobs
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
        <AnimatedBackground variant="subtle" showDots />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-300"
          >
            <span className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
              <ArrowLeftIcon />
            </span>
            <span className="font-medium">Back to Careers</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Apply for {job?.title}
            </h1>
            <p className="text-gray-400">Fill out the form below to submit your application</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  initial={{ width: "0%" }}
                  animate={{ width: currentStep === 1 ? "0%" : currentStep === 2 ? "100%" : "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {steps.slice(0, 2).map((step) => (
                <div key={step.id} className="relative flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm z-10 transition-all duration-300 ${currentStep >= step.id
                        ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/10 text-gray-400 border border-white/10"
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {currentStep > step.id ? (
                      <CheckCircleIcon />
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-gray-500"
                    }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Error Messages */}
          <AnimatePresence>
            {(mutation.isError || uploadError) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-400 text-sm">
                  {uploadError || mutation.error?.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card */}
          <Card variant="glass" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <Input
                      label="Full Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      leftIcon={<UserIcon />}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      leftIcon={<MailIcon />}
                    />

                    <Input
                      label="GitHub Profile"
                      hint="Optional"
                      type="url"
                      name="github_link"
                      value={formData.github_link}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                      leftIcon={<GitHubIcon />}
                    />

                    <Button
                      type="button"
                      variant="primary"
                      fullWidth
                      disabled={!canProceedToStep2}
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Resume Upload
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Resume Upload */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Drag & Drop Zone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                        <DocumentIcon />
                        Resume
                        <span className="text-violet-400">*</span>
                        <span className="text-gray-500 font-normal ml-1">(PDF, DOC, DOCX - Max 10MB)</span>
                      </label>

                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${isDragging
                            ? "border-violet-500 bg-violet-500/10"
                            : formData.resume_link
                              ? "border-emerald-500/50 bg-emerald-500/5"
                              : "border-white/20 hover:border-white/30 hover:bg-white/5"
                          }`}
                      >
                        {formData.resume_link ? (
                          // Success State
                          <div className="space-y-3">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400">
                              <CheckCircleIcon />
                            </div>
                            <p className="text-emerald-400 font-medium">Resume uploaded successfully!</p>
                            <a
                              href={formData.resume_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-violet-400 hover:text-violet-300 underline"
                            >
                              View uploaded file →
                            </a>
                          </div>
                        ) : resumeFile && !isUploading ? (
                          // File Selected, Ready to Upload
                          <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-violet-500/20 text-violet-400">
                              <DocumentIcon />
                            </div>
                            <div>
                              <p className="text-white font-medium">{resumeFile.name}</p>
                              <p className="text-gray-500 text-sm">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="primary"
                              onClick={handleUploadResume}
                            >
                              Upload Resume
                            </Button>
                          </div>
                        ) : isUploading ? (
                          // Uploading State
                          <div className="space-y-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-violet-500/20">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-8 h-8 border-3 border-violet-500/30 border-t-violet-500 rounded-full"
                              />
                            </div>
                            <p className="text-white font-medium">Uploading... {uploadProgress}%</p>
                            <div className="w-full max-w-xs mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                        ) : (
                          // Default State
                          <>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileInputChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-3">
                              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 text-gray-400">
                                <UploadIcon />
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  Drag & drop your resume here
                                </p>
                                <p className="text-gray-500 text-sm">
                                  or click to browse files
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!canSubmit || mutation.isPending}
                        isLoading={mutation.isPending}
                        leftIcon={<SparklesIcon />}
                        className="flex-1"
                      >
                        Submit Application
                      </Button>
                    </div>

                    {!formData.resume_link && (
                      <p className="text-sm text-gray-500 text-center">
                        Please upload your resume before submitting
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}