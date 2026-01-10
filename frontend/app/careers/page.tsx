"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import axios from "axios"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <BriefcaseIcon />
          </div>
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore exciting career opportunities and be part of something amazing
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon />
              <span>Remote Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon />
              <span>Competitive Salary</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon />
              <span>Great Benefits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 -mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {jobs?.length || 0}
              </div>
              <div className="text-gray-600">Open Positions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5+</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading open positions...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-red-800 font-semibold">Error Loading Jobs</h3>
                <p className="text-red-700 text-sm mt-1">{error?.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Jobs List */}
        {jobs && jobs.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Open Positions ({jobs.length})
            </h2>

            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase">
                            {job.status}
                          </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <LocationIcon />
                            <span>Remote / Hybrid</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ClockIcon />
                            <span>Full-time</span>
                          </div>
                          {job.created_at && (
                            <div className="flex items-center space-x-1">
                              <ClockIcon />
                              <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Apply Button - Desktop */}
                      <div className="hidden md:block ml-6">
                        <button
                          onClick={() => handleApply(job.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Job Description
                      </h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>

                    {/* Apply Button - Mobile */}
                    <div className="md:hidden">
                      <button
                        onClick={() => handleApply(job.id)}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Apply Now →
                      </button>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Jobs State */}
        {jobs && jobs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <BriefcaseIcon />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Open Positions Right Now
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We don't have any open positions at the moment, but we're always looking for talented people.
              Check back soon or send us your resume!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Submit General Application
            </button>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            Send Your Resume
          </button>
        </div>
      </div>
    </div>
  )
}