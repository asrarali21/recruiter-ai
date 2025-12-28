from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os


GOOGLE_APIKEY=os.getenv("GOOGLE_APIKEY")


class CandidateJobMatchingAgent:
    def __init__(self):
        self.llm  = ChatGoogleGenerativeAI(
          llm_client = ChatGoogleGenerativeAI
          model="gemini-2.5-flash", 
          api_key=GOOGLE_APIKEY
        )


        self.prompt = ChatPromptTemplate("""
You are a senior technical recruiter.

Given:
1. Candidate resume analysis
2. Job requirement analysis

Evaluate how well the candidate matches the job.

Return STRICT JSON with:
match_score: number between 0 and 100
summary: short paragraph
strengths: list of strings
gaps: list of strings
confidence: number between 0 and 1

Resume Analysis:
{resume_analysis}

Job Analysis:
{job_analysis}

Return ONLY valid JSON.
""")
        
    def match(self, resume_analysis: str, job_analysis: str) -> str:
            chain = self.prompt | self.llm
            response = chain.invoke({
                "resume_analysis": resume_analysis,
                "job_analysis": job_analysis
            })
            return response.content