"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, ChangeEvent, FormEvent } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { uploadToCloudinary, validateResumeFile } from "@/lib/cloudinary"

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

export default function ApplyPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = Number(params.id)

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

  const { data: job, isLoading: jobLoading } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId)
  })

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      alert("Application submitted successfully!")
      router.push("/careers")
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ✅ Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    
    if (!file) return

    // Validate file
    const validation = validateResumeFile(file)
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid file")
      setResumeFile(null)
      return
    }

    setUploadError(null)
    setResumeFile(file)
  }

  // ✅ Upload resume to Cloudinary
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

      // ✅ Set the Cloudinary URL in form data
      setFormData(prev => ({
        ...prev,
        resume_link: result.secure_url
      }))

      alert("Resume uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      setUploadError("Failed to upload resume. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // ✅ Check if resume is uploaded
    if (!formData.resume_link) {
      setUploadError("Please upload your resume first")
      return
    }

    mutation.mutate({ jobId, application: formData })
  }

  if (jobLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center"
          >
            ← Back to Careers
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Apply for {job?.title}
          </h1>
          <p className="text-gray-600">Fill out the form below to submit your application</p>
        </div>

        {/* Error Messages */}
        {mutation.isError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            Error: {mutation.error?.message}
          </div>
        )}

        {uploadError && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            {uploadError}
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 space-y-6">
          
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Resume * (PDF, DOC, DOCX - Max 10MB)
            </label>
            
            <div className="space-y-4">
              {/* File Input */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  disabled={isUploading || mutation.isPending}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* Upload Button */}
              {resumeFile && !formData.resume_link && (
                <button
                  type="button"
                  onClick={handleUploadResume}
                  disabled={isUploading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                >
                  {isUploading ? `Uploading... ${uploadProgress}%` : "Upload Resume"}
                </button>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {/* Success Message */}
              {formData.resume_link && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-green-700 font-medium">Resume uploaded successfully!</span>
                  </div>
                  <a
                    href={formData.resume_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View →
                  </a>
                </div>
              )}

              {/* Selected File Info */}
              {resumeFile && !formData.resume_link && (
                <div className="text-sm text-gray-600">
                  Selected: <span className="font-medium">{resumeFile.name}</span> ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>
          </div>

          {/* GitHub Link */}
          <div>
            <label htmlFor="github_link" className="block text-sm font-semibold text-gray-700 mb-2">
              GitHub Profile (Optional)
            </label>
            <input
              type="url"
              id="github_link"
              name="github_link"
              value={formData.github_link}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
              placeholder="https://github.com/yourusername"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending || isUploading || !formData.resume_link}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Submitting..." : "Submit Application"}
          </button>

          {!formData.resume_link && (
            <p className="text-sm text-gray-500 text-center">
              Please upload your resume before submitting
            </p>
          )}
        </form>
      </div>
    </div>
  )
}