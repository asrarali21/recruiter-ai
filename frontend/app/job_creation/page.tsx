"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"  // ✅ Fix: next/navigation (not next/router)
import { useState, ChangeEvent, FormEvent } from "react"

interface JobFormData {
  title: string
  experience: string
  salary_range: string
  skills: string[]  // ✅ Array of strings
  location: string
  employment_type: string
}

// ✅ API function
const createJob = async (data: JobFormData) => {
  const response = await axios.post("http://localhost:8000/jobs/create_job", data)
  return response.data
}

export default function JobCreationPage() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    experience: '',
    salary_range: '',
    skills: [],  // ✅ Empty array (not [""])
    location: '',
    employment_type: ''
  })

  // ✅ For comma-separated skills input
  const [skillsInput, setSkillsInput] = useState('')

  // ✅ TanStack Query mutation
  const mutation = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      console.log('✅ Job created:', data)
      const JobId = data.id
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      router.push('/jobs')
    },
    onError: (error) => {
      console.error('❌ Error:', error)
    }
  })

  // ✅ Handle regular input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ✅ Handle skills input (comma-separated)
  const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSkillsInput(value)
    
    // Convert comma-separated string to array
    const skillsArray = value
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0)
    
    setFormData(prev => ({ ...prev, skills: skillsArray }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Job Posting</h1>

        {mutation.isError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
            Error: {mutation.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Senior Backend Engineer"
            />
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block text-sm font-medium mb-2">
              Experience Required *
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 5+ years"
            />
          </div>

          {/* Salary Range */}
          <div>
            <label htmlFor="salary_range" className="block text-sm font-medium mb-2">
              Salary Range
            </label>
            <input
              type="text"
              id="salary_range"
              name="salary_range"
              value={formData.salary_range}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $120k - $180k"
            />
          </div>

          {/* Skills (Comma-Separated) */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium mb-2">
              Required Skills * (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              required
              value={skillsInput}
              onChange={handleSkillsChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Python, FastAPI, PostgreSQL, Docker"
            />
            {/* Preview parsed skills */}
            {formData.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, CA / Remote"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label htmlFor="employment_type" className="block text-sm font-medium mb-2">
              Employment Type *
            </label>
            <select
              id="employment_type"
              name="employment_type"
              required
              value={formData.employment_type}
              onChange={handleChange}
              disabled={mutation.isPending}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {mutation.isPending ? 'Creating Job...' : 'Create Job Posting'}
          </button>
        </form>
      </div>
    </div>
  )
}