# agents/resume_understanding_agent.py
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os


GOOGLE_APIKEY = os.getenv("GOOGLE_APIKEY")
class ResumeUnderstandingAgent:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            temperature=0,
            api_key = GOOGLE_APIKEY,
            model="gemini-2.5-pro" 
        )

        self.prompt = ChatPromptTemplate.from_template("""
You are a senior technical recruiter.

Analyze the resume text and return STRICT JSON with these fields:

skills: list of { name, strength }
total_experience_years: number or null
role_focus: frontend | backend | fullstack | data | other
seniority: junior | mid | senior
projects_summary: string
ambiguities: list of strings
confidence: number between 0 and 1

Resume text:
{resume_text}

Return ONLY valid JSON.
""")

    def analyze(self, resume_text: str) -> str:
        chain = self.prompt | self.llm
        response = chain.invoke({"resume_text": resume_text})
        return response.content
