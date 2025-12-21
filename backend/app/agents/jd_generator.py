from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
import os



GOOGLE_APIKEY=os.getenv("GOOGLE_APIKEY")
class JDGeneratorAgent():
    def __init__(self , llm_client):

        llm = ChatGoogleGenerativeAI(
          model="gemini-3-pro", 
          api_key=GOOGLE_APIKEY

        )

        self.llm_client = llm

    def build_prompt(self , context:dict):
        """
        Convert raw_input (draft data) into an AI prompt
        """

        title = context.get("title", "Job Role")
        experience = context.get("experience", "Not specified")
        salary = context.get("salary", "Not specified")
        skills = context.get("skills", [])
        domain = context.get("domain", "General")

        skills_text = ", ".join(skills) if skills else "Relevant skills"

        prompt = f"""
You are an expert technical recruiter.

Create a professional Job Description using the details below.

Job Title: {title}
Domain: {domain}
Experience Required: {experience}
Salary Range: {salary}
Skills: {skills_text}

The job description should include:
- Role overview
- Responsibilities
- Required skills
- Preferred qualifications
- Company-friendly tone

Return ONLY the job description text.
"""
        return prompt.strip()


        
    def generate(self , context:dict)->str:


        prompt = self.build_prompt(context)

        response = self.llm_client.invoke(prompt)
        return response.strip()
        
        








