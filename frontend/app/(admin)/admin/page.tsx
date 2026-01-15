"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

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

export default function AdminPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<MatchedCandidate | null>(null)
  const [filterScore, setFilterScore] = useState<number>(0)

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
    if (score >= 75) return "text-green-600 bg-green-100"
    if (score >= 50) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 75) return "Excellent Match"
    if (score >= 50) return "Good Match"
    return "Weak Match"
  }

  const filteredCandidates = candidates?.filter(c => c.match_score >= filterScore) || []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candidates...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 font-semibold mb-2">Error Loading Candidates</h2>
          <p className="text-red-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">Review and shortlist matched candidates</p>
            </div>
            <div className="bg-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <div className="text-3xl font-bold">{filteredCandidates.length}</div>
              <div className="text-sm text-blue-100">Total Matches</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-semibold text-gray-700">Filter by Score:</label>
              <select
                value={filterScore}
                onChange={(e) => setFilterScore(Number(e.target.value))}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>All Candidates</option>
                <option value={25}>25% and above</option>
                <option value={50}>50% and above</option>
                <option value={75}>75% and above</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredCandidates.length}</span> of {candidates?.length || 0} candidates
            </div>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => {
            const summary = parseSummary(candidate.match_summary)
            
            return (
              <div
                key={candidate.match_id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCandidate(candidate)}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <UserIcon />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{candidate.candidate_name}</h3>
                        <p className="text-blue-100 text-sm">{candidate.candidate_email}</p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(candidate.match_score)} bg-white`}>
                      {candidate.match_score}%
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm">
                    <BriefcaseIcon />
                    <span className="font-medium">{candidate.job_title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  
                  {/* Match Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Match Quality:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(candidate.match_score)}`}>
                      {getScoreBadge(candidate.match_score)}
                    </span>
                  </div>

                  {/* Summary */}
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {summary.summary}
                    </p>
                  </div>

                  {/* Strengths Preview */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckIcon />
                      <h4 className="text-sm font-semibold text-gray-700">Top Strengths</h4>
                    </div>
                    <div className="space-y-1">
                      {summary.strengths.slice(0, 2).map((strength, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          <p className="text-sm text-gray-600 line-clamp-1">{strength}</p>
                        </div>
                      ))}
                      {summary.strengths.length > 2 && (
                        <p className="text-xs text-blue-600 font-medium">
                          +{summary.strengths.length - 2} more strengths
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <a
                      href={candidate.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Resume
                    </a>
                    {candidate.github_link && (
                      <a
                        href={candidate.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors text-sm"
                      >
                        GitHub
                      </a>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCandidate(candidate)
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Full Details & Shortlist
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Candidates Found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const summary = parseSummary(selectedCandidate.match_summary)
              
              return (
                <>
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <UserIcon />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{selectedCandidate.candidate_name}</h2>
                          <p className="text-blue-100">{selectedCandidate.candidate_email}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <BriefcaseIcon />
                            <span>{selectedCandidate.job_title}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedCandidate(null)}
                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                      >
                        <XIcon />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8 space-y-6">
                    
                    {/* Match Score */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <ChartIcon />
                          <h3 className="text-xl font-bold text-gray-900">Match Analysis</h3>
                        </div>
                        <div className={`text-4xl font-bold ${getScoreColor(selectedCandidate.match_score)}`}>
                          {selectedCandidate.match_score}%
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
                      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                        <span className="font-semibold">Confidence:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${summary.confidence * 100}%` }}
                          />
                        </div>
                        <span className="font-bold">{(summary.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckIcon />
                        <h3 className="text-xl font-bold text-gray-900">Key Strengths ({summary.strengths.length})</h3>
                      </div>
                      <ul className="space-y-3">
                        {summary.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <span className="text-green-600 font-bold mt-1">✓</span>
                            <span className="text-gray-700 flex-1">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Gaps */}
                    <div className="bg-red-50 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <XIcon />
                        <h3 className="text-xl font-bold text-gray-900">Identified Gaps ({summary.gaps.length})</h3>
                      </div>
                      <ul className="space-y-3">
                        {summary.gaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <span className="text-red-600 font-bold mt-1">✗</span>
                            <span className="text-gray-700 flex-1">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t">
                      <a
                        href={selectedCandidate.resume_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 text-white py-4 rounded-xl text-center font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                      >
                        📄 View Resume
                      </a>
                      {selectedCandidate.github_link && (
                        <a
                          href={selectedCandidate.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gray-800 text-white py-4 rounded-xl text-center font-bold hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
                        >
                          💻 GitHub Profile
                        </a>
                      )}
                    </div>

                    <button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      onClick={() => {
                        alert(`Shortlisted: ${selectedCandidate.candidate_name}`)
                        setSelectedCandidate(null)
                      }}
                    >
                      ✓ Shortlist Candidate
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}