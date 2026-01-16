"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface MatchedCandidate {
  match_id: number
  application_id: number
  job_id: number
  match_score: number
  match_summary: string
  candidate_name: string
  candidate_email: string
  resume_link: string
  github_link: string
  job_title: string
}

interface MatchSummary {
  match_score: number
  summary: string
  strengths: string[]
  gaps: string[]
  confidence: number
}

const fetchMatchedCandidates = async (): Promise<MatchedCandidate[]> => {
  const response = await axios.get("http://localhost:8000/candidates")
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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
}

// Icons
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

// Skeleton component
function CandidateCardSkeleton() {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full" />
            <div>
              <div className="h-5 w-32 bg-white/10 rounded mb-2" />
              <div className="h-4 w-40 bg-white/10 rounded" />
            </div>
          </div>
          <div className="h-10 w-16 bg-white/10 rounded-full" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-10 w-full bg-white/10 rounded-lg" />
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<MatchedCandidate | null>(null)
  const [filterScore, setFilterScore] = useState<number>(0)
  const [shortlisted, setShortlisted] = useState<number[]>([])

  const { data: candidates, isLoading, isError } = useQuery({
    queryKey: ["matched-candidates"],
    queryFn: fetchMatchedCandidates
  })

  const parseSummary = (summaryStr: string): MatchSummary => {
    try {
      return JSON.parse(summaryStr)
    } catch {
      return {
        match_score: 0,
        summary: "",
        strengths: [],
        gaps: [],
        confidence: 0
      }
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
    if (score >= 50) return "text-amber-400 bg-amber-500/20 border-amber-500/30"
    return "text-red-400 bg-red-500/20 border-red-500/30"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 75) return "from-emerald-500 to-green-500"
    if (score >= 50) return "from-amber-500 to-orange-500"
    return "from-red-500 to-rose-500"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 75) return "Excellent Match"
    if (score >= 50) return "Good Match"
    return "Weak Match"
  }

  const handleShortlist = (candidateId: number, candidateName: string) => {
    setShortlisted(prev => [...prev, candidateId])
    alert(`✓ Shortlisted: ${candidateName}`)
    setSelectedCandidate(null)
  }

  const filteredCandidates = candidates?.filter(c => c.match_score >= filterScore) || []

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="h-10 w-64 bg-white/10 rounded-lg animate-pulse mb-2" />
              <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <CandidateCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <XIcon />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Candidates</h2>
            <p className="text-gray-400">Please try again later.</p>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      {/* Header */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <AnimatedBackground variant="subtle" showDots={false} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Review and shortlist matched candidates</p>
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-4 px-6 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  {filteredCandidates.length}
                </div>
                <div className="text-sm text-gray-400">Total Matches</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  {shortlisted.length}
                </div>
                <div className="text-sm text-gray-400">Shortlisted</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" padding="md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-gray-300">Filter by Score:</label>
                  <select
                    value={filterScore}
                    onChange={(e) => setFilterScore(Number(e.target.value))}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:border-violet-500 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value={0} className="bg-gray-900">All Candidates</option>
                    <option value={25} className="bg-gray-900">25% and above</option>
                    <option value={50} className="bg-gray-900">50% and above</option>
                    <option value={75} className="bg-gray-900">75% and above</option>
                  </select>
                </div>
                <div className="text-sm text-gray-400">
                  Showing <span className="font-bold text-violet-400">{filteredCandidates.length}</span> of {candidates?.length || 0} candidates
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Candidates Grid */}
      <section className="relative pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCandidates.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredCandidates.map((candidate) => {
                const summary = parseSummary(candidate.match_summary)
                const isShortlisted = shortlisted.includes(candidate.match_id)

                return (
                  <motion.div
                    key={candidate.match_id}
                    variants={fadeInUp}
                    layoutId={`candidate-${candidate.match_id}`}
                  >
                    <Card
                      variant="default"
                      padding="none"
                      hover={!isShortlisted}
                      className={`group cursor-pointer overflow-hidden ${isShortlisted ? 'ring-2 ring-emerald-500/50' : ''}`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      {/* Header with gradient */}
                      <div className={`bg-gradient-to-r ${getScoreGradient(candidate.match_score)} p-6`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <UserIcon />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">{candidate.candidate_name}</h3>
                              <p className="text-white/80 text-sm">{candidate.candidate_email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isShortlisted && (
                              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-semibold">
                                ✓ Shortlisted
                              </span>
                            )}
                            <div className="px-4 py-2 bg-white rounded-full font-bold text-lg text-gray-900">
                              {candidate.match_score}%
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <BriefcaseIcon />
                          <span className="font-medium">{candidate.job_title}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Match Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-400">Match Quality:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getScoreColor(candidate.match_score)}`}>
                            {getScoreBadge(candidate.match_score)}
                          </span>
                        </div>

                        {/* Summary */}
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {summary.summary}
                        </p>

                        {/* Strengths Preview */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckIcon />
                            <h4 className="text-sm font-semibold text-gray-300">Top Strengths</h4>
                          </div>
                          <div className="space-y-1">
                            {summary.strengths.slice(0, 2).map((strength, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-400 mt-0.5">•</span>
                                <p className="text-sm text-gray-400 line-clamp-1">{strength}</p>
                              </div>
                            ))}
                            {summary.strengths.length > 2 && (
                              <p className="text-xs text-violet-400 font-medium">
                                +{summary.strengths.length - 2} more strengths
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <a
                            href={candidate.resume_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1"
                          >
                            <Button variant="secondary" fullWidth leftIcon={<DocumentIcon />}>
                              Resume
                            </Button>
                          </a>
                          {candidate.github_link && (
                            <a
                              href={candidate.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1"
                            >
                              <Button variant="secondary" fullWidth leftIcon={<GitHubIcon />}>
                                GitHub
                              </Button>
                            </a>
                          )}
                        </div>

                        <Button
                          variant="primary"
                          fullWidth
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCandidate(candidate)
                          }}
                        >
                          View Full Details & Shortlist
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserIcon />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Candidates Found</h3>
              <p className="text-gray-400">Try adjusting your filters to see more results</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#0f0f17] border border-white/10 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const summary = parseSummary(selectedCandidate.match_summary)
                const isShortlisted = shortlisted.includes(selectedCandidate.match_id)

                return (
                  <>
                    {/* Modal Header */}
                    <div className={`sticky top-0 bg-gradient-to-r ${getScoreGradient(selectedCandidate.match_score)} p-6 z-10`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <UserIcon />
                          </div>
                          <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedCandidate.candidate_name}</h2>
                            <p className="text-white/80">{selectedCandidate.candidate_email}</p>
                            <div className="flex items-center gap-2 mt-2 text-white/90">
                              <BriefcaseIcon />
                              <span>{selectedCandidate.job_title}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedCandidate(null)}
                          className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                          <XIcon />
                        </button>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 md:p-8 space-y-6">

                      {/* Match Score */}
                      <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <ChartIcon />
                            <h3 className="text-xl font-bold text-white">Match Analysis</h3>
                          </div>
                          <div className={`text-4xl font-bold ${getScoreColor(selectedCandidate.match_score).split(' ')[0]}`}>
                            {selectedCandidate.match_score}%
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{summary.summary}</p>
                        <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                          <span className="font-semibold">Confidence:</span>
                          <div className="flex-1 bg-white/10 rounded-full h-2 max-w-xs">
                            <motion.div
                              className="bg-violet-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${summary.confidence * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            />
                          </div>
                          <span className="font-bold text-white">{(summary.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <CheckIcon />
                          </div>
                          <h3 className="text-xl font-bold text-white">Key Strengths ({summary.strengths.length})</h3>
                        </div>
                        <ul className="space-y-3">
                          {summary.strengths.map((strength, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <span className="text-emerald-400 font-bold mt-1">✓</span>
                              <span className="text-gray-300">{strength}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Gaps */}
                      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            <XIcon />
                          </div>
                          <h3 className="text-xl font-bold text-white">Identified Gaps ({summary.gaps.length})</h3>
                        </div>
                        <ul className="space-y-3">
                          {summary.gaps.map((gap, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <span className="text-red-400 font-bold mt-1">✗</span>
                              <span className="text-gray-300">{gap}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <a
                          href={selectedCandidate.resume_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="secondary" fullWidth size="lg" leftIcon={<DocumentIcon />}>
                            View Resume
                          </Button>
                        </a>
                        {selectedCandidate.github_link && (
                          <a
                            href={selectedCandidate.github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button variant="secondary" fullWidth size="lg" leftIcon={<GitHubIcon />}>
                              GitHub Profile
                            </Button>
                          </a>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        fullWidth
                        size="lg"
                        disabled={isShortlisted}
                        leftIcon={isShortlisted ? <CheckIcon /> : undefined}
                        onClick={() => handleShortlist(selectedCandidate.match_id, selectedCandidate.candidate_name)}
                      >
                        {isShortlisted ? "Already Shortlisted" : "✓ Shortlist Candidate"}
                      </Button>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}