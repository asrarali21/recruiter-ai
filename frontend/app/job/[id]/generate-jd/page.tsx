"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface JDResponse {
  job_id: number
  status: string
  jd: string
}

interface ApproveResponse {
  decision: string
}

const generateJd = async (JobId: number): Promise<JDResponse> => {
  const response = await axios.post(`http://localhost:8000/jobs/${JobId}/generate_jd`)
  return response.data
}

const JdApprove = async (JobId: number, decision: string): Promise<ApproveResponse> => {
  const response = await axios.post(`http://localhost:8000/jobs/${JobId}/approve`, { decision })
  return response.data
}

// Icons
const SparklesIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const RefreshIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const BrainIcon = () => (
  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

// Typewriter effect hook
function useTypewriter(text: string, speed: number = 20, shouldStart: boolean = true) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!shouldStart || !text) {
      setDisplayText("")
      setIsComplete(false)
      return
    }

    let index = 0
    setDisplayText("")
    setIsComplete(false)

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, shouldStart])

  return { displayText, isComplete }
}

export default function GenerateJDPage() {
  const params = useParams()
  const router = useRouter()
  const JobId = Number(params.id)

  const [showJD, setShowJD] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const generateMutation = useMutation({
    mutationFn: () => generateJd(JobId),
    onSuccess: () => {
      setShowJD(true)
    }
  })

  const { displayText, isComplete } = useTypewriter(
    generateMutation.data?.jd || "",
    15,
    showJD && !!generateMutation.data?.jd
  )

  const handleGenerate = () => {
    generateMutation.mutate()
  }

  const approveMutation = useMutation({
    mutationFn: (decision: string) => JdApprove(JobId, decision),
    onSuccess: (data) => {
      if (data.decision === "approve") {
        setIsApproved(true)
        setTimeout(() => {
          router.push("/careers")
        }, 2000)
      } else {
        // Regenerate
        setShowJD(false)
        generateMutation.reset()
      }
    }
  })

  const handleApprove = () => {
    approveMutation.mutate("approve")
  }

  const handleReject = () => {
    approveMutation.mutate("reject")
  }

  // Success State
  if (isApproved) {
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mb-8 shadow-lg shadow-emerald-500/30"
            >
              <CheckIcon />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Job Published Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg mb-8"
            >
              Your job is now live and accepting applications. Redirecting to dashboard...
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
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

        <div className="relative z-10 max-w-4xl mx-auto">
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6 shadow-lg shadow-violet-500/30"
            >
              <SparklesIcon />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI Job Description Generator
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Let our AI create a professional, compelling job description based on your requirements
            </p>
          </motion.div>

          {/* Generate Section */}
          <AnimatePresence mode="wait">
            {!showJD && (
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card variant="glass" padding="lg" className="text-center">
                  {generateMutation.isPending ? (
                    // Loading State
                    <div className="py-12">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 mb-8"
                      >
                        <BrainIcon />
                      </motion.div>

                      <h2 className="text-2xl font-bold text-white mb-4">
                        AI is crafting your job description...
                      </h2>

                      <div className="max-w-xs mx-auto space-y-2">
                        {["Analyzing job requirements", "Generating compelling content", "Optimizing for candidates"].map((step, index) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.5 }}
                            className="flex items-center gap-3 text-gray-400"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-violet-500/30 border-t-violet-500 rounded-full"
                            />
                            <span className="text-sm">{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Initial State
                    <div className="py-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                        <SparklesIcon />
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to Generate
                      </h2>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Click the button below to let AI create a professional job description based on your job details
                      </p>

                      <Button
                        variant="primary"
                        size="lg"
                        leftIcon={<SparklesIcon />}
                        onClick={handleGenerate}
                      >
                        Generate Job Description
                      </Button>
                    </div>
                  )}

                  {generateMutation.isError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                    >
                      Error: {generateMutation.error.message}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )}

            {showJD && generateMutation.data && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Generated JD Card */}
                <Card variant="glass" padding="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                      <SparklesIcon />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Generated Job Description</h2>
                      <p className="text-sm text-gray-400">Review and approve before publishing</p>
                    </div>
                  </div>

                  {/* Typewriter Text */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[300px]">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {displayText}
                        {!isComplete && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block w-2 h-5 bg-violet-400 ml-1 align-middle"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Word Count */}
                  <div className="mt-4 text-sm text-gray-500 text-right">
                    {displayText.split(/\s+/).filter(Boolean).length} words
                  </div>
                </Card>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isComplete ? 1 : 0.5, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <Card variant="default" padding="md" hover={isComplete}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckIcon />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Approve & Publish</h3>
                        <p className="text-sm text-gray-400">Make this job live</p>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      fullWidth
                      disabled={!isComplete || approveMutation.isPending}
                      isLoading={approveMutation.isPending && approveMutation.variables === "approve"}
                      leftIcon={<CheckIcon />}
                      onClick={handleApprove}
                    >
                      Approve & Publish
                    </Button>
                  </Card>

                  <Card variant="default" padding="md" hover={isComplete}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <RefreshIcon />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Regenerate</h3>
                        <p className="text-sm text-gray-400">Try a different version</p>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      fullWidth
                      disabled={!isComplete || approveMutation.isPending}
                      isLoading={approveMutation.isPending && approveMutation.variables === "reject"}
                      leftIcon={<RefreshIcon />}
                      onClick={handleReject}
                    >
                      Regenerate JD
                    </Button>
                  </Card>
                </motion.div>

                {approveMutation.isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                  >
                    Error: {approveMutation.error.message}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  )
}
