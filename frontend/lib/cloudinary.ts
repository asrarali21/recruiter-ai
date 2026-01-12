
import axios from "axios"

interface CloudinaryUploadResponse {
  secure_url: string
  public_id: string
  original_filename: string
  format: string
  bytes: number
}



export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResponse> => {
  
  
  const CLOUDINARY_CLOUD_NAME = "asrarali" 
  const CLOUDINARY_UPLOAD_PRESET = "pdf_unsigned" 

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  formData.append("folder", "resumes")

  try {
    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(progress)
          }
        }
      }
    )

    return response.data
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload resume")
  }
}



export const validateResumeFile = (file: File): { valid: boolean; error?: string } => {
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ]

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Only PDF, DOC, and DOCX files are allowed"
    }
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: "File size must be less than 10MB"
    }
  }

  return { valid: true }
}
