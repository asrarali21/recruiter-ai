"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"
import { useState } from "react"

interface JDResponse {
  job_id: number
  status: string
  jd: string
}

interface approveResponse{
    decision:string
}


const generateJd = async(JobId:number):Promise<JDResponse> =>{
    const response = await axios.post(`http://localhost:8000/jobs/${JobId}/generate_jd`)
    console.log(response)
    return response.data

}
const JdApprove = async (JobId:number,decision:string):Promise<approveResponse>=>{
        const response = await axios.post(`http://localhost:8000/jobs/${JobId}/approve`, decision)
        return response.data
    }



export default function GenerateJDPage(){
    const params = useParams()
    const router = useRouter()

    const JobId = Number(params.id)

      const [showJD, setShowJD] = useState(false)

    const generateMutation = useMutation({
        mutationFn : ()=> generateJd(JobId),
        onSuccess:()=>{
            setShowJD(true)
        }
    })
    const handleGenerate = ()=>{
        generateMutation.mutate()
    }




    const approveMutation = useMutation({
        mutationFn:(decision:string)=>JdApprove(JobId , decision),
        onSuccess: () => {
       router.push("/jobs")
    }
    })

  const handleApprove = () => {
    approveMutation.mutate("approve")
    
  }
  const handleReject = () => {
    approveMutation.mutate("reject")
  }
    return  (
<div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Generate Job Description</h1>


        {!showJD && (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-6">
              Click below to generate AI-powered job description
            </p>
            <button
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {generateMutation.isPending ? "Generating..." : "Generate Job Description"}
            </button>

            {generateMutation.isError && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
                Error: {generateMutation.error.message}
              </div>
            )}
          </div>
        )}

        {showJD && generateMutation.data && (
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Generated Job Description</h2>
            
            <div className="prose max-w-none mb-8">
              <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
                {generateMutation.data.jd}
              </div>
            </div>
          </div>
          
          
        )}
          <div className="flex gap-4">
              <button
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
              >
                {approveMutation.isPending ? "Approving..." : "✓ Approve & Publish"}
              </button>
              
              <button
                onClick={handleReject}
                disabled={approveMutation.isPending}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
              >
                {approveMutation.isPending ? "Rejecting..." : "✗ Reject & Regenerate"}
              </button>
            </div>

            {approveMutation.isError && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
                Error: {approveMutation.error.message}
              </div>
            )}
      </div>
    </div>
    )
}

