from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os


GOOGLE_APIKEY= os.getenv("GOOGLE_API_KEY")



class JobUnderstandingAgent:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            temperature=0,
            api_key = GOOGLE_APIKEY,
            model = "gemini-2.5-pro"
        )

        self.prompt = ChatPromptTemplate.from_template("""
You are a senior technical recruiter.

Analyze the job description below and return STRICT JSON with:

must_have_skills: list of strings
nice_to_have_skills: list of strings
experience_range_years: string (e.g. "2-4")
role_type: frontend | backend | fullstack | data | other
seniority: junior | mid | senior
flexibility: low | medium | high
confidence: number between 0 and 1

Job Description:
{job_description}

Return ONLY valid JSON.
""")
        
    def analyze_job(self , job_description :str)->str:
            chain = self.prompt | self.llm
            response = chain.invoke({"job_description": job_description})
            return response.content
